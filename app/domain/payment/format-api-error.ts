export function formatApiErrorMessage(
  message: unknown,
  fallback: string,
): string {
  if (typeof message === "string" && message.trim()) {
    return message.trim();
  }

  if (message && typeof message === "object") {
    const record = message as Record<string, unknown>;
    const parts: string[] = [];

    for (const [key, value] of Object.entries(record)) {
      if (Array.isArray(value)) {
        const text = value
          .map((entry) => (typeof entry === "string" ? entry : String(entry)))
          .join(", ");
        if (text) parts.push(`${key}: ${text}`);
      } else if (typeof value === "string" && value.trim()) {
        parts.push(`${key}: ${value.trim()}`);
      }
    }

    if (parts.length > 0) {
      return parts.join(". ");
    }
  }

  return fallback;
}
