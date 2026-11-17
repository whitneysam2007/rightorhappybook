// The clickable tools. Copy follows VOICE_RUBRIC.md — Sam's voice, plain
// and direct. No system talk, no slogans.
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Download, Mail, Plus } from "lucide-react";
import {
  DATE_PLANS,
  DECK_QUESTIONS,
  GRID_QUALITIES,
  HOW_WILL_I_KNOW,
  LISTENING_TIPS,
  LISTEN_SELF_CHECK,
  NEEDS_POOL,
  NOPES_POOL,
  PDFS,
  REFLECTION_PROMPTS,
  SAM_MANTRA,
  SAY_IT_SITUATIONS,
  SIGNS_OF_RIGHT,
  STORY_TOOL,
  WHY_HERE,
} from "./data";
import { buildActionPlanText, essentials, gridTopTwo, type CourseState, type Reflection } from "./store";
import { Chip, ChipRow, SavedNote } from "./ui";

type Props = {
  state: CourseState;
  update: (p: Partial<CourseState>) => void;
  toggleIn: (field: "signs" | "know" | "questions" | "listenFocus", v: number, max?: number) => void;
};

// ---------- Lesson 1: why I'm here ----------
export function WhyHereTool({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <p>Before we start — why are you here? Tap the ones that sound like you.</p>
      <ChipRow>
        {WHY_HERE.map((w, i) => (
          <Chip key={w} on={state.whyHere.includes(w)} onClick={() => update({ whyHere: state.whyHere.includes(w) ? state.whyHere.filter((x) => x !== w) : [...state.whyHere, w] })}>
            {w}
          </Chip>
        ))}
      </ChipRow>
      <textarea
        rows={2}
        value={state.whyHereNote}
        onChange={(e) => update({ whyHereNote: e.target.value })}
        placeholder="Or say it in your own words…"
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"
      />
      <SavedNote />
    </div>
  );
}

// ---------- Lesson 3: Signs of the World of Right ----------
export function SignsTool({ state, toggleIn }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">When you date in the world of right, what do you catch yourself doing? Tap the ones you recognize.</p>
      <ChipRow>
        {SIGNS_OF_RIGHT.map((s, i) => (
          <Chip key={s} on={state.signs.includes(i)} onClick={() => toggleIn("signs", i)}>
            {s}
          </Chip>
        ))}
      </ChipRow>
      <div className="rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm leading-relaxed">
        {state.signs.length === 0
          ? "Tap the ones that sound like you. This is just for you."
          : "Okay. Now you can see it. The next few lessons are where we start to take this apart — first your story, then your lists."}
      </div>
      <p className="text-sm text-muted-foreground">Sound familiar? Those are the three symptoms: the story, the outside stuff, and pushing people away.</p>
    </div>
  );
}

// ---------- Lesson 5: Story Tool — all 14 questions in order ----------
export function StoryTool({ state, update }: Props) {
  const flat = useMemo(() => STORY_TOOL.flatMap((s) => s.questions.map((q) => ({ ...q, section: s.label }))), []);
  const [step, setStep] = useState(0);
  const q = flat[step];
  const total = flat.length;
  const sectionIdx = STORY_TOOL.findIndex((s) => s.label === q.section);
  const isSplit = q.key === "q11" || q.key === "q12";
  const val = state.story[q.key] || "";
  const valB = state.story[`${q.key}b`] || "";

  return (
    <div className="space-y-4">
      <p>This tool has 14 questions, and they go in order — each one builds on the last. Give yourself about half an hour, and don&rsquo;t rush through it.</p>
      <div className="flex gap-1.5" aria-label={`Question ${step + 1} of ${total}`}>
        {flat.map((_, i) => (
          <button key={i} type="button" onClick={() => setStep(i)} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} aria-label={`Go to question ${i + 1}`} />
        ))}
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
        {q.section} · Question {step + 1} of {total}
      </p>
      <h3 className="text-xl font-semibold leading-snug">{q.text}</h3>
      {q.hint && <p className="text-sm text-muted-foreground">{q.hint}</p>}
      {isSplit ? (
        <div className="space-y-3">
          <textarea
            rows={3}
            value={val}
            onChange={(e) => update({ story: { ...state.story, [q.key]: e.target.value } })}
            placeholder={q.key === "q11" ? "The parts that seem realistic…" : "The parts that feel vital — the ones I want to keep…"}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"
          />
          <textarea
            rows={3}
            value={valB}
            onChange={(e) => update({ story: { ...state.story, [`${q.key}b`]: e.target.value } })}
            placeholder={q.key === "q11" ? "The parts that seem more fantastic…" : "The parts I can let go of…"}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"
          />
        </div>
      ) : (
        <textarea
          rows={4}
          value={val}
          onChange={(e) => update({ story: { ...state.story, [q.key]: e.target.value } })}
          placeholder="Write it in your own words…"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"
        />
      )}
      {step === total - 1 && (
        <div className="rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm leading-relaxed">
          The last question is the one that matters most. Your answer goes straight into your action plan at the end of the course.
        </div>
      )}
      <div className="flex justify-between gap-3 pt-2">
        <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded-full border border-border px-5 py-2.5 text-sm disabled:opacity-40">
          Back
        </button>
        {step < total - 1 ? (
          <button type="button" onClick={() => setStep(step + 1)} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Next question
          </button>
        ) : (
          <Link href="/course/learn/6" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Done — next lesson <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      <p className="text-xs text-muted-foreground">Section {sectionIdx + 1} of 3 · {STORY_TOOL.map((s) => s.label).join(" → ")}</p>
      <a href={PDFS.storyTool} download className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
        <Download className="h-4 w-4" /> Download the Story Tool as a PDF
      </a>
      <SavedNote />
    </div>
  );
}

// ---------- Lesson 7: Needs and Nopes — build, eliminate, select ----------
export function NeedsNopesTool({ state, update }: Props) {
  const [step, setStep] = useState(1);
  const [ownNeed, setOwnNeed] = useState("");
  const [ownNope, setOwnNope] = useState("");
  const ess = essentials(state);
  const allPicked = [...state.needs.map((n) => ({ k: `n:${n}`, t: n })), ...state.nopes.map((n) => ({ k: `p:${n}`, t: n }))];

  const togglePick = (list: "needs" | "nopes", item: string) => {
    const cur = state[list];
    update({ [list]: cur.includes(item) ? cur.filter((x) => x !== item) : [...cur, item] });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">What really matters?</h3>
      <div className="flex gap-2 text-xs font-bold uppercase tracking-wider">
        {[1, 2, 3].map((n) => (
          <button key={n} type="button" onClick={() => setStep(n)} className={`rounded-full px-3 py-1.5 ${step === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            Step {n}
          </button>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <p>Let&rsquo;s start with the lists you&rsquo;re actually dating with right now. Tap the ones that sound like you — and add your own.</p>
          <p className="text-sm font-semibold">My needs</p>
          <ChipRow>
            {NEEDS_POOL.map((n) => (
              <Chip key={n} on={state.needs.includes(n)} onClick={() => togglePick("needs", n)}>{n}</Chip>
            ))}
          </ChipRow>
          <div className="flex gap-2">
            <input value={ownNeed} onChange={(e) => setOwnNeed(e.target.value)} placeholder="Add one of your own…" className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
            <button type="button" onClick={() => { if (ownNeed.trim()) { update({ needs: [...state.needs, ownNeed.trim()] }); setOwnNeed(""); } }} className="rounded-lg bg-primary px-3 text-primary-foreground" aria-label="Add need"><Plus className="h-4 w-4" /></button>
          </div>
          <p className="text-sm font-semibold">My nopes</p>
          <ChipRow>
            {NOPES_POOL.map((n) => (
              <Chip key={n} on={state.nopes.includes(n)} onClick={() => togglePick("nopes", n)}>{n}</Chip>
            ))}
          </ChipRow>
          <div className="flex gap-2">
            <input value={ownNope} onChange={(e) => setOwnNope(e.target.value)} placeholder="Add one of your own…" className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
            <button type="button" onClick={() => { if (ownNope.trim()) { update({ nopes: [...state.nopes, ownNope.trim()] }); setOwnNope(""); } }} className="rounded-lg bg-primary px-3 text-primary-foreground" aria-label="Add nope"><Plus className="h-4 w-4" /></button>
          </div>
          <button type="button" onClick={() => setStep(2)} disabled={allPicked.length === 0} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-40">
            Next — throw out what doesn&rsquo;t matter
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p>Now look at each one and ask: is this about a great relationship, or is it about my story? Tap the ones that aren&rsquo;t really essential, and let them go.</p>
          <ChipRow>
            {allPicked.map((x) => (
              <Chip key={x.k} cut={state.eliminated.includes(x.k)} onClick={() => update({ eliminated: state.eliminated.includes(x.k) ? state.eliminated.filter((e) => e !== x.k) : [...state.eliminated, x.k] })}>
                {x.t}{state.eliminated.includes(x.k) ? " — let go" : ""}
              </Chip>
            ))}
          </ChipRow>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="rounded-full border border-border px-5 py-2.5 text-sm">Back</button>
            <button type="button" onClick={() => setStep(3)} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">See what&rsquo;s left</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm leading-relaxed">
            <p className="font-semibold">What you&rsquo;re left with</p>
            <p className="mt-2"><span className="font-semibold">Needs:</span> {ess.needs.join(", ") || "—"}</p>
            <p><span className="font-semibold">True nopes:</span> {ess.nopes.join(", ") || "—"}</p>
            <p className="mt-2">What&rsquo;s left is what actually matters. That&rsquo;s the list to date with from here on.</p>
          </div>
          <p className="text-sm text-muted-foreground">You&rsquo;ll use this list again in Lesson 15, when you rate real people against it.</p>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)} className="rounded-full border border-border px-5 py-2.5 text-sm">Back</button>
            <Link href="/course/learn/8" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Done — next lesson <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
      <a href={PDFS.needsNopes} download className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
        <Download className="h-4 w-4" /> Download the Needs and Nope List as a PDF
      </a>
      <SavedNote />
    </div>
  );
}

// ---------- Lesson 10: mantra builder ----------
export function MantraBuilder({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <p>Here&rsquo;s one to start with — mine. Cross out what doesn&rsquo;t sound like you, add your own words, and make it yours. You&rsquo;ll want it on your phone before your next date.</p>
      <textarea
        rows={5}
        value={state.mantra}
        onChange={(e) => update({ mantra: e.target.value })}
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm leading-relaxed"
      />
      <button type="button" onClick={() => update({ mantra: SAM_MANTRA })} className="text-sm text-primary hover:underline">Start over from Sam&rsquo;s version</button>
      <div>
        <label htmlFor="mantra-date" className="text-sm font-semibold">My next date is…</label>
        <input id="mantra-date" type="text" value={state.mantraDate} onChange={(e) => update({ mantraDate: e.target.value })} placeholder="e.g. Friday, with Alex" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
        <p className="mt-1 text-sm text-muted-foreground">Say your mantra before it.</p>
      </div>
      <div className="rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm">That&rsquo;s yours now. Say it before your next date.</div>
      <SavedNote />
    </div>
  );
}

// ---------- Lesson 11: listening ----------
export function ListeningTool({ state, update, toggleIn }: Props) {
  return (
    <div className="space-y-4">
      <p>Think about your last date. What did you do most?</p>
      <ChipRow>
        {LISTEN_SELF_CHECK.map((o) => (
          <Chip key={o} on={state.listenSelfCheck === o} onClick={() => update({ listenSelfCheck: o })}>{o}</Chip>
        ))}
      </ChipRow>
      <p>Now pick the 2 things you most need to work on:</p>
      <ChipRow>
        {LISTENING_TIPS.map((t, i) => (
          <Chip key={t} on={state.listenFocus.includes(i)} onClick={() => toggleIn("listenFocus", i, 2)}>{t}</Chip>
        ))}
      </ChipRow>
      <div className="rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm leading-relaxed">
        Here&rsquo;s what you&rsquo;re working on: {state.listenFocus.map((i) => LISTENING_TIPS[i]).join(", ") || "—"}
      </div>
      <p className="text-sm text-muted-foreground">
        The people you love most are usually the people who enjoy listening to you. Being curious draws people to you.
      </p>
      <SavedNote />
    </div>
  );
}

// ---------- Lesson 12: question deck ----------
export function QuestionDeck({ state, toggleIn }: Props) {
  return (
    <div className="space-y-4">
      <p>Here are 10 questions from the guide to choose from. Pick 3 for your next date.</p>
      <ChipRow>
        {DECK_QUESTIONS.map((q, i) => (
          <Chip key={q} on={state.questions.includes(i)} onClick={() => toggleIn("questions", i, 3)}>{q}</Chip>
        ))}
      </ChipRow>
      <div className="rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm leading-relaxed">
        And here are your 3 questions: {state.questions.map((i) => DECK_QUESTIONS[i]).join(" · ") || "—"}
      </div>
      <a href={PDFS.questionsGuide} download className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
        <Download className="h-4 w-4" /> Download all 20 questions as a PDF
      </a>
      <SavedNote />
    </div>
  );
}

// ---------- Lesson 13: post-date reflection (reusable) ----------
export function ReflectionTool({ state, update }: Props) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [justSaved, setJustSaved] = useState(false);
  const prompt = REFLECTION_PROMPTS[step];
  const last = state.reflections.length - 1;

  const save = () => {
    const entry: Reflection = { date: new Date().toLocaleDateString(), name: "", ...draft };
    update({ reflections: [...state.reflections, entry] });
    setDraft({});
    setStep(0);
    setJustSaved(true);
  };

  return (
    <div className="space-y-4">
      <p>Do this one after every date — on the phone, on the way home. It only takes a few minutes, and it&rsquo;s how you learn.</p>
      {state.reflections.length > 0 && (
        <p className="text-sm text-muted-foreground">
          You&rsquo;ve done {state.reflections.length} reflection{state.reflections.length > 1 ? "s" : ""} so far. Latest: {state.reflections[last].date}
          {state.reflections[last].again ? ` — “Do I want to go out again?” ${state.reflections[last].again}` : ""}
        </p>
      )}
      <div className="flex gap-1.5">
        {REFLECTION_PROMPTS.map((_, i) => (
          <button key={i} type="button" onClick={() => setStep(i)} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} aria-label={`Go to prompt ${i + 1}`} />
        ))}
      </div>
      <h3 className="text-xl font-semibold">{prompt.label}</h3>
      <textarea
        rows={3}
        value={draft[prompt.key] || ""}
        onChange={(e) => setDraft({ ...draft, [prompt.key]: e.target.value })}
        placeholder="Write it while it's fresh…"
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"
      />
      <div className="flex justify-between gap-3">
        <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded-full border border-border px-5 py-2.5 text-sm disabled:opacity-40">Back</button>
        {step < REFLECTION_PROMPTS.length - 1 ? (
          <button type="button" onClick={() => setStep(step + 1)} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Next</button>
        ) : (
          <button type="button" onClick={save} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Save this reflection</button>
        )}
      </div>
      {justSaved && <p className="text-sm text-primary">Saved. Come back and do it again after your next date.</p>}
      <SavedNote />
    </div>
  );
}

// ---------- Lesson 14: Say What You Need to Say ----------
export function SayItTool({ state, update }: Props) {
  const sit = SAY_IT_SITUATIONS.find((s) => s.key === state.messageSit);
  const msg = state.message;
  const draft = [msg.fact, msg.feel, msg.need, msg.req].filter(Boolean).join(" ");
  return (
    <div className="space-y-4">
      <p>Being straightforward sounds scary. I know. But it saves time, and it moves things forward. Pick the one you&rsquo;re facing, look at how it might sound, then write your own version. Say it with &ldquo;I&rdquo;, keep it short, and say it plainly.</p>
      <ChipRow>
        {SAY_IT_SITUATIONS.map((s) => (
          <Chip key={s.key} on={state.messageSit === s.key} onClick={() => update({ messageSit: s.key })}>{s.label}</Chip>
        ))}
      </ChipRow>
      {sit && (
        <>
          <div className="rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm leading-relaxed">
            <p className="font-semibold">How it might sound</p>
            <p className="mt-1">{sit.example}</p>
            {"freshDraft" in sit && (sit as { freshDraft?: boolean }).freshDraft && (
              <p className="mt-2 text-xs text-muted-foreground">Sam wrote the other examples in his book — this one is a draft, in his words, for him to check.</p>
            )}
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-semibold">Fact — what actually happened?</label>
              <input value={msg.fact} onChange={(e) => update({ message: { ...msg, fact: e.target.value } })} placeholder="When you…" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="text-sm font-semibold">Feeling — how did it leave you?</label>
              <input value={msg.feel} onChange={(e) => update({ message: { ...msg, feel: e.target.value } })} placeholder="I felt…" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="text-sm font-semibold">Need — what do you need?</label>
              <input value={msg.need} onChange={(e) => update({ message: { ...msg, need: e.target.value } })} placeholder="I need…" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="text-sm font-semibold">Request — what are you asking for?</label>
              <input value={msg.req} onChange={(e) => update({ message: { ...msg, req: e.target.value } })} placeholder="Would you be willing to…" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-sm leading-relaxed">
            {draft || "Your words will show up here as you write them."}
          </div>
        </>
      )}
      <p className="text-sm text-muted-foreground">A &ldquo;no&rdquo; means nothing about you. It means they&rsquo;re not in a place to connect.</p>
      <SavedNote />
    </div>
  );
}

// ---------- Lessons 15 + 16: the grid ----------
export function GridTool({ state, update, showPdf }: Props & { showPdf?: boolean }) {
  const ess = essentials(state);
  const rows = state.gridNames;
  const setName = (i: number, v: string) => {
    const names = [...rows];
    names[i] = v;
    update({ gridNames: names });
  };
  const addPerson = () => {
    if (rows.length < 5) update({ gridNames: [...rows, ""] });
  };
  const toggleCell = (r: number, c: string) => {
    const k = `${r}-${c}`;
    update({ grid: { ...state.grid, [k]: !state.grid[k] } });
  };
  const scores = rows.map((_, i) => GRID_QUALITIES.filter((q) => state.grid[`${i}-${q.key}`]).length);
  const top = gridTopTwo(state);

  return (
    <div className="space-y-4">
      <p>Think of the people you might be interested in dating right now. Put their first names in, then tap the boxes. We&rsquo;re looking for potential here, not perfection.</p>
      {ess.needs.length > 0 && (
        <p className="text-sm text-muted-foreground">Your essentials from Lesson 7: {ess.needs.join(", ")}. Those are the ones you&rsquo;re checking for here.</p>
      )}
      <div className="space-y-2">
        {rows.map((name, i) => (
          <input key={i} value={name} onChange={(e) => setName(i, e.target.value)} placeholder={`First name — person ${i + 1}`} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
        ))}
      </div>
      {rows.length < 5 && (
        <button type="button" onClick={addPerson} className="inline-flex items-center gap-1 text-sm text-primary hover:underline"><Plus className="h-4 w-4" /> Add another person (up to 5)</button>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-border p-2 text-left font-semibold">Person</th>
              {GRID_QUALITIES.map((q) => (
                <th key={q.key} className="border border-border p-2 text-center font-semibold" title={q.hint}>{q.label}</th>
              ))}
              <th className="border border-border p-2 text-center font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((name, i) => (
              <tr key={i} className={top.some((t) => t.row === i) && name.trim() ? "bg-primary/10" : ""}>
                <td className="border border-border p-2 font-medium">{name.trim() || `Person ${i + 1}`}</td>
                {GRID_QUALITIES.map((q) => {
                  const on = !!state.grid[`${i}-${q.key}`];
                  return (
                    <td key={q.key} className="border border-border p-1 text-center">
                      <button type="button" onClick={() => toggleCell(i, q.key)} aria-pressed={on} aria-label={`${q.label} for ${name || `person ${i + 1}`}`} className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-lg ${on ? "bg-primary font-bold text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {on ? "✓" : ""}
                      </button>
                    </td>
                  );
                })}
                <td className="border border-border p-2 text-center font-bold">{scores[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">Tap a column name to see what it means. Admiration, common values, trust, fun, work ethic — and attraction still counts.</p>
      <div className="rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm leading-relaxed">
        {top.length === 0
          ? "The two with the most checks are the ones to ask out — or at least spend some time with this week."
          : `Top two right now: ${top.map((t) => `${t.name} (${t.score} of 6)`).join(", ")}.`}
        {top.length > 0 && " So who is it — and when this week?"}
      </div>
      <div>
        <label htmlFor="ask-when" className="text-sm font-semibold">I&rsquo;ll ask them out…</label>
        <input id="ask-when" value={state.askWhen} onChange={(e) => update({ askWhen: e.target.value })} placeholder="e.g. This Thursday" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
      </div>
      {showPdf && (
        <a href={PDFS.findingSomeone} download className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <Download className="h-4 w-4" /> Download the grid as a PDF
        </a>
      )}
      <SavedNote />
    </div>
  );
}

// ---------- Lesson 18: 3-date planner ----------
export function PlannerTool({ state, update }: Props) {
  const plan = state.plan;
  return (
    <div className="space-y-6">
      <p>Dates go better when you&rsquo;ve thought about them first. Pick one for each date — and keep it simple.</p>
      <div>
        <label htmlFor="plan-for" className="text-sm font-semibold">These dates are with…</label>
        <input id="plan-for" value={state.planFor} onChange={(e) => update({ planFor: e.target.value })} placeholder="First name" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
      </div>
      {DATE_PLANS.map((d) => {
        const key = `d${d.n}` as "d1" | "d2" | "d3";
        const qkey = `q${d.n}` as "q1" | "q2" | "q3";
        return (
          <div key={d.n} className="space-y-3 rounded-xl border border-border bg-card p-4">
            <h3 className="font-semibold">Date {d.n} — {d.title} <span className="font-normal text-muted-foreground">({d.duration})</span></h3>
            <ChipRow>
              {d.activities.map((a) => (
                <Chip key={a} on={plan[key] === a} onClick={() => update({ plan: { ...plan, [key]: a } })}>{a}</Chip>
              ))}
            </ChipRow>
            <p className="text-sm text-muted-foreground">One question to ask:</p>
            <ChipRow>
              {d.questions.map((q) => (
                <Chip key={q} on={plan[qkey] === q} onClick={() => update({ plan: { ...plan, [qkey]: q } })}>{q}</Chip>
              ))}
            </ChipRow>
          </div>
        );
      })}
      <div>
        <p className="font-semibold">Now, how will you ask? Keep it calm, clear, and short:</p>
        <input value={plan.invite} onChange={(e) => update({ plan: { ...plan, invite: e.target.value } })} placeholder="e.g. Bookstore tomorrow night?" className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
        <p className="mt-1 text-xs text-muted-foreground">Calm, clear, concise. Say what, say when, and ask them to join. You don&rsquo;t have to use the word &ldquo;date&rdquo; if you don&rsquo;t want to.</p>
      </div>
      <div className="rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm leading-relaxed">
        Here&rsquo;s your plan: Date 1: {plan.d1 || "—"} · Date 2: {plan.d2 || "—"} · Date 3: {plan.d3 || "—"}
        <br />Invite: {plan.invite || "—"}
      </div>
      <SavedNote />
    </div>
  );
}

// ---------- Lesson 19: action plan ----------
export function ActionPlan({ state, update, toggleIn }: Props) {
  const ess = essentials(state);
  const top = gridTopTwo(state);
  const planText = buildActionPlanText(state);
  const mailto = `mailto:?subject=${encodeURIComponent("My action plan — How to Date Authentically")}&body=${encodeURIComponent(planText)}`;

  return (
    <div className="space-y-6">
      <p>Here&rsquo;s everything you&rsquo;ve done in this course, all in one place. Look it over. Then pick your next step — and put a date on it.</p>

      <div className="space-y-3 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed">
        <p><span className="font-semibold">What I want to change:</span> {state.story.q14 || "—"}</p>
        <p><span className="font-semibold">What really matters to me:</span> {ess.needs.join(", ") || "—"}</p>
        <p><span className="font-semibold">True deal-breakers:</span> {ess.nopes.join(", ") || "—"}</p>
        <p><span className="font-semibold">My mantra:</span> {state.mantra || "—"}</p>
        <p><span className="font-semibold">Listening — what I&rsquo;m working on:</span> {state.listenFocus.map((i) => LISTENING_TIPS[i]).join(", ") || "—"}</p>
        <p><span className="font-semibold">My 3 questions:</span> {state.questions.map((i) => DECK_QUESTIONS[i]).join(" · ") || "—"}</p>
        <p><span className="font-semibold">The two people to ask out:</span> {top.map((t) => `${t.name} (${t.score} of 6)`).join(", ") || "—"}{state.askWhen ? ` — ${state.askWhen}` : ""}</p>
        <p><span className="font-semibold">My first three dates{state.planFor ? ` with ${state.planFor}` : ""}:</span> {state.plan.d1 || "—"} · {state.plan.d2 || "—"} · {state.plan.d3 || "—"}</p>
        <p><span className="font-semibold">How I&rsquo;ll ask:</span> {state.plan.invite || "—"}</p>
        {(state.message.fact || state.message.feel) && (
          <p><span className="font-semibold">What I need to say:</span> {[state.message.fact, state.message.feel, state.message.need, state.message.req].filter(Boolean).join(" ")}</p>
        )}
        <p><span className="font-semibold">Signs of the World of Right I spotted:</span> {state.signs.length} of 8</p>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold">How will I know? — from chapter 12 of the book</h3>
        <p className="text-sm text-muted-foreground">A great relationship has some combination of these five things. Tap the ones you can already see.</p>
        <ChipRow>
          {HOW_WILL_I_KNOW.map((h, i) => (
            <Chip key={h.label} on={state.know.includes(i)} onClick={() => toggleIn("know", i)}>
              {h.label} — {h.hint}
            </Chip>
          ))}
        </ChipRow>
        <p className="text-sm text-muted-foreground">
          {state.know.length === 0 ? "Tap the ones you can see already." : `${state.know.length} out of 5. There's no need to make lists — just pay attention to the things that matter most.`}
        </p>
      </div>

      <div className="space-y-3">
        <p className="font-semibold">One choice: I&rsquo;m dating in the world of happy from here on.</p>
        <div>
          <label htmlFor="next-step" className="text-sm font-semibold">My next step</label>
          <input id="next-step" value={state.nextStep} onChange={(e) => update({ nextStep: e.target.value })} placeholder="e.g. Ask Alex out" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label htmlFor="next-date" className="text-sm font-semibold">By when?</label>
          <input id="next-date" type="date" value={state.nextDate} onChange={(e) => update({ nextDate: e.target.value })} className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm" />
        </div>
      </div>

      <a href={mailto} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
        <Mail className="h-4 w-4" /> Email me my action plan
      </a>
      <p className="text-xs text-muted-foreground">This opens an email with your plan already written in it — you send it to yourself. A one-tap send inside the course comes later.</p>
      <SavedNote />
    </div>
  );
}
