// Signup page (/course/signup). Stripe sends buyers here after payment.
// Email confirmation is ON in Supabase, so a new account must confirm via
// the email Supabase sends before login works. The page says that plainly.
import { useState } from "react";
import { Link } from "wouter";
import { supabase } from "./supabase";
import { AuthShell, inputClass } from "./AuthShell";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Your password needs to be at least 8 characters.");
      return;
    }
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: `${window.location.origin}/course/login` },
    });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    // With confirmation on, there is no session yet: the inbox step comes first.
    if (!data.session) {
      setDone(true);
      return;
    }
    // If confirmation was ever turned off, a session means they are in.
    window.location.assign("/course/learn");
  };

  if (done) {
    return (
      <AuthShell eyebrow="The Course" title="Check your inbox">
        <p className="leading-relaxed">
          Your account is made. Check your inbox to confirm your email, then log in.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          No email after a few minutes? Check spam, then try signing up again.
        </p>
        <Link
          href="/course/login"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Go to log in
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="The Course"
      title="Create your account"
      intro="You just paid for the course. Set up your login and you're in."
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="signup-email" className="mb-1.5 block text-sm font-semibold">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="signup-password" className="mb-1.5 block text-sm font-semibold">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            required
            autoComplete="new-password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className={inputClass}
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {busy ? "Creating your account…" : "Create my account"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/course/login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
