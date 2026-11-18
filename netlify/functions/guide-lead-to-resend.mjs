// netlify/functions/guide-lead-to-resend.mjs
//
// Receives Netlify Forms outgoing-webhook notifications for the guide-lead
// form (/guide) and forwards each signup to Resend:
//   1. Create the contact in Resend (409 = already exists, fine).
//   2. Fire the `guide.signup` event, which starts the
//      "Guide Nurture - 20 Questions" automation (Day 0/2/4/7/10/14).
//
// This replaces the "Guide Lead to Resend Nurture" Zap, which needs Zapier
// Professional: the Zap is 3 steps with a Webhooks step, and the Zapier
// Free plan allows only 2-step Zaps and no webhooks. There is no native
// "send event" action in Zapier's Resend app, so no free-plan Zap can fire
// the event. This function does the same two Resend calls, for free,
// on infrastructure Sam already has.
//
// Setup (Netlify dashboard, Site settings):
//   - Environment variables:
//       RESEND_API_KEY       a Resend API key with Full Access
//                            (create one at resend.com/api-keys)
//       GUIDE_WEBHOOK_SECRET a shared secret, also placed in the webhook URL
//   - Forms > Form notifications > Outgoing webhook, for the guide-lead form:
//       https://rightorhappybook.com/.netlify/functions/guide-lead-to-resend?secret=<GUIDE_WEBHOOK_SECRET>
//
// Notes:
//   - The direct Resend Events API takes `event`, not `name`
//     (verified: `name` returns 422). The old Zap's webhook step used
//     `name` inside Zapier; this function uses the direct API shape.
//   - The function only accepts POSTs carrying the shared secret, so the
//     endpoint cannot be used to enrol arbitrary emails.
//   - Netlify's outgoing webhook sends the submission as JSON; the email
//     is in `data.email` (also top-level `email`).

const RESEND_API = "https://api.resend.com";

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const expectedSecret = process.env.GUIDE_WEBHOOK_SECRET;
  const providedSecret = event.queryStringParameters?.secret;
  if (!expectedSecret || providedSecret !== expectedSecret) {
    console.log("guide-lead-to-resend: rejected (missing or wrong secret)");
    return json(401, { error: "Unauthorized" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("guide-lead-to-resend: RESEND_API_KEY is not set");
    return json(500, { error: "Server misconfigured" });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const formName = payload.form_name || payload.title;
  if (formName && formName !== "guide-lead") {
    return json(200, { ok: true, skipped: `form '${formName}' is not guide-lead` });
  }

  const email = String(payload.data?.email || payload.email || "")
    .trim()
    .toLowerCase();
  if (!email || !email.includes("@")) {
    return json(400, { error: "No valid email in submission" });
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "User-Agent": "rightorhappybook-guide-function/1.0",
  };

  // 1. Create the contact. A failure here is not fatal: the contact may
  // already exist (409) and the event below is what starts the nurture.
  let contactCreated = false;
  try {
    const createRes = await fetch(`${RESEND_API}/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email }),
    });
    contactCreated = createRes.ok;
    if (!createRes.ok) {
      console.log(
        `guide-lead-to-resend: create contact ${createRes.status} for ${email} (continuing to event)`
      );
    }
  } catch (err) {
    console.log(`guide-lead-to-resend: create contact threw for ${email}: ${err.message}`);
  }

  // 2. Fire the guide.signup event. This is what starts the nurture.
  let eventRes;
  try {
    eventRes = await fetch(`${RESEND_API}/events/send`, {
      method: "POST",
      headers,
      body: JSON.stringify({ event: "guide.signup", email }),
    });
  } catch (err) {
    console.error(`guide-lead-to-resend: send event threw for ${email}: ${err.message}`);
    return json(502, { error: "Resend event request failed" });
  }
  if (!eventRes.ok) {
    const text = await eventRes.text();
    console.error(
      `guide-lead-to-resend: send event ${eventRes.status} for ${email}: ${text}`
    );
    return json(502, { error: "Resend event failed" });
  }

  console.log(
    `guide-lead-to-resend: ${email} (contact ${contactCreated ? "created" : "already existed"}, guide.signup sent)`
  );
  return json(200, { ok: true, email, contactCreated });
}
