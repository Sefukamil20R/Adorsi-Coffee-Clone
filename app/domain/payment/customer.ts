export function normalizeEthiopianPhone(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const digits = trimmed.replace(/\D/g, "");

  if (digits.length === 10 && /^0[79]\d{8}$/.test(digits)) {
    return digits;
  }

  if (digits.length === 12 && /^251[79]\d{8}$/.test(digits)) {
    return `0${digits.slice(3)}`;
  }

  if (digits.length === 9 && /^[79]\d{8}$/.test(digits)) {
    return `0${digits}`;
  }

  return null;
}

export function isValidEthiopianPhone(input: string): boolean {
  return normalizeEthiopianPhone(input) !== null;
}

export function isValidCustomerName(name: string): boolean {
  return name.trim().length >= 2;
}

export function splitFullName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: "Customer", lastName: "Customer" };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: parts[0] };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function sanitizeEmailToken(value: string, fallback: string): string {
  const token = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 24);
  return token || fallback;
}

/**
 * Chapa requires `email` on initialize. The cart only collects name + phone,
 * so we build a RFC-looking address (Chapa docs use *@gmail.com-style emails).
 * Override with CHAPA_CHECKOUT_EMAIL in .env for testing if needed.
 */
export function chapaCustomerEmail(fullName: string, phone: string): string {
  const override = process.env.CHAPA_CHECKOUT_EMAIL?.trim();
  if (override) return override;

  const { firstName, lastName } = splitFullName(fullName);
  const first = sanitizeEmailToken(firstName, "customer");
  const last = sanitizeEmailToken(lastName, "order");
  const phoneDigits = (normalizeEthiopianPhone(phone) ?? phone).replace(/\D/g, "");

  const local = phoneDigits
    ? `${first}_${last}_${phoneDigits}`.slice(0, 64)
    : `${first}_${last}`.slice(0, 64);

  return `${local}@gmail.com`;
}
