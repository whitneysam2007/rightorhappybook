// Course answers live on the learner's own device (localStorage only).
// Nothing is sent anywhere. Lesson 19 offers "email me my action plan"
// as a mailto compose (interim, a real send comes later).

import { useCallback, useEffect, useState } from "react";
import { SAM_MANTRA } from "./data";

export type Reflection = Record<string, string> & { date: string; name: string };

export type CourseState = {
  whyHere: string[];
  whyHereNote: string;
  signs: number[];
  story: Record<string, string>;
  needs: string[];
  nopes: string[];
  eliminated: string[]; // items crossed out in Lesson 7 step 2
  mantra: string;
  mantraDate: string;
  listenSelfCheck: string;
  listenFocus: number[];
  questions: number[];
  reflections: Reflection[];
  messageSit: string;
  message: { fact: string; feel: string; need: string; req: string };
  gridNames: string[];
  grid: Record<string, boolean>;
  askWhen: string;
  planFor: string;
  plan: { d1: string; d2: string; d3: string; q1: string; q2: string; q3: string; invite: string };
  know: number[];
  nextStep: string;
  nextDate: string;
  completed: number[];
};

export const DEFAULT_STATE: CourseState = {
  whyHere: [],
  whyHereNote: "",
  signs: [],
  story: {},
  needs: [],
  nopes: [],
  eliminated: [],
  mantra: SAM_MANTRA,
  mantraDate: "",
  listenSelfCheck: "",
  listenFocus: [],
  questions: [],
  reflections: [],
  messageSit: "",
  message: { fact: "", feel: "", need: "", req: "" },
  gridNames: ["", ""],
  grid: {},
  askWhen: "",
  planFor: "",
  plan: { d1: "", d2: "", d3: "", q1: "", q2: "", q3: "", invite: "" },
  know: [],
  nextStep: "",
  nextDate: "",
  completed: [],
};

const KEY = "htdac-course-v1";

function load(): CourseState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useCourseState() {
  const [state, setState] = useState<CourseState>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // storage full or unavailable, answers just don't persist
    }
  }, [state]);

  const update = useCallback((patch: Partial<CourseState>) => {
    setState((s) => ({ ...s, ...patch }));
  }, []);

  const toggleIn = useCallback(
    (field: "signs" | "know" | "questions" | "listenFocus", v: number, max?: number) => {
      setState((s) => {
        const cur = s[field] as number[];
        const next = cur.includes(v)
          ? cur.filter((x) => x !== v)
          : max !== undefined && cur.length >= max
            ? [...cur.slice(1), v]
            : [...cur, v];
        return { ...s, [field]: next };
      });
    },
    [],
  );

  const markComplete = useCallback((lessonId: number) => {
    setState((s) =>
      s.completed.includes(lessonId) ? s : { ...s, completed: [...s.completed, lessonId] },
    );
  }, []);

  const resetAll = useCallback(() => setState(DEFAULT_STATE), []);

  return { state, update, toggleIn, markComplete, resetAll };
}

// Derived: the essentials that survived Lesson 7
export function essentials(state: CourseState) {
  const keptNeeds = state.needs.filter((n) => !state.eliminated.includes(`n:${n}`));
  const keptNopes = state.nopes.filter((n) => !state.eliminated.includes(`p:${n}`));
  return { needs: keptNeeds, nopes: keptNopes };
}

// Derived: grid scores per person, sorted best first
export function gridTopTwo(state: CourseState) {
  const scores = state.gridNames.map((name, i) => ({
    name: name.trim(),
    score: Object.keys(state.grid).filter((k) => k.startsWith(`${i}-`) && state.grid[k]).length,
    row: i,
  }));
  return scores
    .filter((s) => s.name)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
}

export function buildActionPlanText(state: CourseState): string {
  const ess = essentials(state);
  const top = gridTopTwo(state);
  const latest = state.reflections[state.reflections.length - 1];
  const lines = [
    "MY ACTION PLAN: How to Date Authentically",
    "",
    `What I want to change about my dating (from my story): ${state.story.q14 || "Not set yet"}`,
    "",
    `What really matters to me: ${ess.needs.join(", ") || "Not set yet"}`,
    `True deal-breakers: ${ess.nopes.join(", ") || "Not set yet"}`,
    "",
    `My pre-date mantra: ${state.mantra || "Not set yet"}`,
    "",
    `Listening: what I'm working on: ${state.listenFocus.map((i) => ["Be curious", "Show interest", "Don't interrupt", "Put the phone away", "Repeat back", "Show empathy", "Be open-minded"][i]).join(", ") || "Not set yet"}`,
    "",
    `My 3 questions for my next date: ${state.questions.map((i) => ["Something good that happened lately?", "What do you hope to accomplish with your dating journey?", "What is your go-to happy memory?", "Have you ever had your heart broken? How did it shape you?", "If you could solve one world problem, what would it be?", "What did you want to be when you were little?", "What is something you worry about?", "Tell me about your parents: what are they like?", "What is the most fun you have ever had?", "If your life were a telenovela, what would the weird twist be?"][i]).join(" | ") || "Not set yet"}`,
    "",
    `The two people to ask out: ${top.map((t) => `${t.name} (${t.score}/6)`).join(", ") || "Not set yet"}${state.askWhen ? `, ${state.askWhen}` : ""}`,
    "",
    `My first three dates${state.planFor ? ` with ${state.planFor}` : ""}:`,
    `  Date 1: ${state.plan.d1 || "Not set yet"}, ask: ${state.plan.q1 || "Not set yet"}`,
    `  Date 2: ${state.plan.d2 || "Not set yet"}, ask: ${state.plan.q2 || "Not set yet"}`,
    `  Date 3: ${state.plan.d3 || "Not set yet"}, ask: ${state.plan.q3 || "Not set yet"}`,
    `  How I'll ask: ${state.plan.invite || "Not set yet"}`,
    "",
    state.message.fact || state.message.feel
      ? `What I need to say: ${[state.message.fact, state.message.feel, state.message.need, state.message.req].filter(Boolean).join(" ")}`
      : "",
    latest ? `After my last date, what I want to change: ${latest.change || "Not set yet"}` : "",
    "",
    `My next step: ${state.nextStep || "Not set yet"}${state.nextDate ? `, by ${state.nextDate}` : ""}`,
    "",
    "Built in the How to Date Authentically course (rightorhappybook.com)",
  ];
  return lines.filter((l) => l !== "").join("\n");
}
