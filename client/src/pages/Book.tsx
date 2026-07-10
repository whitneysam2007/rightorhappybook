import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Star } from "lucide-react";
import { Link } from "wouter";

export default function Book() {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-6">The Bestselling Book</p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
                How to Date<br />Authentically
              </h1>
              <p className="text-xl text-muted-foreground mb-2">End the Dating Game and Find Lasting Love</p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Does dating feel like a dead-end maze of bad matches, mixed signals, and heartbreak? This book presents a different, liberating, and enlightening view of dating — aiming for peace, fantastic experiences, and dynamic results. It encourages you to see others as real people and discover genuine, lasting connections.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>85 Pages</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Bestseller</span>
                </div>
              </div>
              <a
                href="https://amzn.to/4flIlj8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider px-8">
                  Buy the Book <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-3xl -z-10" />
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

      {/* What You'll Discover */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">Inside the Book</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">What You'll Discover</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              "The difference between dating to be 'right' vs. dating to be 'happy'",
              "How self-focused dating sabotages authentic connection",
              "The 3 steps to authentic dating: Consider Others, Be Curious, Be Straightforward",
              "How to break free from the modern dating game",
              "Practical exercises and challenges for real-world application",
              "A framework for building genuine, lasting relationships",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Endorsements */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">Endorsements</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">What Leaders Are Saying</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                name: "Stephen MR. Covey",
                title: "NYT & WSJ #1 Bestselling Author, Speed of Trust",
                quote: "I've been out of the traditional 'dating' game for a long, long time but I found the principles that underly, support, and drive meaningful relationships all throughout this tremendous book. Sam Whitney is extraordinary, and his insights into this are both incredibly timely and beautifully on target. Just wonderful!",
              },
              {
                name: "Joseph Grenny",
                title: "Chairman of the Board at The Other Side Academy and The Other Side Village",
                quote: "Sam Whitney's book is a must read not just for dating but for life. He reframes what is often a painful exercise in mutual manipulation into a lifetime project of growth and true intimacy. Thank you!",
              },
              {
                name: "Jacob Brown Ph.D",
                title: "Postdoctoral Research Associate, NCPRE | Organizational Researcher",
                quote: "I study authenticity and relationships in organizations, and can confirm based on my experience that these insights are powerful, practical, and poignant. Sam has an accessible and fun writing style that is equal parts entertaining and informative. For anyone looking for stories, insights, and strategies to overcome dating roadblocks and find authentic connection, look no further.",
              },
            ].map((e) => (
              <div key={e.name} className="border border-border/50 rounded-lg p-8">
                <p className="text-foreground/90 leading-relaxed italic mb-6">"{e.quote}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={e.name === "Stephen MR. Covey" ? "/images/stephen-covey.jpg" : e.name === "Joseph Grenny" ? "/images/joseph-grenny.jpg" : "/images/jacob-brown.jpg"}
                    alt={e.name}
                    className="w-12 h-12 rounded-full object-cover object-top border-2 border-primary/20"
                  />
                  <div>
                    <p className="font-semibold text-sm">{e.name}</p>
                    <p className="text-xs text-muted-foreground">{e.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
