import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Play, BookOpen, Users, Award, ArrowRight } from "lucide-react";

const modules = [
  {
    title: "Welcome",
    lessons: ["Welcome", "Read the E-Book", "Right or Happy?"],
  },
  {
    title: "Dating in the World of Right",
    lessons: ["Dissecting My Story", "Dissecting My Story Tool", "Discovering What Really Matters", "Needs and Nope List"],
  },
  {
    title: "Entering the World of Happy",
    lessons: [
      "The World of Happy",
      "Improving My Dating State of Mind",
      "Pre-Date",
      "During the Date",
      "Dating Questions Guide",
      "Post Date",
      "Say What You Need to Say",
    ],
  },
  {
    title: "Dating Tools",
    lessons: ["Finding Someone to Date", "Finding Someone to Date Tool", "The First 3 Dates", "The First 3 Dates Tool"],
  },
  {
    title: "Wrap Up",
    lessons: ["Conclusion — Your Action Plan"],
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
              Go deeper than the book. Ten short videos, five tools you actually use, and an action plan at the end — built around the way you really date, not a checklist.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Play className="h-4 w-4 text-primary" />
                <span>10 videos · 41.7 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>19 lessons · 5 modules</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>Self-paced</span>
              </div>
            </div>
            <div className="bg-card border border-primary/30 rounded-lg p-8 inline-block">
              <p className="text-3xl font-serif font-bold mb-1">$49.99</p>
              <p className="text-sm text-muted-foreground mb-6">Lifetime access. One payment. No subscription.</p>
              <Link href="/course/learn">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider px-10">
                  Start the Course <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-4">Preview build — the payment step comes next.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">Outcomes</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">What You&rsquo;ll Learn</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              "Catch the signs that you're dating in the World of Right — and see what to do about them",
              "Take your own dating story apart, question by question, and name what you want to change",
              "Build a needs and nopes list that actually matters, and throw out the rest",
              "Listen with curiosity, and ask questions that get to who someone really is",
              "Say what you need to say — plainly, kindly, and in your own words",
              "Plan real dates, ask real people out, and leave with a personal action plan",
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
            One payment of $49.99. Lifetime access. No subscriptions, no upsells — just the tools you need to date authentically.
          </p>
          <div className="bg-background border border-primary/30 rounded-lg p-8 max-w-sm mx-auto">
            <Link href="/course/learn" className="block">
              <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider">
                Start the Course
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-4">Preview build — the payment step comes next.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
