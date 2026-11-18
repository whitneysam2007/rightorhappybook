// Course config: Supabase project, course-owner emails, and the Stripe link.
// The Supabase publishable key is public by design (it ships in client apps).
// NEVER put the service_role / secret key in this repo or in client code.

export const SUPABASE_URL = "https://qazpdgrlxduyybywdxeh.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_jPELlDwVXMb7tE9cL--Shg_najh7jPL";

// Only these emails may see the admin page (/course/admin).
export const ADMIN_EMAILS = ["whitney.sam@gmail.com", "authenticdating24@gmail.com"];

// Stripe Payment Link for the $49.99 one-time checkout.
// TEST-MODE link only (Stripe account "The Finished Peace, LLC", sandbox):
// it takes test cards, no real money. Swap this for the live link before launch.
export const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_00waEY8z12rn8qP14a3AY00";
