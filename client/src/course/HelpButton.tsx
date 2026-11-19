import { useState } from "react";
import { Mail, X, Copy, Check } from "lucide-react";

const SUPPORT_EMAIL = "authenticdating24@gmail.com";

// Small floating help button, shown on course screens only (the Layout
// renders it when the route starts with /course). It shows the support
// email so a student can copy it or tap to email us.
export default function HelpButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
    } catch {
      // Fallback for browsers without clipboard access.
      const el = document.createElement("textarea");
      el.value = SUPPORT_EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-72 rounded-lg border border-border bg-card p-4 shadow-2xl">
          <p className="font-serif text-lg font-bold mb-1">Having trouble?</p>
          <p className="text-sm text-muted-foreground mb-3">
            Send us a quick note and we will help.
          </p>
          <div className="flex items-center gap-2 rounded border border-border bg-background px-3 py-2">
            <span className="flex-1 truncate text-sm">{SUPPORT_EMAIL}</span>
            <button
              type="button"
              onClick={copyEmail}
              className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary hover:text-primary/80"
              aria-label="Copy support email"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-3 inline-block text-sm font-semibold text-primary hover:text-primary/80"
          >
            Or email us directly
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90"
        aria-label={open ? "Close help" : "Get help"}
      >
        {open ? <X className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
      </button>
    </div>
  );
}
