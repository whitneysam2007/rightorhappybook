// Admin page (/course/admin). Sam's view of his students: email + signup
// date + course progress, newest first, with a count, a started/finished
// summary, and a search box. Thin on purpose: no edit, no delete. Only
// the course-owner emails may see it; anyone else logged in gets a plain
// message. Not linked from the course nav.
import { useEffect, useState } from "react";
import { supabase, useAuth } from "./supabase";
import { ADMIN_EMAILS } from "./config";
import { LESSONS } from "./data";

type Profile = { id: string; email: string; created_at: string };
type Progress = { user_id: string; completed: number[]; updated_at: string };

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function Admin() {
  const { user, loading } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [progress, setProgress] = useState<Record<string, Progress>>({});
  const [progressReady, setProgressReady] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (loading || !user || !ADMIN_EMAILS.includes(user.email ?? "")) return;
    let alive = true;
    supabase
      .from("profiles")
      .select("id, email, created_at")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!alive) return;
        if (error) {
          setFetchError(
            "Couldn't load the student list. If the profiles table was just set up, give it a minute and refresh.",
          );
          return;
        }
        setProfiles((data ?? []) as Profile[]);
      });
    // Progress lives in its own table; if it isn't set up yet, the
    // student list still works and the page says so instead of failing.
    supabase
      .from("course_progress")
      .select("user_id, completed, updated_at")
      .then(({ data, error }) => {
        if (!alive) return;
        if (error) return;
        const byUser: Record<string, Progress> = {};
        for (const row of (data ?? []) as Progress[]) byUser[row.user_id] = row;
        setProgress(byUser);
        setProgressReady(true);
      });
    return () => {
      alive = false;
    };
  }, [loading, user]);

  if (loading) {
    return (
      <div className="container py-10">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) {
    return (
      <div className="container py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-serif text-3xl font-bold">This page is for the course owner.</h1>
        </div>
      </div>
    );
  }

  const filtered = profiles.filter((p) =>
    p.email.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const started = profiles.filter(
    (p) => (progress[p.id]?.completed.length ?? 0) >= 1,
  ).length;
  const finished = profiles.filter(
    (p) => (progress[p.id]?.completed.length ?? 0) >= LESSONS.length,
  ).length;

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">
          Course Admin
        </p>
        <h1 className="mb-2 font-serif text-3xl font-bold leading-tight md:text-4xl">Students</h1>
        <p className="mb-1 text-muted-foreground">
          {profiles.length} {profiles.length === 1 ? "student" : "students"}
        </p>
        {progressReady ? (
          <p className="mb-6 text-sm text-muted-foreground">
            {started} started · {finished} finished the course
          </p>
        ) : (
          <p className="mb-6 text-sm text-muted-foreground">
            Course progress isn&rsquo;t set up yet. Once the course_progress table exists in Supabase,
            each student&rsquo;s progress shows here.
          </p>
        )}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email…"
          aria-label="Search students by email"
          className="mb-4 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"
        />
        {fetchError ? (
          <p className="rounded-lg border border-border bg-card px-4 py-3 text-sm">{fetchError}</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground">
            {profiles.length === 0 ? "No students yet." : "No one matches that search."}
          </p>
        ) : (
          <div className="space-y-2">
            {filtered.map((p) => {
              const prog = progress[p.id];
              const done = prog?.completed.length ?? 0;
              return (
                <div
                  key={p.id}
                  className="rounded-lg border border-[oklch(0.4_0_0)] bg-[oklch(0.2_0_0)] px-4 py-3 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="min-w-0 flex-1 break-all font-medium">{p.email}</span>
                    {progressReady && (
                      <span className="shrink-0 text-sm font-medium">
                        {done} of {LESSONS.length} done
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Joined {formatDate(p.created_at)}
                    {progressReady &&
                      ` · Last active ${prog ? formatDate(prog.updated_at) : "—"}`}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
