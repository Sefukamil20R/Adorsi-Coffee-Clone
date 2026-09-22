/**
 * Base URL for Chapa return/callback links.
 * On Vercel, VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL are set automatically —
 * you do not need APP_URL for production to match local behavior.
 */
export function getAppBaseUrl(): string {
  const candidates = [
    process.env.APP_URL,
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  const fromEnv = candidates.find((value) => value?.trim())?.trim();

  if (!fromEnv) {
    return "http://localhost:3000";
  }

  if (fromEnv.startsWith("http://") || fromEnv.startsWith("https://")) {
    return fromEnv.replace(/\/$/, "");
  }

  return `https://${fromEnv.replace(/\/$/, "")}`;
}
