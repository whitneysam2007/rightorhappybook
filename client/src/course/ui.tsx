import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { DRIVE_PREVIEW, VIDEOS, lessonById, nextLesson, prevLesson } from "./data";

export function Chip({
  on,
  cut,
  multi,
  onClick,
  children,
}: {
  on?: boolean;
  cut?: boolean;
  multi?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!!on}
      className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-[15px] leading-snug transition-colors ${
        on
          ? "border-primary bg-primary/15 text-foreground"
          : "border-border bg-card text-foreground hover:border-primary/60"
      } ${cut ? "opacity-45 line-through" : ""}`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 ${
          multi ? "rounded-md" : "rounded-full"
        } ${on ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/60"}`}
      >
        {on && <Check className="h-3.5 w-3.5" />}
      </span>
      <span className="flex-1">{children}</span>
    </button>
  );
}

export function ChipRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export function VideoEmbed({ videoKey, title }: { videoKey: keyof typeof VIDEOS; title: string }) {
  const v = VIDEOS[videoKey];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-black">
      <div className="relative aspect-video w-full">
        <iframe
          src={DRIVE_PREVIEW(v.id)}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
      <p className="px-4 py-2 text-xs text-muted-foreground">
        Video · {v.minutes} · Streams from Google Drive for now — a permanent home for the videos is still to come.
      </p>
    </div>
  );
}

export function ModeBadge({ mode }: { mode: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
      {mode}
    </span>
  );
}

// Applying work sits on its own raised panel — a touch lighter neutral dark
// gray than the lesson panel, with a gold left edge — so learning and
// applying are easy to tell apart at a glance. No gold tint in the surface
// itself; the border and fill are strictly neutral.
export function ApplyBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-10 rounded-xl border border-[oklch(0.4_0_0)] border-l-4 border-l-primary bg-[oklch(0.23_0_0)] p-4 shadow-[0_10px_28px_-12px_rgba(0,0,0,0.75)] first:mt-0 sm:p-5">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{label}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function LessonNav({ lessonId, onDone, isDone }: { lessonId: number; onDone?: () => void; isDone?: boolean }) {
  const prev = prevLesson(lessonId);
  const next = nextLesson(lessonId);
  return (
    <div className="mt-10 flex items-center justify-between gap-3 border-t border-border pt-6">
      {prev ? (
        <Link href={`/course/learn/${prev.id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {prev.title}
        </Link>
      ) : (
        <Link href="/course/learn" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All lessons
        </Link>
      )}
      {next ? (
        <Link
          href={`/course/learn/${next.id}`}
          onClick={onDone}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Next: {next.title} <ArrowRight className="h-4 w-4" />
        </Link>
      ) : isDone ? (
        <span className="inline-flex items-center gap-2 text-sm text-primary">
          <Check className="h-4 w-4" /> That's the course — now go live it.
        </span>
      ) : (
        <button
          type="button"
          onClick={onDone}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Check className="h-4 w-4" /> Finish the course
        </button>
      )}
    </div>
  );
}

export function SavedNote() {
  return (
    <p className="mt-3 text-xs text-muted-foreground">
      Your answers stay on this device. Nothing you write here is sent anywhere.
    </p>
  );
}
