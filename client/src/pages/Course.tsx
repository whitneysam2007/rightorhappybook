import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Play,
  BookOpen,
  Users,
  ArrowRight,
  Check,
  X,
  Quote,
  Heart,
  Clock,
  Infinity as InfinityIcon,
} from "lucide-react";

const modules = [
  {
    title: "Welcome",
    outcome: "Find the hidden goal underneath \u201cI want love\u201d — and catch the signs of the world of right in your own dating.",
    lessons: ["Welcome", "Read the E-Book", "Right or Happy?"],
    leaveWith: "Your own signs, spotted. The full e-book, right there to read.",
  },
  {
    title: "Dating in the World of Right",
    outcome: "Take your story apart, question by question, and throw out the parts of your list that were never really about connection.",
    lessons: ["Dissecting My Story", "Dissecting My Story Tool", "Discovering What Really Matters", "Needs and Nope List"],
    leaveWith: "A short list of what is truly essential — and a decision about what you want to change.",
  },
  {
    title: "Entering the World of Happy",
    outcome: "Learn the three moves that open the other world: consider other people, be curious, be straightforward.",
    lessons: [
      "The World of Happy",
      "Improving My Dating State of Mind",
      "Pre-Date",
      "During the Date",
      "Dating Questions Guide",
      "Post Date",
      "Say What You Need to Say",
    ],
    leaveWith: "A pre-date mantra in your own words, three questions saved for your next date, and words you can actually say.",
  },
  {
    title: "Dating Tools",
    outcome: "Turn all of it into real dates with real people — and know who is worth asking out again.",
    lessons: ["Finding Someone to Date", "Finding Someone to Date Tool", "The First 3 Dates", "The First 3 Dates Tool"],
    leaveWith: "A plan for your first three dates and an invitation you can send.",
  },
  {
    title: "Wrap Up",
    outcome: "Leave with a plan, not a pep talk.",
    lessons: ["Conclusion — Your Action Plan"],
    leaveWith: "Your action plan, one choice, and one next step with a date on it.",
  },
];

const forYou = [
  "You're single and dating, and you're tired of performing.",
  "You keep choosing the same kind of person — or the same kind of story.",
  "You want a real relationship, not a win.",
  "You've read the book and want to do something with it.",
  "You've never read the book — the whole thing is included.",
];

const notForYou = [
  "You want tricks to get someone to like you. If you use this that way, you're still dating to be right.",
  "You want a coach on call. This is self-paced — you do the work yourself.",
  "You're looking for therapy. This is a course about dating, not a substitute for help when you need it.",
];

const included = [
  "19 lessons across 5 modules, self-paced",
  "10 short videos — 41.7 minutes in all",
  "The full e-book, How to Date Authentically, to read inside the course",
  "Interactive tools you use, not PDFs you file away: your story, your needs and nopes, your questions, your words, your dates",
  "A personal action plan at the end, with the How Will I Know check",
  "Lifetime access — come back any time",
];

const faqs = [
  {
    q: "How long do I have access?",
    a: "For as long as the course exists. One payment, lifetime access. Come back to a tool before a date, or redo the whole thing a year from now.",
  },
  {
    q: "How long does the course take?",
    a: "The videos add up to under 42 minutes. The tools take longer — the Story Tool is about half an hour on its own, and it's worth taking slow. Go at your pace. Your answers are saved on your own device, so you can stop in the middle and pick up where you left off.",
  },
  {
    q: "Do I need to buy the book first?",
    a: "No. The full e-book is inside the course, all 85 pages, free to read whenever you want. If you'd rather hold a paperback in your hands, it's on Amazon.",
  },
  {
    q: "I've already read the book. Is the course different?",
    a: "Yes. The book tells you the idea. The course makes you do something with it. You take your own story apart, build your own lists, write your own words, and plan your own dates. Reading about it and doing it are two different things.",
  },
  {
    q: "I'm new to dating. Is this for me?",
    a: "Yes. You don't need experience. You need honesty about what you've been doing and a willingness to try something different. The course starts there.",
  },
  {
    q: "Is this a subscription?",
    a: "No. One payment of $49.99. No monthly charge, no upsells.",
  },
  {
    q: "Will it work on my phone?",
    a: "That's what it's built for. Do a lesson on the couch. Do the post-date reflection on the way home from a date. Everything saves on your device.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "Let me level with you. I can't promise you'll meet someone. Nobody can. What I can promise is a different way of dating — one where you stop performing, start seeing people as people, and say what you actually mean. That's the part I can teach. The rest is up to you, and up to who you meet along the way.",
  },
  {
    q: "I already bought the course on Thinkific. Do I have to pay again?",
    a: "No. If you bought the course before, your lifetime access carries over. We're moving every existing student across to the new course — you won't be charged twice.",
  },
  {
    q: "Can I enroll right now?",
    a: "Almost. This is a preview of the new course — the payment step comes next. You can look through the course now, and enrollment opens as soon as checkout is ready.",
  },
];

function StartButton({ label = "Start the Course" }: { label?: string }) {
  return (
    <Link href="/course/learn">
      <Button
        size="lg"
        className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wider px-10"
      >
        {label} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  );
}

export default function Course() {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-6">The Complete Course</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
              Stop dating to be right. Start dating to be happy.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
              Nineteen lessons that help you see the story you&rsquo;re dating with, throw out the parts that don&rsquo;t serve
              you, and walk into your next date as yourself.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Play className="h-4 w-4 text-primary" />
                10 videos · 41.7 minutes
              </span>
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                19 lessons · 5 modules
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Self-paced
              </span>
              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                Full e-book included
              </span>
            </div>
            <div className="bg-card border border-primary/30 rounded-lg p-8 inline-block w-full sm:w-auto">
              <p className="text-3xl font-serif font-bold mb-1">$49.99</p>
              <p className="text-sm text-muted-foreground mb-6">Lifetime access. One payment. No subscription.</p>
              <StartButton />
              <p className="text-xs text-muted-foreground mt-4">Preview build — the payment step comes next.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The story — problem */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">Let me tell you a story</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8">The photo I showed my dad</h2>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
              <p>
                I dated a woman for two or three months. One night my dad asked to see a picture of her. I panicked. I
                scrolled and scrolled until I found the one where she looked beautiful — and I showed him that one. He
                approved. And I felt&hellip; good?
              </p>
              <p>Then I felt sick. Because the panic told the truth. I wasn&rsquo;t dating her. I was dating what she made me look like.</p>
              <p>Have you ever done that? Not the photo, exactly. But the version of it that&rsquo;s yours.</p>
              <p>
                Getting ready for a date like you&rsquo;re going on stage. Rehearsing what you&rsquo;ll say. Checking the
                boxes — looks, job, degree, the right story to tell your friends. Hoping they pick you, so you can prove
                something.
              </p>
              <p>
                That is dating in the world of right. And here is what it looks like when you&rsquo;re in it:
              </p>
            </div>
            <div className="mt-8 space-y-4">
              {[
                {
                  title: "Everything is about how it looks.",
                  body: "The date is a performance. You leave wondering how you did, not who they were.",
                },
                {
                  title: "There's a script, and everyone has to play their part.",
                  body: "You wrote yourself as the hero. They're auditioning for a role you already cast.",
                },
                {
                  title: "The very people you want to attract pull away.",
                  body: "They can feel it. It's about you, not them.",
                },
              ].map((s) => (
                <div key={s.title} className="border-l-2 border-primary pl-5 py-1">
                  <p className="font-semibold mb-1">{s.title}</p>
                  <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg leading-relaxed text-foreground/90">
              Sound familiar? I know. It was my life for years.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-foreground/90">
              And here is what it costs you. Dates that go nowhere. People you liked, who slipped away because they
              could feel the audition. Months — years — of the same story, told with different names in it. And the worst
              part? You can&rsquo;t fix it by trying harder at the same game. Trying harder <em>is</em> the game.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">There is another way to date</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8">Dating to be happy</h2>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
              <p>
                In the world of happy, you stop performing and start paying attention. You see the person across from you
                as a person — not a role, not a prize, not proof.
              </p>
              <p>
                And something strange happens. The real you comes forward. You listen better. You say what you mean. You
                enjoy the date. And the right people can finally see you.
              </p>
              <p>
                It is harder than the old way. I won&rsquo;t pretend it isn&rsquo;t. But it works better. And it feels better, too.
              </p>
              <p>
                Think about your last date for a second. Were you watching them — or watching yourself? In the world of
                happy, you&rsquo;re watching them. That&rsquo;s the whole shift.
              </p>
              <p className="font-semibold">What would change for you if you dated like that?</p>
            </div>
          </div>
        </div>
      </section>

      {/* The solution */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">The course</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8">A course you do, not a course you watch</h2>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
              <p>
                So I built a course that does something about it. Nineteen lessons, and every one of them asks you to do
                something small. Tap what you recognize. Write what you actually think. Pick what matters. Decide what
                you&rsquo;ll do next.
              </p>
              <p>
                You take your dating story apart, one question at a time. You build your list of what you need in a
                person — then you throw out the parts that were never really about connection. You pick three questions
                to ask on your next date. You write the words you&rsquo;ve been avoiding, in a way you could actually say
                them. You plan three real dates with a real person, and you write the invitation.
              </p>
              <p>
                And at the end, everything you&rsquo;ve done comes together in one plan. One choice. One next step, with a
                date on it. And a simple check — five signs from the last chapter of the book — so you&rsquo;ll know a great
                relationship when you find one.
              </p>
              <p>
                Your answers stay on your own device. The whole book is in there too, all 85 pages, to read whenever
                you want. No homework to turn in. No score. Just you, working on the thing that matters.
              </p>
              <p>
                And the tools aren&rsquo;t PDFs you print and lose. They&rsquo;re built into the course. You tap, you write, and
                what you write is still there the next time you open it — so the list you build in one lesson is the
                list you use in the next one, and the plan you make at the end is made of your own words.
              </p>
              <p>Here is how a lesson goes. It&rsquo;s simple:</p>
            </div>
            <div className="mt-6 space-y-4">
              {[
                {
                  title: "Watch a short video.",
                  body: "Ten of them in the whole course, none longer than ten minutes. I tell you the idea, usually with a story where I look bad.",
                },
                {
                  title: "Do the tool.",
                  body: "Tap, write, pick, decide. One small thing, right now, while it's fresh. Most tools take a few minutes. The story tool takes about half an hour — give it that.",
                },
                {
                  title: "Take it on your next date.",
                  body: "Three questions in your pocket. A mantra in your own words. An invitation you already wrote. Then come back and reflect on how it went.",
                },
              ].map((s, i) => (
                <div key={s.title} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <StartButton label="Start the Course — $49.99" />
            </div>
          </div>
        </div>
      </section>

      {/* What's inside — curriculum as transformation */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">What&rsquo;s inside</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">Nineteen lessons. One change.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mt-6 leading-relaxed">
              Each module moves you somewhere. Here is where each one takes you — and what you walk away with.
            </p>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {modules.map((mod, i) => (
              <div key={mod.title} className="border border-border/50 rounded-lg overflow-hidden">
                <div className="bg-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-sm">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        Module {i + 1} — {mod.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mt-1">{mod.outcome}</p>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <ul className="space-y-2 mb-4">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson} className="flex items-center gap-3 text-sm text-muted-foreground py-1">
                        <Play className="h-3 w-3 text-primary/50 flex-shrink-0" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm leading-relaxed border-t border-border/50 pt-4">
                    <span className="text-primary font-medium">You leave with: </span>
                    <span className="text-muted-foreground">{mod.leaveWith}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <StartButton label="Start the Course — $49.99" />
          </div>
        </div>
      </section>

      {/* Who it's for / isn't */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4 text-center">Is this for you?</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12 text-center">Who this is for</h2>
            <div className="space-y-3 mb-12">
              {forYou.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <h3 className="font-serif text-2xl font-bold mb-6">And who it isn&rsquo;t for</h3>
            <div className="space-y-3">
              {notForYou.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg leading-relaxed text-foreground/90">
              If you saw yourself in the first list, this was built for you.
            </p>
          </div>
        </div>
      </section>

      {/* About Sam + endorsements */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">Your guide</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8">I&rsquo;m Sam Whitney</h2>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
              <p>
                I wrote <em>How to Date Authentically</em> because I spent years dating to be right, and it kept failing
                me. The photo I showed my dad was only one night. The story behind it ran my whole dating life.
              </p>
              <p>
                I speak to young single adults about dating — I&rsquo;ve headlined the Utah YSA conference two years in a row
                and helped plan its dating activities, and I&rsquo;ve spoken to rooms of more than a thousand people. The
                question I hear most, over and over, is the same one I asked myself: why does this keep going wrong?
              </p>
              <p>
                This course is my answer. Not theory. The tools I built for myself, and the plan I wish someone had
                handed me years ago.
              </p>
            </div>
            <div className="mt-12 space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium">What they&rsquo;re saying about the book behind the course</p>
              {[
                {
                  quote:
                    "I've been out of the traditional 'dating' game for a long, long time but I found the principles that underly, support, and drive meaningful relationships all throughout this tremendous book. Sam Whitney is extraordinary, and his insights into this are both incredibly timely and beautifully on target. Just wonderful!",
                  name: "Stephen M.R. Covey",
                  title: "NYT & WSJ #1 Bestselling Author, Speed of Trust",
                },
                {
                  quote:
                    "Sam Whitney's book is a must read not just for dating but for life. He reframes what is often a painful exercise in mutual manipulation into a lifetime project of growth and true intimacy. Thank you!",
                  name: "Joseph Grenny",
                  title: "Chairman of the Board at The Other Side Academy and The Other Side Village",
                },
              ].map((e) => (
                <div key={e.name} className="border border-border/50 rounded-lg p-8">
                  <Quote className="h-6 w-6 text-primary mb-4" />
                  <p className="text-foreground/90 leading-relaxed italic mb-6">&ldquo;{e.quote}&rdquo;</p>
                  <p className="font-semibold text-sm">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Offer + price */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4 text-center">The offer</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 text-center">Here&rsquo;s everything you get</h2>
            <div className="space-y-3 mb-10">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="bg-background border border-primary/30 rounded-lg p-8 text-center">
              <p className="text-4xl font-serif font-bold mb-2">$49.99</p>
              <p className="text-sm text-muted-foreground mb-6">One payment. Lifetime access. No subscription.</p>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
                That&rsquo;s less than an hour with a dating coach — most charge $80 or more an hour. Less than a few bad
                dates. And it&rsquo;s yours to come back to, for as long as you need it.
              </p>
              <StartButton label="Start the Course — $49.99" />
              <p className="text-xs text-muted-foreground mt-4">Preview build — the payment step comes next.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Self-paced — start tonight, finish when you&rsquo;re ready
              </span>
              <span className="flex items-center gap-2">
                <InfinityIcon className="h-4 w-4 text-primary" />
                Lifetime access
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4 text-center">Questions</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12 text-center">Before you decide</h2>
            <div className="space-y-8">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-semibold text-lg mb-2">{f.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-card border-t border-border/50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Give it a try. Who knows?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
              Your next date could be the first one where you&rsquo;re actually yourself. That&rsquo;s worth $49.99.
            </p>
            <StartButton label="Start the Course — $49.99" />
            <p className="text-xs text-muted-foreground mt-4">Preview build — the payment step comes next.</p>
            <p className="mt-10 text-muted-foreground">— Sam</p>
          </div>
        </div>
      </section>
    </div>
  );
}
