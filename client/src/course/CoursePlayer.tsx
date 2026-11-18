// Course player: lesson list + one lesson at a time, one idea per screen.
// LEARNING and APPLYING are labelled on every lesson. Answers save on-device.
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { ArrowRight, BookOpen, Check, ChevronDown, ChevronRight, Clock, Play } from "lucide-react";
import { LESSONS, MODULES, PDFS, lessonById } from "./data";
import { useCourseState } from "./store";
import { supabase } from "./supabase";
import { ApplyBlock, Chip, ChipRow, LessonNav, ModeBadge, VideoEmbed } from "./ui";
import {
  ActionPlan,
  GridTool,
  ListeningTool,
  MantraBuilder,
  NeedsNopesTool,
  PlannerTool,
  QuestionDeck,
  ReflectionTool,
  SayItTool,
  SignsTool,
  StoryTool,
  WhyHereTool,
} from "./tools";

function LearnText({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90">{children}</div>;
}

// --- small local pickers that don't need to persist ---
function StoryChips() {
  const baseOpts = [
    "I'll meet them while traveling the world",
    "It'll play out like a movie I love",
    "They'll be exactly the person I pictured",
    "It has to happen by a certain age",
    "I'll just know — and so will everyone else",
    "They'll have the same background as me",
    "It has to be love at first sight",
    "My friends and family will all approve",
    "I'll meet them at exactly the right time",
  ];
  const [custom, setCustom] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [picked, setPicked] = useState<number[]>([]);
  const opts = [...baseOpts, ...custom];
  const addOwn = () => {
    const text = draft.trim();
    if (!text) return;
    setCustom([...custom, text]);
    setDraft("");
  };
  return (
    <div className="space-y-3">
      <p>Before you watch — which of these sounds like your story?</p>
      <ChipRow>
        {opts.map((o, i) => (
          <Chip key={o} multi on={picked.includes(i)} onClick={() => setPicked(picked.includes(i) ? picked.filter((x) => x !== i) : [...picked, i])}>
            {o}
          </Chip>
        ))}
      </ChipRow>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addOwn();
            }
          }}
          placeholder="Add your own…"
          aria-label="Add your own story"
          className="min-w-0 flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm"
        />
        <button
          type="button"
          onClick={addOwn}
          disabled={!draft.trim()}
          className="shrink-0 rounded-full border border-primary/60 px-4 py-2.5 text-sm font-semibold text-primary disabled:opacity-40"
        >
          Add it
        </button>
      </div>
      {picked.length > 0 && <p className="text-sm text-muted-foreground">Hold that thought while you watch Jordan and Kylie. Then the tool in the next lesson is where you take your own story apart.</p>}
    </div>
  );
}

function PathCheck() {
  const [pick, setPick] = useState("");
  const [note, setNote] = useState("");
  return (
    <div className="space-y-3">
      <p>Let&rsquo;s pause here. Last week — which path were you on?</p>
      <ChipRow>
        {["The world of right", "The world of happy", "Honestly, a bit of both"].map((o) => (
          <Chip key={o} on={pick === o} onClick={() => setPick(o)}>{o}</Chip>
        ))}
      </ChipRow>
      {pick && (
        <textarea
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="And what told you so?"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"
        />
      )}
    </div>
  );
}

export default function CoursePlayer() {
  const params = useParams<{ lessonId?: string }>();
  const [, setLocation] = useLocation();
  const { state, update, toggleIn, markComplete } = useCourseState();
  const logOut = async () => {
    await supabase.auth.signOut();
    setLocation("/course/login");
  };
  const lessonId = params.lessonId ? parseInt(params.lessonId, 10) : null;
  const lesson = lessonId ? LESSONS.find((l) => l.id === lessonId) : null;
  const [finished, setFinished] = useState(false);
  const [showContent, setShowContent] = useState(false);
  useEffect(() => setFinished(false), [lessonId]);

  // ---------- Lesson list ----------
  if (!lesson) {
    const done = state.completed.length;
    const nextUnfinished = LESSONS.find((l) => !state.completed.includes(l.id));
    const resumeId = nextUnfinished ? nextUnfinished.id : 1;
    const resumeLabel = done === 0 ? "Get Started" : done === 19 ? "Review the course" : "Pick up where I left off";
    return (
      <div className="container py-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4">The Course</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-4">How to Date Authentically</h1>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ten short videos, five tools, and one action plan. Each lesson has two parts: learning — what Sam teaches — and applying — doing something with it. Your answers stay on your device.
          </p>
          <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Play className="h-4 w-4 text-primary" /> 10 videos · 41.7 minutes</span>
            <span className="inline-flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> 19 lessons · 5 modules</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Self-paced · lifetime access</span>
          </div>
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Your progress</span>
              <span>{done} of 19 done</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-primary transition-all" style={{ width: `${(done / 19) * 100}%` }} />
            </div>
          </div>
          <div className="mb-8">
            <Link href={`/course/learn/${resumeId}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              {resumeLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mb-8">
            <button
              type="button"
              onClick={() => setShowContent((v) => !v)}
              aria-expanded={showContent}
              className="flex w-full items-center justify-between rounded-lg border border-[oklch(0.4_0_0)] bg-[oklch(0.2_0_0)] px-4 py-3.5 text-sm font-semibold shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)]"
            >
              View course content
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showContent ? "rotate-180" : ""}`} />
            </button>
          </div>
          {showContent && MODULES.map((mod, mi) => (
            <div key={mod.title} className="mb-8">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-primary">
                Module {mi + 1} — {mod.title}
              </h2>
              <div className="space-y-2">
                {mod.lessons.map((id) => {
                  const l = lessonById(id);
                  const isDone = state.completed.includes(id);
                  return (
                    <Link key={id} href={`/course/learn/${id}`} className="flex items-center gap-3 rounded-lg border border-[oklch(0.4_0_0)] bg-[oklch(0.2_0_0)] p-4 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)] hover:border-[oklch(0.55_0_0)]">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isDone ? "bg-primary text-primary-foreground" : "bg-primary/15 text-primary"}`}>
                        {isDone ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{id}</span>}
                      </span>
                      <span className="flex-1">
                        <span className="block font-medium">{l.title}</span>
                        <span className="text-xs text-muted-foreground">{l.mode}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            Your answers save on this device only.
          </p>
          <button type="button" onClick={logOut} className="mt-4 text-xs text-muted-foreground underline hover:text-foreground">
            Log out
          </button>
        </div>
      </div>
    );
  }

  // ---------- Finish screen (after "Finish the course" on Lesson 19) ----------
  if (finished && lesson?.id === 19) {
    return (
      <div className="container py-8">
        <div className="relative mx-auto max-w-2xl">
          <FinishScreen />
        </div>
      </div>
    );
  }

  // ---------- One lesson ----------
  const mod = MODULES[lesson.module - 1];
  return (
    <div className="container py-8">
      <div className="relative mx-auto max-w-2xl">
        <Link href="/course/learn" className="text-sm text-muted-foreground hover:text-foreground">← All lessons</Link>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Module {lesson.module} — {mod.title}
        </p>
        <h1 className="mt-1 font-serif text-3xl font-bold leading-tight md:text-4xl">{lesson.title}</h1>
        <div className="mt-3 flex items-center gap-3">
          <ModeBadge mode={lesson.mode} />
        </div>
        {/* Gold's one thin accent on the lesson itself: a hairline rule under the header. */}
        <div aria-hidden className="mt-5 h-px w-full bg-primary/50" />

        <div className="mt-8 rounded-2xl border border-[oklch(0.4_0_0)] bg-[oklch(0.2_0_0)] p-5 shadow-[0_28px_70px_-18px_rgba(0,0,0,0.9)] [&>*:first-child]:mt-0 sm:p-7">
          <LessonBody id={lesson.id} state={state} update={update} toggleIn={toggleIn} />
        </div>

        <LessonNav
          lessonId={lesson.id}
          onDone={() => {
            markComplete(lesson.id);
            if (lesson.id === 19) setFinished(true);
          }}
          isDone={state.completed.includes(lesson.id)}
        />
      </div>
    </div>
  );
}

// --- Confetti: dependency-free falling gold pieces for the finish screen ---
function Confetti() {
  const pieces = Array.from({ length: 48 }, (_, i) => ({
    left: (i * 37 + 11) % 100,
    delay: ((i * 7) % 30) / 10,
    duration: 3 + ((i * 13) % 20) / 10,
    size: 6 + ((i * 5) % 8),
    gold: i % 4 !== 3,
    rot: (i * 47) % 360,
  }));
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <style>{`@keyframes confetti-fall { 0% { transform: translateY(-4vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(108vh) rotate(720deg); opacity: 0.6; } }`}</style>
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-4%",
            width: p.size,
            height: p.size * 0.6,
            background: p.gold ? "#e6bc4b" : "#d4d4d4",
            borderRadius: 1,
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// --- Finish screen: shown after "Finish the course" on Lesson 19 ---
function FinishScreen() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const courseUrl = "https://rightorhappybook.com/course";
  const copyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(courseUrl);
        setCopyState("copied");
        return;
      }
      throw new Error("no clipboard");
    } catch {
      setCopyState("manual");
    }
  };
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[oklch(0.4_0_0)] bg-[oklch(0.2_0_0)] p-6 text-center shadow-[0_28px_70px_-18px_rgba(0,0,0,0.9)] sm:p-10">
      <Confetti />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">You finished the course</p>
        <p className="mt-5 font-serif text-2xl font-bold leading-snug md:text-3xl">
          Congratulations, you&rsquo;ve now taken the first steps on your new dating journey. I wish you all the best, and I know that as long as you strive to live to be happy, great opportunities await you.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">— Sam</p>
        <div className="mx-auto mt-10 max-w-sm space-y-3">
          <p className="text-sm font-semibold">Know someone who needs this?</p>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {copyState === "copied" ? (
              <>
                <Check className="h-4 w-4" /> Copied!
              </>
            ) : (
              "Copy course link"
            )}
          </button>
          {copyState === "manual" && (
            <p className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm break-all">{courseUrl}</p>
          )}
          <a
            href="https://amzn.to/4flIlj8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-primary/60"
          >
            Share the book
          </a>
          <p className="text-xs text-muted-foreground">Send them the book on Amazon.</p>
        </div>
        <Link href="/course/learn" className="mt-10 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← Back to all lessons
        </Link>
      </div>
    </div>
  );
}

function LessonBody({ id, state, update, toggleIn }: {
  id: number;
  state: ReturnType<typeof useCourseState>["state"];
  update: ReturnType<typeof useCourseState>["update"];
  toggleIn: ReturnType<typeof useCourseState>["toggleIn"];
}) {
  const props = { state, update, toggleIn };
  switch (id) {
    case 1:
      return (
        <>
          <VideoEmbed videoKey="welcome" title="Welcome to How to Date Authentically" />
          <div className="mt-6">
            <LearnText>
              <p>Here&rsquo;s the thing. A lot of good, eligible people say they want lasting love — and then they stay single, year after year. They resist the dating process. They resent it. And they don&rsquo;t know why.</p>
              <p>Underneath the goal they say out loud, there&rsquo;s usually a hidden goal running the show. A deeper psychology that gets in their own way. This course is about two things: finding the invisible barriers, and getting the tools to move past them — so you can see people clearly, and actually enjoy dating.</p>
              <p>Even if you&rsquo;ve read the book, there&rsquo;s new ground here.</p>
            </LearnText>
          </div>
          <ApplyBlock label="Applying — why are you here?">
            <WhyHereTool {...props} />
          </ApplyBlock>
        </>
      );
    case 2:
      return (
        <>
          <LearnText>
            <p>This is the whole book. You don&rsquo;t have to read it cover to cover — use it like a library. Each chapter lines up with a lesson, so when a lesson points you here, you&rsquo;ll know where to look.</p>
          </LearnText>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={PDFS.ebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              <BookOpen className="h-4 w-4" /> Read the e-book
            </a>
          </div>
        </>
      );
    case 3:
      return (
        <>
          <VideoEmbed videoKey="rightOrHappy" title="Right or Happy?" />
          <div className="mt-6">
            <LearnText>
              <p>There are two worlds you can date in. In the world of right, you&rsquo;re dating to prove something — to yourself, to other people. You have a story already written, and you&rsquo;re looking for someone to play their part in it.</p>
              <p>Let me tell you a story. I was dating a woman for a couple of months, and Christmas was coming. I sat there scrolling through photos of her, panicking about which one to show my dad — looking for the one where she looked beautiful enough that he&rsquo;d approve. And then it hit me: that panic told me everything about what was really driving me.</p>
              <p>Why do we live there? Two things. Culture writes the story for us before we ever start — family, movies, what everyone expects. And fear. We&rsquo;re terrified of getting it wrong, of settling, of ending up with the wrong person — so we try to control the outcome.</p>
              <p>It shows up three ways: you get fixated on the outside stuff, you tell a one-sided story and get anxious when reality doesn&rsquo;t follow it, and you push away the very people you want to attract.</p>
              <p>The world of happy is different. You&rsquo;re genuinely interested in the other person, for their sake. You see them as a person. It&rsquo;s harder to get into — and it&rsquo;s not a trick. If you use it to manipulate someone, you&rsquo;re still in the world of right.</p>
            </LearnText>
          </div>
          <ApplyBlock label="Applying — signs of the world of right">
            <SignsTool {...props} />
          </ApplyBlock>
        </>
      );
    case 4:
      return (
        <>
          <VideoEmbed videoKey="story" title="Dissecting My Story" />
          <div className="mt-6">
            <LearnText>
              <p>In the world of right, you show up with a story. How it should go. Who you are. Who they should be. And you arrange your whole dating life to match it. You wrote yourself as the hero — and it&rsquo;s the story you think other people want to hear, so they&rsquo;ll tell you you chose well.</p>
              <p>Jordan was sure he&rsquo;d meet his wife while traveling the world. He could not meet her online — that wasn&rsquo;t in the story. Then he questioned it, opened a dating app, and the first woman he swiped on became his wife. Kylie had her love life planned out like a movie — and then she met Ryan at the school where they both worked, and panicked when she found out he&rsquo;d been married before. What would she tell people? She questioned the fairy tale, asked him hard questions, listened — and learned to trust him. They married. They have a baby.</p>
              <p>Here&rsquo;s what both of them found: when you question the story, you find a way forward. The obstacle moves.</p>
            </LearnText>
          </div>
          <ApplyBlock label="Applying — before the tool">
            <StoryChips />
          </ApplyBlock>
        </>
      );
    case 5:
      return (
        <>
          <ApplyBlock label="Applying — the story tool">
            <StoryTool {...props} />
          </ApplyBlock>
        </>
      );
    case 6:
      return (
        <>
          <VideoEmbed videoKey="needsNopes" title="Discovering What Really Matters" />
          <div className="mt-6">
            <LearnText>
              <p>The world you date in shapes your lists. In the world of right, the list is about the outside: extra attractiveness so other people envy you, a cool job, a degree — and deal-breakers that are really just tastes. Won&rsquo;t date someone who likes video games. Or rom-coms. Or hasn&rsquo;t been to a certain country.</p>
              <p>In the world of happy, the list is about connection. Fun. Easy to talk to. Hard-working. Admirable. Someone you trust. And the real deal-breakers are simple: someone you can&rsquo;t trust, don&rsquo;t feel safe with, can&rsquo;t talk to.</p>
              <p>And listen — attraction still matters in the world of happy. The difference isn&rsquo;t hot versus not-hot. It&rsquo;s whether attraction is the most important thing, or one good quality among a balanced mix.</p>
            </LearnText>
          </div>
          <ApplyBlock label="Applying — your turn">
            <p className="text-[15px] leading-relaxed">Get your lists out — everything. Needs, nopes, pet peeves, the whole thing. Then go through them and ask which ones are really about a great relationship, and which ones are about your story. The next lesson is where you do it.</p>
            <Link href="/course/learn/7" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Build my lists <ChevronRight className="h-4 w-4" />
            </Link>
          </ApplyBlock>
        </>
      );
    case 7:
      return (
        <>
          <ApplyBlock label="Applying — needs and nope list">
            <NeedsNopesTool {...props} />
          </ApplyBlock>
        </>
      );
    case 8:
      return (
        <>
          <VideoEmbed videoKey="worldOfHappy" title="The World of Happy" />
          <div className="mt-6">
            <LearnText>
              <p>Here&rsquo;s the thing about the world of right: it&rsquo;s not just an obstacle on the path. It <em>is</em> the wrong path. As long as you see people as a way to get what you want — and force reality to bend around your story — you won&rsquo;t find lasting connection. You might connect. But it&rsquo;ll be on shaky ground.</p>
              <p>Entering the world of happy puts you on a new trajectory. Dating stops being an anxious scramble to get someone to join your story, and starts being an adventure — finding out who another person actually is.</p>
              <p>Two things to know. It won&rsquo;t magically make someone appear. It draws better people in, and it gets you ready to connect when they show up. And it&rsquo;s not a trick to get people to like you. If that&rsquo;s why you&rsquo;re doing it, you&rsquo;re still in the world of right.</p>
              <p>You might not even notice when you get there. The changes show up in your outcomes first.</p>
            </LearnText>
          </div>
          <ApplyBlock label="Applying — pause and check">
            <PathCheck />
          </ApplyBlock>
        </>
      );
    case 9:
      return (
        <>
          <VideoEmbed videoKey="stateOfMind" title="Improving My Dating State of Mind" />
          <div className="mt-6">
            <LearnText>
              <p>People respond to how you see them more than to what you do. They can feel your state of mind. In the world of right, there&rsquo;s a voice running the whole time — do they like me? How do I get them to like me? What should I say? — and it blocks the real you.</p>
              <p>So here&rsquo;s the practice. Three parts, and they happen before, during, and after a date. Before: a mantra, to get your head right and quiet that voice. During: curiosity and listening — the people you love most are usually the people who enjoy listening to you. After: reflection, so you actually learn from each date.</p>
              <p>Go through each piece with your next real date in mind.</p>
            </LearnText>
          </div>
          <div className="mt-6 space-y-2">
            {[
              { id: 10, t: "Before — write your pre-date mantra" },
              { id: 11, t: "During — be curious, listen" },
              { id: 12, t: "During — pick your questions" },
              { id: 13, t: "After — reflect on the date" },
            ].map((x) => (
              <Link key={x.id} href={`/course/learn/${x.id}`} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm hover:border-primary/60">
                <span>{x.t}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </>
      );
    case 10:
      return (
        <>
          <LearnText>
            <p>Before a date, run step one. You are a person, and so are they. You have a lot in common, and a lot to talk about. That opens you up to them — and it quiets the voice in your head, and the insecurities that come with it.</p>
            <p>Then write a mantra. A short statement you say to yourself before the date, to get in the right headspace and set yourself up to connect.</p>
          </LearnText>
          <ApplyBlock label="Applying — write your mantra">
            <MantraBuilder {...props} />
          </ApplyBlock>
        </>
      );
    case 11:
      return (
        <>
          <LearnText>
            <p>The best thing you can do on a date is be interested in the other person. It&rsquo;s attractive. It&rsquo;s caring. And it makes them feel heard.</p>
            <p>Here&rsquo;s what that looks like in practice:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Be curious — ask about their life, their interests, what they&rsquo;ve done.</li>
              <li>Show interest — nod, make eye contact, let them see you&rsquo;re with them.</li>
              <li>Don&rsquo;t interrupt. Let them finish.</li>
              <li>Put the phone away.</li>
              <li>Repeat back what they said, so they know you heard them.</li>
              <li>Show empathy — try to understand how they see it, and how it feels.</li>
              <li>Be open-minded. Don&rsquo;t judge.</li>
            </ul>
            <p>Brenda Ueland said it better than I could: listening is how you get a person to open up.</p>
          </LearnText>
          <ApplyBlock label="Applying — what will you work on?">
            <ListeningTool {...props} />
          </ApplyBlock>
        </>
      );
    case 12:
      return (
        <>
          <LearnText>
            <p>Questions are how curiosity sounds out loud. You can use one or two to get a conversation going — or make a whole date of asking all twenty. The point isn&rsquo;t the questions. It&rsquo;s the listening. That&rsquo;s how you learn who someone is.</p>
          </LearnText>
          <ApplyBlock label="Applying — pick 3 questions">
            <QuestionDeck {...props} />
          </ApplyBlock>
        </>
      );
    case 13:
      return (
        <>
          <LearnText>
            <p>Think back to your last date. What do you remember? Take a few minutes with it now — that&rsquo;s the practice. The more you do it here, the more natural it feels after your next date.</p>
            <p>After each date, take a few minutes and think it through. What did you like? What didn&rsquo;t you like? What do you remember about them? How do you feel — and do you want to go out again? Decide on what actually happened, not on your story.</p>
          </LearnText>
          <ApplyBlock label="Applying — after the date">
            <ReflectionTool {...props} />
          </ApplyBlock>
        </>
      );
    case 14:
      return (
        <>
          <VideoEmbed videoKey="sayIt" title="Say What You Need to Say" />
          <div className="mt-6">
            <LearnText>
              <p>In the world of happy, you have to be straightforward and honest. I know it sounds scary. But it saves time, and it moves things forward.</p>
              <p>Most of the fear comes from your story — what if they reject me? What if they don&rsquo;t like me? Here&rsquo;s the thing: in the world of happy, a &ldquo;no&rdquo; means nothing about you. It means they&rsquo;re not in a place to connect.</p>
              <p>I once went on a date with someone who talked the whole time and asked me nothing. My roommate told me not to stop being curious, straightforward, and open. &ldquo;You&rsquo;re going to find someone who will respond to that.&rdquo; He was right.</p>
            </LearnText>
          </div>
          <ApplyBlock label="Applying — say what you need to say">
            <SayItTool {...props} />
          </ApplyBlock>
        </>
      );
    case 15:
      return (
        <>
          <VideoEmbed videoKey="findingSomeone" title="Finding Someone to Date" />
          <div className="mt-6">
            <LearnText>
              <p>Now that what you&rsquo;re looking for has changed, the search changes too. Here&rsquo;s the tool: list up to five people you might be interested in dating right now — people you find attractive, or intriguing — and look at each one through six qualities.</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li><strong>Admiration</strong> — warm, mutual respect. Something about them that inspires you.</li>
                <li><strong>Common values</strong> — the things that matter to you, that they share.</li>
                <li><strong>Trust</strong> — you feel safe with them. You can talk to them.</li>
                <li><strong>Fun</strong> — someone you&rsquo;d actually enjoy being with.</li>
                <li><strong>Work ethic</strong> — do they put work into their relationships? Do they keep their commitments?</li>
                <li><strong>Attraction</strong> — still important, even in the world of happy. Just not the whole list.</li>
              </ul>
              <p>Then count the checks. The two people with the most are the ones to ask out — or at least spend some time with this week.</p>
              <p>And look for potential, not perfection. Perfection is finished, ready, exactly the way you want it. Potential is the capacity to become something different.</p>
            </LearnText>
          </div>
          <ApplyBlock label="Applying — rate real people">
            <GridTool {...props} />
          </ApplyBlock>
        </>
      );
    case 16:
      return (
        <>
          <LearnText>
            <p>This is the same grid from the last lesson — your answers are already here. No need to print anything. It lives right here, and you can come back to it whenever you want.</p>
          </LearnText>
          <ApplyBlock label="Applying — the grid">
            <GridTool {...props} />
          </ApplyBlock>
        </>
      );
    case 17:
      return (
        <>
          <VideoEmbed videoKey="threeDates" title="The First 3 Dates" />
          <div className="mt-6">
            <LearnText>
              <p>Dates in the world of happy are planned differently. Being thoughtful about the first three dates — on purpose — lets you open up, connect, and set the tone for the whole relationship.</p>
              <p>And one challenge, especially if you&rsquo;re a woman watching this: you don&rsquo;t have to ask guys out. But I challenge you to try — and to ask yourself whether <em>not</em> asking is part of your story, or something that really matters. A lot of guys would love to be asked out. I won&rsquo;t push much harder than that. I just challenge you.</p>
            </LearnText>
          </div>
          <Link href="/course/learn/18" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Plan my three dates <ChevronRight className="h-4 w-4" />
          </Link>
        </>
      );
    case 18:
      return (
        <>
          <LearnText>
            <p>Go through each date methodically. Read it, re-read it, and let it sink in. Date one is about getting to know them. Date two goes a little deeper. Date three is where you see if you&rsquo;re a fit.</p>
          </LearnText>
          <ApplyBlock label="Applying — plan the dates">
            <PlannerTool {...props} />
          </ApplyBlock>
        </>
      );
    case 19:
      return (
        <>
          <VideoEmbed videoKey="wrapUp" title="Conclusion" />
          <div className="mt-6">
            <LearnText>
              <p>So here we are. We covered the world of right, the world of happy, the stories we tell, how the world of right gets in the way, and how to make the move.</p>
              <p>Here&rsquo;s the sobering part: you might have found out that you&rsquo;re involved in the problems you don&rsquo;t like. That you&rsquo;ve been getting in your own way. And here&rsquo;s the hopeful part: you&rsquo;re the one who can change it. You have your hand on the lever.</p>
              <p>So it&rsquo;s a choice. Live in the world of right — blame, resentment, forcing your story into existence. Or live in the world of happy — genuinely interested in other people, dating as a fun adventure of finding out who someone is. Date better, so you can marry better, so you can be happier.</p>
            </LearnText>
          </div>
          <ApplyBlock label="Applying — your action plan">
            <ActionPlan {...props} />
          </ApplyBlock>
        </>
      );
    default:
      return null;
  }
}
