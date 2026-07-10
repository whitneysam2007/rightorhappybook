# Right or Happy Book — rightorhappybook.com

A premium brand hub for Sam Whitney's dating coaching and education business, built around the book *How to Date Authentically*.

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS 4
- Vite
- Wouter (routing)
- Netlify (hosting + forms)

## Local Development

```bash
pnpm install
pnpm dev
```

## Deployment (Netlify)

This site is configured for Netlify deployment:

1. Connect this repo to Netlify
2. Build command: `pnpm run build`
3. Publish directory: `dist`
4. The `netlify.toml` file handles all configuration automatically

## Forms

All forms use Netlify Forms (free tier: 100 submissions/month). Submissions appear in the Netlify dashboard under Forms. Enable email notifications in Netlify to get alerted on each submission.

### Active Forms:
- **lead-magnet** — Email capture for the Free Dating Questions Guide
- **conference-lead** — Conference landing page email capture
- **speaking-inquiry** — Speaking engagement booking requests
- **coaching-request** — 1-on-1 coaching session requests

## Pages

- `/` — Homepage (hero, stats, testimonials, endorsements, podcasts, lead magnet)
- `/book` — Book sales page with endorsements
- `/course` — Course landing page (links to Thinkific)
- `/speaking` — Speaking topics and booking form
- `/coaching` — Coaching methodology and request form
- `/conference` — Conference-specific landing page (standalone, no nav)
