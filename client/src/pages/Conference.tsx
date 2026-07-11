import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, GraduationCap, Download, CheckCircle, Instagram } from "lucide-react";

export default function Conference() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    try {
      // Submit to Netlify Forms
      const formData = new URLSearchParams();
      formData.append("form-name", "conference-lead");
      formData.append("email", email);
      formData.append("source", "conference");

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      setSubmitted(true);
      // Auto-download the PDF
      const link = document.createElement('a');
      link.href = '/HowtoDateAuthenticallyApendix.pdf';
      link.download = 'How-to-Date-Authentically-Questions-Guide.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // Even if Netlify form fails, still give them the download
      setSubmitted(true);
      const link = document.createElement('a');
      link.href = '/HowtoDateAuthenticallyApendix.pdf';
      link.download = 'How-to-Date-Authentically-Questions-Guide.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero — tight, mobile-first */}
      <section className="pt-12 pb-8 px-6">
        <div className="max-w-lg mx-auto text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-3">
            Thanks for connecting
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Your Authentic Dating Journey Starts Now
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            You just took the first step toward dating with authenticity. Here are three ways to keep the momentum going.
          </p>
        </div>
      </section>

      {/* Three conversion cards */}
      <section className="px-6 pb-12">
        <div className="max-w-lg mx-auto space-y-6">

          {/* Card 1: Buy the Book */}
          <div className="bg-card border border-border/50 rounded-lg p-6 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-lg mb-1">Get the Book</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  <em>How to Date Authentically</em> — the bestselling framework that has helped thousands of singles end the dating game and find lasting love.
                </p>
                <a href="https://amzn.to/4flIlj8" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider text-sm px-6">
                    Buy on Amazon <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Enroll in Course */}
          <div className="bg-card border border-border/50 rounded-lg p-6 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-lg mb-1">Take the Course</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  Go deeper with the <em>How to Date Authentically</em> online course — 5 modules of practical tools, frameworks, and exercises. One payment, lifetime access.
                </p>
                <p className="text-sm text-primary/90 font-medium mb-2">
                  Enroll now and get a free e-copy of the book included.
                </p>
                <a href="https://sam-s-site-9e21.thinkific.com/courses/HTDAC" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider text-sm px-6">
                    Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Free Dating Questions Guide */}
          <div className="bg-card border border-primary/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-lg mb-1">Free Dating Questions Guide</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  20 conversation starters that lead to real connection — plus tips for being straightforward and honest. Enter your email and get it instantly.
                </p>
                {submitted ? (
                  <div className="flex items-center gap-3 text-primary">
                    <CheckCircle className="h-5 w-5" />
                    <div>
                      <p className="font-semibold text-sm">Your guide is downloading!</p>
                      <a
                        href="/HowtoDateAuthenticallyApendix.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs underline text-primary/80 hover:text-primary"
                      >
                        Click here if it didn't start
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} data-netlify="true" name="conference-lead" className="flex flex-col sm:flex-row gap-3">
                    <input type="hidden" name="form-name" value="conference-lead" />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      className="flex-1 px-4 py-2.5 rounded-sm bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <input type="hidden" name="source" value="conference" />
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider text-sm px-6"
                    >
                      {submitting ? "Sending..." : "Get the Guide"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Couple testimonials */}
      <section className="px-6 pb-12">
        <div className="max-w-lg mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center mb-6">Real couples. Real results.</p>
          <div className="space-y-4">
            <blockquote className="border-l-2 border-primary/50 pl-4">
              <p className="text-sm text-muted-foreground italic">
                "This book truly guided me in making my most important life decision — to marry my beautiful and incredible wife. 12/10 recommend this book to anyone who continually finds themselves stuck in the world of dating."
              </p>
              <cite className="text-xs text-foreground/70 not-italic mt-1 block">— Jacob & Mik</cite>
            </blockquote>
            <blockquote className="border-l-2 border-primary/50 pl-4">
              <p className="text-sm text-muted-foreground italic">
                "This book changed my perspective on what dating is truly about and who it is about. It gave me the opportunity to change and see the best person who was right in front of me."
              </p>
              <cite className="text-xs text-foreground/70 not-italic mt-1 block">— Maddy & Skyler</cite>
            </blockquote>
            <blockquote className="border-l-2 border-primary/50 pl-4">
              <p className="text-sm text-muted-foreground italic">
                "DEEP. LOVED IT. Sam changed my life with this principle. I highly recommend."
              </p>
              <cite className="text-xs text-foreground/70 not-italic mt-1 block">— Sean & Aly</cite>
            </blockquote>
          </div>
          <div className="text-center mt-8">
            <a href="/" className="text-sm text-primary hover:text-primary/80 transition-colors underline underline-offset-4">
              Visit the full website →
            </a>
          </div>
        </div>
      </section>

      {/* Footer — minimal */}
      <footer className="px-6 pb-8">
        <div className="max-w-lg mx-auto border-t border-border/50 pt-6 flex flex-col items-center gap-3">
          <a
            href="https://www.instagram.com/howtodateauthentically"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram size={15} />
            @howtodateauthentically
          </a>
          <p className="text-xs text-muted-foreground">
            © 2026 Sam Whitney · <a href="/" className="hover:text-primary transition-colors">rightorhappybook.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
