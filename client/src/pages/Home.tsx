import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Play, BookOpen, Mic, Users, Award, Loader2, X } from "lucide-react";
import { toast } from "sonner";

const VIDEO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663520822653/XzHygVphCqKdRzjxHXTGoD/c7885ba3368e45c1b99b60e706bba856_582436d4.MP4";

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-primary-foreground">
        {count}{suffix}
      </p>
    </div>
  );
}

function VideoModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        <video
          src={VIDEO_URL}
          controls
          autoPlay
          className="w-full rounded-lg shadow-2xl"
          style={{ maxHeight: "80vh" }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLeadSubmitting(true);

    try {
      const formData = new URLSearchParams();
      formData.append("form-name", "lead-magnet");
      formData.append("email", email);
      formData.append("source", "homepage");

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      setSubmitted(true);
      toast.success("Your guide is downloading now!");
      // Auto-download the PDF
      const link = document.createElement('a');
      link.href = '/HowtoDateAuthenticallyApendix.pdf';
      link.download = 'How-to-Date-Authentically-Questions-Guide.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // Still give them the download even if form submission fails
      setSubmitted(true);
      const link = document.createElement('a');
      link.href = '/HowtoDateAuthenticallyApendix.pdf';
      link.download = 'How-to-Date-Authentically-Questions-Guide.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <div>
      {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-background">
        <div className="container relative z-10 pt-8 pb-16">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text */}
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-6">
                Bestselling Author & Relationship Speaker
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6">
                Stop Playing<br />
                <span className="text-primary">the Game.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed">
                Sam Whitney helps singles break free from modern dating culture and build relationships grounded in authenticity.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://amzn.to/4flIlj8" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider px-8">
                    Get the Book <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 font-semibold uppercase tracking-wider px-8"
                  onClick={() => setVideoOpen(true)}
                >
                  <Play className="mr-2 h-4 w-4" /> Watch Sam Speak
                </Button>
              </div>
            </div>

            {/* Right: Book cover */}
            <div className="relative flex justify-center md:justify-end">
              <div className="relative flex justify-center">
                {/* Decorative gold glow behind book */}
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-3xl -z-10 scale-75" />
                <img
                  src="/images/book-cover.png"
                  alt="How to Date Authentically — End the Dating Game and Find Lasting Love"
                  className="w-56 md:w-72 lg:w-80 shadow-2xl rounded drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                />
                <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded shadow">
                  Bestseller
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">1,000+</p>
              <p className="text-sm text-primary-foreground/70 mt-2 uppercase tracking-wider">Thousands of Singles Reached</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={5} />
              <p className="text-sm text-primary-foreground/70 mt-2 uppercase tracking-wider">Podcast Appearances</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={3} />
              <p className="text-sm text-primary-foreground/70 mt-2 uppercase tracking-wider">Core Talk Topics</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={1} />
              <p className="text-sm text-primary-foreground/70 mt-2 uppercase tracking-wider">Bestselling Book</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Sam — with real photo */}
      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="/images/sam-with-book.jpg"
                alt="Sam Whitney holding How to Date Authentically"
                className="w-full max-w-md mx-auto rounded-lg object-cover shadow-2xl"
              />

            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">About Sam</p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
                A Message That Actually Changes How People Date
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Sam Whitney is the author of <em>How to Date Authentically: End the Dating Game and Find Lasting Love</em> — read by thousands of singles who are done playing games.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                As a dating and relationship coach, Sam has spoken to thousands, appeared on multiple nationally recognized podcasts, and has become a trusted voice for young adults navigating the complexity of modern dating. His message is direct, practical, and grounded: the games don't work. Authenticity does.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — with real couple photos */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">Success Stories</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">Real Couples. Real Results.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                names: "Jacob & Mik",
                img: "/images/mik-jacob.jpg",
                quote: "This book truly guided me in making my most important life decision — to marry my beautiful and incredible wife. 12/10 recommend this book to anyone who continually finds themselves stuck in the world of dating.",
              },
              {
                names: "Maddy & Skyler",
                img: "/images/maddy-skyler.png",
                quote: "This book changed my perspective on what dating is truly about and who it is about. It gave me the opportunity to change and see the best person who was right in front of me.",
              },
              {
                names: "Sean & Aly",
                img: "/images/sean-aly-2.png",
                quote: "DEEP. LOVED IT. Sam changed my life with this principle. I highly recommend.",
              },
            ].map((t) => (
              <div key={t.names} className="bg-background border border-border/50 rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={t.img}
                    alt={t.names}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">{t.names}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic text-sm">"{t.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Endorsements — with real headshots */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">Praise</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">What Leaders Are Saying</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Stephen MR. Covey",
                title: "NYT & WSJ #1 Bestselling Author, Speed of Trust",
                img: "/images/stephen-covey.jpg",
                quote: "Sam Whitney is extraordinary, and his insights into this are both incredibly timely and beautifully on target. Just wonderful!",
              },
              {
                name: "Joseph Grenny",
                title: "Chairman, The Other Side Academy",
                img: "/images/joseph-grenny.jpg",
                quote: "Sam Whitney's book is a must read not just for dating but for life. He reframes what is often a painful exercise in mutual manipulation into a lifetime project of growth and true intimacy.",
              },
              {
                name: "Jacob Brown Ph.D",
                title: "Postdoctoral Research Associate, NCPRE",
                img: "/images/jacob-brown.jpg",
                quote: "These insights are powerful, practical, and poignant. For anyone looking for stories, insights, and strategies to overcome dating roadblocks and find authentic connection, look no further.",
              },
            ].map((e) => (
              <div key={e.name} className="border border-border/50 rounded-lg p-8 hover:border-primary/30 transition-colors flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={e.img}
                    alt={e.name}
                    className="w-16 h-16 rounded-full object-cover object-top border-2 border-primary/20 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold">{e.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{e.title}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed italic text-sm flex-1">"{e.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Feature */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">The Book</p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
                How to Date Authentically
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                End the Dating Game and Find Lasting Love. The book that started the conversation — and changed how thousands of singles approach dating.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Grounded in real psychology and practical wisdom, this isn't another dating tips book. It's a framework for showing up as yourself and attracting someone who loves who you actually are.
              </p>
              <a href="https://amzn.to/4flIlj8" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider px-8">
                  Get the Book <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="/images/book-cover.png"
                  alt="How to Date Authentically book cover"
                  className="w-64 md:w-80 shadow-2xl rounded"
                />
                <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded shadow">
                  Bestseller
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcasts */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">Media</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">Podcast Appearances</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Dating Intentionally", img: "/images/podcast-dating-intentionally.png" },
              { name: "Let's Talk Relationships", img: "/images/podcast-lets-talk-relationships.png" },
              { name: "Dating Made Simple", img: "/images/podcast-dating-made-simple.png" },
              { name: "52 Dating", img: "/images/podcast-52-dating.jpg" },
            ].map((p) => (
              <div key={p.name} className="bg-card border border-border/50 rounded-lg overflow-hidden hover:border-primary/30 transition-colors group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="font-medium text-sm">{p.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="section-padding bg-primary/5 border-y border-primary/20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Free Dating Questions Guide</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Get the conversation starters that lead to real connection. Enter your email and we'll send you the guide instantly.
            </p>
            {submitted ? (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
                <Award className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="font-semibold text-primary">You're in! Check your email for the guide.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} data-netlify="true" name="lead-magnet" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="hidden" name="form-name" value="lead-magnet" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-card border-border"
                />
                <Button type="submit" disabled={leadSubmitting} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold whitespace-nowrap">
                  {leadSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Download Now"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="section-padding relative overflow-hidden"
        style={{
          backgroundImage: `url('/images/couple-canoe.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="container text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-white">Ready to Date Differently?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
            Whether you start with the book, the course, or a coaching session — the first step is choosing authenticity over games.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://amzn.to/4flIlj8" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider px-8">
                Get the Book
              </Button>
            </a>
            <a href="https://sam-s-site-9e21.thinkific.com/courses/HTDAC" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold uppercase tracking-wider px-8">
                Enroll in Course
              </Button>
            </a>
            <Link href="/coaching">
              <Button size="lg" variant="outline" className="border-white/60 text-white/90 hover:bg-white/10 font-semibold uppercase tracking-wider px-8">
                Book Coaching
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
