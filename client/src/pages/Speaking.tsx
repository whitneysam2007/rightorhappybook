import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Users, Calendar, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const topics = [
  {
    title: "End the Dating Game",
    type: "Keynote",
    description: "A powerful keynote exploring how modern dating culture has turned relationships into a game — and how to break free. Sam shares the 'Right vs. Happy' framework that has helped hundreds of singles find authentic connection.",
  },
  {
    title: "Authenticity Framework",
    type: "Workshop",
    description: "An interactive workshop where attendees learn and practice the 3-step authenticity framework: Consider Others, Be Curious, Be Straightforward. Includes live exercises and group discussion.",
  },
  {
    title: "Dating with Faith & Purpose",
    type: "Fireside",
    description: "A fireside conversation exploring the intersection of faith, purpose, and dating. Sam shares how spiritual grounding transforms the dating experience from anxiety to peace.",
  },
];

export default function Speaking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    eventDate: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body = new URLSearchParams();
      body.append("form-name", "speaking-inquiry");
      Object.entries(formData).forEach(([k, v]) => body.append(k, v));
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setSubmitted(true);
      toast.success("Inquiry submitted! Sam will be in touch.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/sam-speaking-1.jpg"
            alt="Sam Whitney speaking on stage"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-6">Speaking</p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
                Book Sam for Your Event
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Sam Whitney delivers keynotes, workshops, and fireside conversations that challenge audiences to rethink dating and relationships. His talks are practical, engaging, and grounded in real experience.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mic className="h-4 w-4 text-primary" />
                  <span>Keynotes & Workshops</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Corporate & Community Events</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Available Globally</span>
                </div>
              </div>
              <a href="#booking">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider px-8">
                  Inquire Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              <img
                src="/images/sam-speaking-1.jpg"
                alt="Sam Whitney speaking at podium"
                className="w-full rounded-lg object-cover shadow-xl aspect-[3/4]"
              />
              <img
                src="/images/sam-speaking-2.jpg"
                alt="Sam Whitney on stage"
                className="w-full rounded-lg object-cover shadow-xl aspect-[3/4] mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">Topics</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">Speaking Topics</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {topics.map((topic) => (
              <div key={topic.title} className="border border-border/50 rounded-lg p-8 hover:border-primary/30 transition-colors">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider rounded mb-4">
                  {topic.type}
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{topic.title} <span className="text-muted-foreground font-normal text-base">({topic.type.toLowerCase()})</span></h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="section-padding">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">Inquire</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Book Sam for Your Event</h2>
            </div>
            {submitted ? (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-8 text-center">
                <CheckCircle className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Inquiry Received!</h3>
                <p className="text-muted-foreground">Sam will review your request and get back to you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-netlify="true" name="speaking-inquiry" className="space-y-6">
                <input type="hidden" name="form-name" value="speaking-inquiry" />
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
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Organization</label>
                    <Input
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="bg-card border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Event Date</label>
                    <Input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="bg-card border-border"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Tell us about your event</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    required
                    className="bg-card border-border"
                  />
                </div>
                <Button type="submit" size="lg" disabled={submitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider">
                  {submitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                  ) : (
                    "Submit Speaking Inquiry"
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
