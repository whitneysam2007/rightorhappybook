// Login page (/course/login). Signs in, then goes to /course/learn.
// Also handles "Forgot password?" (sends a reset email) and the reset link
// itself: Supabase fires PASSWORD_RECOVERY when the emailed link is opened,
// and this page then shows the set-a-new-password form.
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { supabase } from "./supabase";
import { AuthShell, inputClass } from "./AuthShell";

type Mode = "login" | "forgot" | "recovery";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<Mode>("login");

  // The emailed reset link lands here with a session: show the new-password form.
  // Check the hash directly (the PASSWORD_RECOVERY event may have fired
  // before this component mounted), then keep listening as a backup.
  useEffect(() => {
    if (window.location.hash.includes("type=recovery")) {
      setMode("recovery");
      setNotice("");
      setError("");
      window.history.replaceState(null, "", window.location.pathname);
    }
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setMode("recovery");
        setNotice("");
        setError("");
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (error) {
      if (/not confirmed/i.test(error.message)) {
        setError(
          "Your email isn't confirmed yet. Check your inbox for the confirmation email, then try again.",
        );
      } else {
        setError(error.message);
      }
      return;
    }
    setLocation("/course/learn");
  };

  const sendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/course/login`,
    });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setNotice("If that email has an account, a reset link is on its way. Check your inbox.");
  };

  const saveNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 8) {
      setError("Your password needs to be at least 8 characters.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setMode("login");
    setNewPassword("");
    setNotice("Your password is set. Log in with it.");
  };

  if (mode === "recovery") {
    return (
      <AuthShell eyebrow="The Course" title="Set a new password">
        <form onSubmit={saveNewPassword} className="space-y-4">
          <div>
            <label htmlFor="new-password" className="mb-1.5 block text-sm font-semibold">
              New password
            </label>
            <input
              id="new-password"
              type="password"
              required
              autoComplete="new-password"
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            {busy ? "Saving…" : "Save new password"}
          </button>
        </form>
      </AuthShell>
    );
  }

  if (mode === "forgot") {
    return (
      <AuthShell eyebrow="The Course" title="Reset your password" intro="Tell us the email you signed up with.">
        <form onSubmit={sendReset} className="space-y-4">
          <div>
            <label htmlFor="reset-email" className="mb-1.5 block text-sm font-semibold">
              Email
            </label>
            <input
              id="reset-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          {notice && <p className="text-sm text-primary">{notice}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {busy ? "Sending…" : "Send reset link"}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          <button type="button" onClick={() => { setMode("login"); setError(""); setNotice(""); }} className="text-primary hover:underline">
            Back to log in
          </button>
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell eyebrow="The Course" title="Log in" intro="Welcome back. Log in to keep going.">
      <form onSubmit={signIn} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="mb-1.5 block text-sm font-semibold">
            Email
          </label>
          <input
            id="login-email"
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
          <label htmlFor="login-password" className="mb-1.5 block text-sm font-semibold">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className={inputClass}
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {notice && <p className="text-sm text-primary">{notice}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {busy ? "Logging in…" : "Log in"}
        </button>
      </form>
      <div className="mt-5 flex items-center justify-between text-sm">
        <button type="button" onClick={() => { setMode("forgot"); setError(""); setNotice(""); }} className="text-muted-foreground hover:text-foreground">
          Forgot password?
        </button>
        <Link href="/course/signup" className="text-primary hover:underline">
          New here? Sign up
        </Link>
      </div>
    </AuthShell>
  );
}
