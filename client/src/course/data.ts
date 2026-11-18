// How to Date Authentically: course content data.
// Sources: CONTENT_DIGEST.md (transcripts + tool fields) and VOICE_RUBRIC.md.
// Teaching is Sam's, paraphrased in his voice.

export const DRIVE_PREVIEW = (id: string) =>
  `https://drive.google.com/file/d/${id}/preview`;

export const VIDEOS: Record<string, { id: string; minutes: string }> = {
  welcome: { id: "1pLWbGc9Y6iPiPIgMtC1csl1g15vW1k47" },
  rightOrHappy: { id: "1EkOLBOHpwdFrME4HVZNSAAX3vqbWhCud" },
  story: { id: "1U1zsis4SeO_4GJyJLbO4nlnzhcWHNwCn" },
  needsNopes: { id: "1qGOlQVfKeiiatAUTewOj6CNTBkuGyZyB" },
  worldOfHappy: { id: "1GttGvdfJJ67OMMvL9o2ndA83f3c9rcho" },
  stateOfMind: { id: "1u9dGcVPk8FR7ME1XTi99tEARDmUf4l0k" },
  sayIt: { id: "104EuzD3D7H7qFm0wKaqiJV31eytIENNy" },
  findingSomeone: { id: "1oYSjb7rC_qsPmDH7woR-fXHPujTQaxPe" },
  threeDates: { id: "1w_9hgnEnfpzrfj5qmjAChUB435u6lBEv" },
  wrapUp: { id: "1_A9Dngc5JOHh8GBUoMDgaxz0qCdhvAjj" },
};

// The tools live in the course now, no downloads. Only the e-book
// still has a file, so learners can read it right here.
export const PDFS = {
  ebook: "/course/how-to-date-authentically-ebook.pdf",
};

export type Module = { title: string; lessons: number[] };

export const MODULES: Module[] = [
  { title: "Welcome", lessons: [1, 2, 3] },
  { title: "Dating in the World of Right", lessons: [4, 5, 6, 7] },
  { title: "Entering the World of Happy", lessons: [8, 9, 10, 11, 12, 13, 14] },
  { title: "Dating Tools", lessons: [15, 16, 17] },
  { title: "Wrap Up", lessons: [18] },
];

export type LessonMeta = {
  id: number;
  module: number;
  title: string;
  kind: "video" | "tool" | "text" | "library" | "intro" | "plan";
  video?: keyof typeof VIDEOS;
  mode: string; // "LEARNING" | "APPLYING" | "LEARNING + APPLYING"
};

export const LESSONS: LessonMeta[] = [
  { id: 1, module: 1, title: "Welcome", kind: "video", video: "welcome", mode: "LEARNING" },
  { id: 2, module: 1, title: "Read the E-Book", kind: "library", mode: "LEARNING" },
  { id: 3, module: 1, title: "Right or Happy?", kind: "video", video: "rightOrHappy", mode: "LEARNING + APPLYING" },
  { id: 4, module: 2, title: "Dissecting My Story", kind: "video", video: "story", mode: "LEARNING" },
  { id: 5, module: 2, title: "Dissecting My Story Tool", kind: "tool", mode: "APPLYING" },
  { id: 6, module: 2, title: "Discovering What Really Matters", kind: "video", video: "needsNopes", mode: "LEARNING" },
  { id: 7, module: 2, title: "Needs and Nope List", kind: "tool", mode: "APPLYING" },
  { id: 8, module: 3, title: "The World of Happy", kind: "video", video: "worldOfHappy", mode: "LEARNING" },
  { id: 9, module: 3, title: "Improving My Dating State of Mind", kind: "intro", video: "stateOfMind", mode: "LEARNING" },
  { id: 10, module: 3, title: "Pre-Date", kind: "tool", mode: "APPLYING" },
  { id: 11, module: 3, title: "During the Date", kind: "text", mode: "LEARNING + APPLYING" },
  { id: 12, module: 3, title: "Dating Questions Guide", kind: "tool", mode: "APPLYING" },
  { id: 13, module: 3, title: "Post Date", kind: "tool", mode: "APPLYING" },
  { id: 14, module: 3, title: "Say What You Need to Say", kind: "video", video: "sayIt", mode: "LEARNING + APPLYING" },
  { id: 15, module: 4, title: "Finding Someone to Date", kind: "video", video: "findingSomeone", mode: "LEARNING + APPLYING" },
  { id: 16, module: 4, title: "The First 3 Dates", kind: "intro", video: "threeDates", mode: "LEARNING" },
  { id: 17, module: 4, title: "The First 3 Dates Tool", kind: "tool", mode: "APPLYING" },
  { id: 18, module: 5, title: "Conclusion: Your Action Plan", kind: "plan", video: "wrapUp", mode: "LEARNING + APPLYING" },
];

export const lessonById = (id: number) => LESSONS.find((l) => l.id === id)!;
export const nextLesson = (id: number) => LESSONS.find((l) => l.id === id + 1) ?? null;
export const prevLesson = (id: number) => LESSONS.find((l) => l.id === id - 1) ?? null;

// --- Lesson 3: Signs of the World of Right (Sam's wording, verbatim) ---
export const SIGNS_OF_RIGHT = [
  "I spend a lot of time getting ready for dates so that I look really good.",
  "I hold myself hostage until the story works out",
  "I get fixated on the outside stuff, looks, accomplishments, what other people think",
  "I try to get them to fit the script I already wrote",
  "I alienate the very people I want to attract.",
  "I panic about what to tell people about them",
  "I feel anxious as I try to get other people to like me",
  "I lack confidence because I'm sure no one will like me or love me",
];

// --- Lesson 1: why I'm here ---
export const WHY_HERE = [
  "I want lasting love, and I keep getting in my own way",
  "I resist the whole dating process",
  "I read the book and want to actually do it",
  "I'm tired of dating to be right",
];

// --- Lesson 5: Story Tool: all 14 questions, 3 sections ---
export type StorySection = { label: string; questions: { key: string; text: string; hint?: string }[] };
export const STORY_TOOL: StorySection[] = [
  {
    label: "Building your story",
    questions: [
      { key: "q1", text: "Describe your ideal future partner: what are they like?" },
      { key: "q2", text: "How do the two of you meet? Where, when, how, why?" },
      { key: "q3", text: "What do others say about the two of you together?" },
      { key: "q4", text: "What is your relationship like?" },
    ],
  },
  {
    label: "Exploring your story",
    questions: [
      { key: "q5", text: "What are your favorite romantic stories, movies, books, plays?" },
      { key: "q6", text: "Why do you love the stories you chose? What is it about them?" },
      { key: "q7", text: "Do you see a connection between your ideal story and the love story you chose?" },
      { key: "q8", text: "Do you feel expectations from others affecting your story? How?" },
      { key: "q9", text: "Does your story need to happen in a certain timeframe? Do you feel rushed, and why?" },
      { key: "q10", text: "Do you see a pattern in your dating life emerging?" },
    ],
  },
  {
    label: "Questioning your story",
    questions: [
      { key: "q11", text: "What parts of your ideal story seem realistic, and which seem more fantastic?", hint: "Write the realistic parts in the first box, the fantastic parts in the second." },
      { key: "q12", text: "What parts feel vital, and which can you let go of?", hint: "Write what you want to keep in the first box, what you can let go of in the second." },
      { key: "q13", text: "What would be possible in your dating life if you didn't hold on to this story?" },
      { key: "q14", text: "What do you want to change in your dating, after thinking about your story?" },
    ],
  },
];

// --- Lesson 7: Needs and Nopes pools ---
export const NEEDS_POOL = [
  "Attractive so others envy me",
  "A cool job or degree",
  "Fun and easy to talk to",
  "Trustworthy",
  "Hard-working",
  "Admirable",
  "Good-looking above all",
];
export const NOPES_POOL = [
  "Likes video games",
  "Likes rom-coms",
  "Hasn't traveled",
  "Can't be trusted",
  "I don't feel safe with them",
  "We can't talk honestly",
];

// --- Lesson 10: mantra ---
export const SAM_MANTRA =
  "I am a person and they are a person. Their life is as full, crazy, fun, amazing, challenging and rich as mine. They want to be loved and find connection, and so do I. I am not afraid. I am open and ready to learn about another person.";

// --- Lesson 11: listening tips ---
export const LISTENING_TIPS = [
  "Be curious: ask about their life",
  "Show interest: nod, eye contact",
  "Don't interrupt: let them finish",
  "Put the phone away",
  "Repeat back what they said",
  "Show empathy for how they feel",
  "Be open-minded: don't judge",
];
export const LISTEN_SELF_CHECK = [
  "Mostly I talked",
  "Mostly I planned my next line",
  "Mostly I listened",
];

// --- Lesson 12: 10 questions to choose from (from the 20 in the appendix) ---
export const DECK_QUESTIONS = [
  "Something good that happened lately?",
  "What do you hope to accomplish with your dating journey?",
  "What is your go-to happy memory?",
  "Have you ever had your heart broken? How did it shape you?",
  "If you could solve one world problem, what would it be?",
  "What did you want to be when you were little?",
  "What is something you worry about?",
  "Tell me about your parents: what are they like?",
  "What is the most fun you have ever had?",
  "If your life were a telenovela, what would the weird twist be?",
];

// --- Lesson 13: post-date reflection prompts ---
export const REFLECTION_PROMPTS = [
  { key: "liked", label: "Things I liked" },
  { key: "notLiked", label: "Things I did not like" },
  { key: "remember", label: "Things I remember about them" },
  { key: "feel", label: "How do I feel about them?" },
  { key: "again", label: "Do I want to go out again?" },
  { key: "next", label: "What are my next steps?" },
  { key: "change", label: "What do I want to change or apply going forward?" },
];

// --- Lesson 14: situations + examples ---
// "like" and "down" examples follow Sam's appendix scripts. The "tell",
// "break", "hurt" and "space" examples are fresh drafts in Sam's formula,
// not yet approved by Sam.
export const SAY_IT_SITUATIONS = [
  {
    key: "like",
    label: "I like someone",
    example:
      "Honesty is super important to me, so I want to tell you how I feel. I like you. I really enjoy being around you, and I'd like to keep getting to know you.",
  },
  {
    key: "tell",
    label: "I need to tell someone how I feel",
    example:
      "When we talk, I feel like I'm not really being heard. I need to know we're both in this. Would you be willing to tell me how you're feeling about us?",
    freshDraft: true,
  },
  {
    key: "down",
    label: "I need to let someone down",
    example:
      "Thank you. I'm flattered that you like me. I don't feel the same way, and I'm sorry if that hurts. I want to be honest so we can both move forward.",
  },
  {
    key: "break",
    label: "I need to break up with someone",
    example:
      "I need to be honest with you, because you deserve that. I care about you, and I've enjoyed our time together, but I don't feel about you the way you deserve, and I can't see a future for us. I'm sorry this hurts. I wanted to tell you straight, instead of letting it drag on.",
    freshDraft: true,
  },
  {
    key: "hurt",
    label: "I need to tell someone they hurt me",
    example:
      "When you said that in front of everyone, I felt embarrassed, and I went quiet for the rest of the night. I need to know I can tell you when something stings. Would you be willing to hear me out?",
    freshDraft: true,
  },
  {
    key: "space",
    label: "I need to ask for some space",
    example:
      "I like where this is going, and I need a little room to breathe right now. I need a few days to sort out what I'm feeling. Would it be okay if I take some time, and then we talk?",
    freshDraft: true,
  },
];

// --- Lesson 15: six qualities ---
export const GRID_QUALITIES = [
  { key: "admire", label: "Admire", hint: "Warm, mutual respect: a talent, how they are with others, something that inspires you." },
  { key: "values", label: "Values", hint: "Things that matter to you that they share: faith, politics, ethics, how they see the world." },
  { key: "trust", label: "Trust", hint: "You feel safe with them. You can talk to them, even if you don't know them well yet." },
  { key: "fun", label: "Fun", hint: "Someone you'd have fun with. Smiling, enjoying themselves, easy to be around." },
  { key: "work", label: "Work ethic", hint: "Relational work ethic: do they put work into their relationships and keep their commitments?" },
  { key: "attraction", label: "Attraction", hint: "Still important, even in the world of happy. One quality among a balanced mix, not the whole list." },
];

// --- Lesson 18: dates ---
export const DATE_PLANS = [
  {
    n: 1,
    title: "Get to know them",
    duration: "45 minutes to an hour",
    activities: ["Browse a bookstore", "Ice cream", "A walk in the park", "Visit a farmers market", "Mini golf"],
    questions: ["What do you like to do for fun?", "What are your passions?", "What is something you're proud of?"],
  },
  {
    n: 2,
    title: "Go a little deeper",
    duration: "An hour or two",
    activities: ["Dinner", "A hike", "A museum", "Cook a simple meal together", "Attend a local event"],
    questions: ["What are your values?", "What are your dreams?", "What is your family like?"],
  },
  {
    n: 3,
    title: "See if you're a fit",
    duration: "Two or three hours",
    activities: ["Cook together", "Take a class", "Go to a concert", "A scenic drive and picnic", "Volunteer together for an afternoon"],
    questions: ["What are your deal breakers?", "What does your ideal relationship look like?", "How do you handle conflict?"],
  },
];

// --- Lesson 18: How Will I Know? (book chapter 12) ---
export const HOW_WILL_I_KNOW = [
  { label: "Mutual admiration", hint: "I respect who they are" },
  { label: "Common values", hint: "We care about the same things" },
  { label: "Trust", hint: "I feel safe being honest with them" },
  { label: "Fun", hint: "We actually enjoy being together" },
  { label: "Work ethic", hint: "They'll work on this with me" },
];
