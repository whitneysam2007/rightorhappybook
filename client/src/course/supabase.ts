// Supabase client + the thin auth hook used by the course pages.
// Sessions live in the browser (Supabase stores the token in localStorage).
// Lesson answers still live in the course's own localStorage key (store.ts);
// only the list of finished lesson ids is shared, for the admin page.

import { useEffect, useRef, useState } from "react";
import { createClient, type Session, type User } from "@supabase/supabase-js";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "./config";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Keep the admin list current: on every fresh session, record the user in
// public.profiles (id + email). Quiet on purpose: a failure here must never
// block login or the course.
export async function upsertProfile(user: User): Promise<void> {
  if (!user.email) return;
  try {
    await supabase
      .from("profiles")
      .upsert({ id: user.id, email: user.email }, { onConflict: "id" });
  } catch {
    // profiles table or policy not ready yet, the course still works
  }
}

// Read the learner's cloud progress row, if one exists. Returns the
// finished lesson ids, or null when there is no row yet or the table
// isn't reachable. Quiet on purpose, like syncProgress: the caller
// treats null as "no cloud progress to merge" and carries on.
export async function fetchCloudProgress(userId: string): Promise<number[] | null> {
  try {
    const { data, error } = await supabase
      .from("course_progress")
      .select("completed")
      .eq("user_id", userId)
      .maybeSingle();
    if (error || !data) return null;
    return Array.isArray(data.completed) ? (data.completed as number[]) : null;
  } catch {
    return null;
  }
}

// Lesson progress for the admin page: the learner's finished lesson ids,
// in public.course_progress (one row per learner). Same quiet rule as
// upsertProfile: a failure here must never block the course. The store
// merges the cloud row with the device's list on load (see store.ts),
// so this upsert only ever writes a merged list, never a bare device
// list that could wipe progress made on another device.
export async function syncProgress(userId: string, completed: number[]): Promise<void> {
  try {
    await supabase.from("course_progress").upsert(
      { user_id: userId, completed, updated_at: new Date().toISOString() },
      { onConflict: "user_id" },
    );
  } catch {
    // progress table or policy not ready yet, the course still works
  }
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const upsertedFor = useRef<string | null>(null);

  useEffect(() => {
    let alive = true;
    const record = (user: User | null) => {
      if (!user || upsertedFor.current === user.id) return;
      upsertedFor.current = user.id;
      void upsertProfile(user);
    };
    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSession(data.session);
      setLoading(false);
      record(data.session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!alive) return;
      setSession(nextSession);
      setLoading(false);
      record(nextSession?.user ?? null);
    });
    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, []);

  return { session, user: session?.user ?? null, loading };
}
