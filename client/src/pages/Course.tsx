import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Play, BookOpen, Users, Award, ArrowRight } from "lucide-react";

const modules = [
  {
    title: "Welcome",
    lessons: ["Course Introduction", "How to Use This Course", "Your Dating Journey Starts Here"],
  },
  {
    title: "Dating in the World of Right",
    lessons: ["Understanding the World of Right", "The Right Story", "Superficially Focused", "Alienating Others", "When Things Go to Plan"],
  },
  {
    title: "Entering the World of Happy",
    lessons: ["Introduction to Happy", "Step 1: Consider Other People", "Step 2: Be Curious", "Step 3: Be Helpful by Being Straightforward"],
  },
  {
    title: "Dating Tools",
    lessons: ["Practical Conversation Starters", "Reading Authentic Signals", "Building Connection in Real Time", "How Will I Know?"],
  },
  {
    title: "Wrap Up",
    lessons: ["Final Thoughts", "Your Action Plan", "Community & Next Steps"],
  },
];

export default function Course() {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-6">Online Course</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
              How to Date Authentically
            </h1>
            <p className="text-xl text-muted-foreground mb-4">The Complete Course</p>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
              Go deeper than the book. This self-paced video course walks you through the entire authenticity framework with practical exercises, real-world examples, and tools you can use immediately.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Play className="h-4 w-4 text-primary" />
                <span>16 Video Lessons</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>5 Modules</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>Self-Paced</span>
              </div>
            </div>
            <div className="bg-card border border-primary/30 rounded-lg p-8 inline-block">
              <p className="text-sm text-muted-foreground mb-6">Lifetime access. One payment. No subscription.</p>
              <a href="https://sam-s-site-9e21.thinkific.com/courses/HTDAC" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider px-10">
                  Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">Outcomes</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">What You'll Learn</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              "Identify whether you're dating in the 'World of Right' or 'World of Happy'",
              "Break free from self-focused dating patterns that sabotage connection",
              "Apply the 3-step authenticity framework to every interaction",
              "Read signals of genuine interest vs. performance",
              "Build conversations that create real intimacy",
              "Develop a personal action plan for authentic dating",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">Curriculum</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">Course Modules</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {modules.map((mod, i) => (
              <div key={mod.title} className="border border-border/50 rounded-lg overflow-hidden">
                <div className="bg-card p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{mod.title}</h3>
                    <p className="text-sm text-muted-foreground">{mod.lessons.length} lessons</p>
                  </div>
                </div>
                <div className="px-6 pb-4">
                  <ul className="space-y-2">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson} className="flex items-center gap-3 text-sm text-muted-foreground py-1">
                        <Play className="h-3 w-3 text-primary/50" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enroll CTA */}
      <section id="enroll" className="section-padding bg-card border-t border-border/50">
        <div className="container text-center">
          <Award className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Start Your Journey Today</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
            One payment. Lifetime access. No subscriptions, no upsells — just the tools you need to date authentically.
          </p>
          <div className="bg-background border border-primary/30 rounded-lg p-8 max-w-sm mx-auto">
            <a href="https://sam-s-site-9e21.thinkific.com/courses/HTDAC" target="_blank" rel="noopener noreferrer" className="block">
              <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider">
                Enroll Now
              </Button>
            </a>
            <p className="text-xs text-muted-foreground mt-4">You'll be taken to the course platform to complete enrollment.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
