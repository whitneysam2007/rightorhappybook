import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

// Landing page for the Meta ad campaign — stripped down, single offer only.
// No video, no question list, no second call to action.
// One email form, a short book note, a Covey quote, and a good-luck close.
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
      <section className="pt-16 pb-8 px-6">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">
            Free Guide · From How to Date Authentically
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Put your email in, get the free questions guide
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            20 questions that make dating feel less like a game. Enter your email and the guide will download instantly.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 text-primary bg-primary/10 border border-primary/30 rounded-lg p-6">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-sm">
                  Thank you — your guide is downloading!
                </p>
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
                {submitting ? "Sending..." : "Get the Guide"}
              </Button>
            </form>
          )}
          <p className="text-xs text-muted-foreground mt-4">
            I&apos;ll check in later to see how the questions are working for you. Unsubscribe anytime.
          </p>

          <p className="text-muted-foreground leading-relaxed mt-10">
            Thank you for being here, and good luck out there. I hope these
            questions help you find real connection.
          </p>
        </div>
      </section>

      {/* Short book note */}
      <section className="px-6 pb-8">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-3">
            If you like the questions, the full framework is in the book.
          </p>
          <a href="/book" className="block mb-4">
            <img
              src="/images/book-cover.png"
              alt="How to Date Authentically by Sam Whitney — learn more about the book"
              className="w-40 mx-auto rounded-sm shadow-lg"
            />
          </a>
          <p className="text-sm mb-4">
            <a href="/book" className="text-primary hover:underline">
              Learn more about the book
            </a>
          </p>
          <a
            href="https://amzn.to/4flIlj8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 font-semibold uppercase tracking-wider text-sm px-6"
            >
              Get How to Date Authentically
            </Button>
          </a>
        </div>
      </section>

      {/* Covey quote */}
      <section className="px-6 pb-12">
        <div className="max-w-lg mx-auto">
          <blockquote className="border-l-2 border-primary/50 pl-4">
            <p className="text-sm text-muted-foreground italic">
              &ldquo;Sam Whitney is extraordinary, and his insights into
              this are both incredibly timely and beautifully on target.
              Just wonderful!&rdquo;
            </p>
            <cite className="text-xs text-foreground/70 not-italic mt-1 block">
              — Stephen M.R. Covey
            </cite>
          </blockquote>
        </div>
      </section>

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
