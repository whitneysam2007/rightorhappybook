// Admin page (/course/admin). Sam's view of his students: email + signup
// date, newest first, with a count and a search box. Thin on purpose:
// no edit, no delete. Only the course-owner emails may see it; anyone else
// logged in gets a plain message. Not linked from the course nav.
import { useEffect, useState } from "react";
import { supabase, useAuth } from "./supabase";
import { ADMIN_EMAILS } from "./config";

type Profile = { id: string; email: string; created_at: string };

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

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">
          Course Admin
        </p>
        <h1 className="mb-2 font-serif text-3xl font-bold leading-tight md:text-4xl">Students</h1>
        <p className="mb-6 text-muted-foreground">
          {profiles.length} {profiles.length === 1 ? "student" : "students"}
        </p>
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
            {filtered.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-[oklch(0.4_0_0)] bg-[oklch(0.2_0_0)] px-4 py-3 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)]"
              >
                <span className="min-w-0 flex-1 break-all font-medium">{p.email}</span>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {formatDate(p.created_at)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
