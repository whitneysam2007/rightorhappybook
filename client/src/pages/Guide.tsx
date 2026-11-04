import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Play } from "lucide-react";

// Landing page for the Meta ad campaign — single offer only.
// No navigation, no book/course buttons competing with the form.
// Video: replace VIDEO_PLACEHOLDER below with Sam's short video file
// (for example, /videos/guide-landing-video.mp4) once he sends it.
const VIDEO_PLACEHOLDER = "";

export default function Guide() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    try {
      const formData = new URLSearchParams();
      formData.append("form-name", "guide-lead");
      formData.append("email", email);
      formData.append("source", "meta-ad");

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      // Meta Pixel Lead event — fires only after a real signup.
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      if (fbq) fbq("track", "Lead");

      setSubmitted(true);
      const link = document.createElement("a");
      link.href = "/HowtoDateAuthenticallyApendix.pdf";
      link.download = "How-to-Date-Authentically-Questions-Guide.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // Even if the form post fails, still give them the download.
      setSubmitted(true);
      const link = document.createElement("a");
      link.href = "/HowtoDateAuthenticallyApendix.pdf";
      link.download = "How-to-Date-Authentically-Questions-Guide.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero — one offer, form above the fold */}
      <section className="pt-12 pb-8 px-6">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">
            Free Guide · From How to Date Authentically
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight">
            20 questions that make dating feel less like a game
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Real questions you can actually use on your next date, from the
            appendix to Sam Whitney&apos;s book, plus what to do in the
            awkward moments in between.
          </p>

          {/* Video — Sam's short video goes here */}
          <div className="mb-8 rounded-lg overflow-hidden border border-border/50 bg-card">
            {VIDEO_PLACEHOLDER ? (
              <video
                src={VIDEO_PLACEHOLDER}
                controls
                playsInline
                preload="metadata"
                aria-label="Sam Whitney introduces the free dating questions guide"
                className="w-full"
              />
            ) : (
              <div className="aspect-video flex flex-col items-center justify-center gap-3 p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <p className="font-semibold">Sam&apos;s short video goes here</p>
                <p className="text-sm text-muted-foreground">
                  60 to 90 seconds: the hook, what the guide helps you do on
                  your next date, and how to get it free.
                </p>
              </div>
            )}
          </div>

          {/* Form — email only */}
          {submitted ? (
            <div className="flex items-center justify-center gap-3 text-primary bg-primary/10 border border-primary/30 rounded-lg p-6">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-sm">Your guide is downloading!</p>
                <a
                  href="/HowtoDateAuthenticallyApendix.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs underline text-primary/80 hover:text-primary"
                >
                  Click here if it didn&apos;t start
                </a>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              data-netlify="true"
              name="guide-lead"
              className="flex flex-col sm:flex-row gap-3"
            >
              <input type="hidden" name="form-name" value="guide-lead" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 px-4 py-2.5 rounded-sm bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input type="hidden" name="source" value="meta-ad" />
              <Button
                type="submit"
                disabled={submitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider text-sm px-6"
              >
                {submitting ? "Sending..." : "Send Me the Questions"}
              </Button>
            </form>
          )}
          <p className="text-xs text-muted-foreground mt-4">
            I&apos;ll email the guide instantly, plus occasional notes.
            Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* What's inside */}
      <section className="px-6 pb-12">
        <div className="max-w-lg mx-auto space-y-4">
          <h2 className="font-semibold text-lg text-center">What&apos;s inside</h2>
          <div className="bg-card border border-border/50 rounded-lg p-6 space-y-3 text-sm text-muted-foreground">
            <p>✓ 20 conversation questions from the book&apos;s appendix</p>
            <p>✓ What to do when you want to tell someone you like them</p>
            <p>✓ What to say when a first date gets awkward</p>
            <p>✓ How to be straightforward about ending something</p>
          </div>
          <blockquote className="border-l-2 border-primary/50 pl-4">
            <p className="text-sm text-muted-foreground italic">
              &ldquo;Sam brought humor, honesty, and wisdom to a topic that
              can often feel discouraging. I left feeling hopeful about
              dating again.&rdquo;
            </p>
            <cite className="text-xs text-foreground/70 not-italic mt-1 block">
              — Audience feedback
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Second form — same offer, no new choices */}
      <section className="px-6 pb-12">
        <div className="max-w-lg mx-auto text-center">
          <p className="font-semibold mb-4">Ready to try one on your next date?</p>
          {submitted ? (
            <p className="text-sm text-primary">
              You&apos;re in — your guide is downloading above.
            </p>
          ) : (
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider text-sm px-6">
                <Download className="mr-2 h-4 w-4" /> Get the Free Guide
              </Button>
            </a>
          )}
        </div>
      </section>

      {/* Footer — minimal */}
      <footer className="px-6 pb-8">
        <div className="max-w-lg mx-auto border-t border-border/50 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Sam Whitney ·{" "}
            <a href="/" className="hover:text-primary transition-colors">
              rightorhappybook.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
