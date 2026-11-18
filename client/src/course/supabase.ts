// Supabase client + the thin auth hook used by the course pages.
// Sessions live in the browser (Supabase stores the token in localStorage).
// Lesson progress still lives in the course's own localStorage key (store.ts).

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
