// Shared shell for the course auth pages: same neutral dark panel as the
// lessons (oklch 0.2 fill, oklch 0.4 border), gold only as the button.
import type { ReactNode } from "react";
import { Link } from "wouter";

export const inputClass =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm";

export function AuthShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-md">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </p>
        <h1 className="mb-4 font-serif text-3xl font-bold leading-tight md:text-4xl">
          {title}
        </h1>
        {intro && <p className="mb-6 leading-relaxed text-muted-foreground">{intro}</p>}
        <div className="rounded-2xl border border-[oklch(0.4_0_0)] bg-[oklch(0.2_0_0)] p-5 shadow-[0_28px_70px_-18px_rgba(0,0,0,0.9)] sm:p-7">
          {children}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/course" className="hover:text-foreground">
            ← Back to the course page
          </Link>
        </p>
      </div>
    </div>
  );
}
