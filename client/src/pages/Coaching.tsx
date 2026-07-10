import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Heart, Target, Compass, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Coaching() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body = new URLSearchParams();
      body.append("form-name", "coaching-request");
      Object.entries(formData).forEach(([k, v]) => body.append(k, v));
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setSubmitted(true);
      toast.success("Request submitted! Sam will be in touch.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-6">1-on-1 Coaching</p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
                Personalized Dating Coaching
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Work directly with Sam to apply the authenticity framework to your unique situation. Whether you're stuck in patterns, recovering from a breakup, or ready to approach dating differently — coaching accelerates the shift.
              </p>
            </div>
            <div className="relative hidden md:block">
              <img
                src="/images/sam-with-book.jpg"
                alt="Sam Whitney"
                className="w-full max-w-sm mx-auto rounded-lg object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">Approach</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">How Coaching Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Identify Patterns</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                We uncover the "World of Right" patterns that are keeping you stuck — the stories, expectations, and self-focused habits that sabotage connection.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Compass className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Reframe Your Approach</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Together we build a personalized plan rooted in the authenticity framework — shifting from "finding the right person" to "building the right relationship."
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Take Action</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                You leave each session with specific, practical steps to apply immediately. Coaching is about doing, not just understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">Get Started</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Request a Coaching Session</h2>
              <p className="text-muted-foreground mt-4">Fill out the form below and Sam will reach out to schedule your session.</p>
            </div>
            {submitted ? (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-8 text-center">
                <CheckCircle className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Request Received!</h3>
                <p className="text-muted-foreground">Sam will reach out within 48 hours to schedule your session.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-netlify="true" name="coaching-request" className="space-y-6">
                <input type="hidden" name="form-name" value="coaching-request" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-card border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-card border-border"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Phone (optional)</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-card border-border"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">What are you working through?</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    required
                    placeholder="Tell Sam about your situation and what you'd like to work on..."
                    className="bg-card border-border"
                  />
                </div>
                <Button type="submit" size="lg" disabled={submitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider">
                  {submitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                  ) : (
                    "Request Coaching Session"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
