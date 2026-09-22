export type ChapaPaymentStatus =
  | "pending"
  | "success"
  | "failed"
  | "invalid";

export type CartCheckoutLine = {
  id: string;
  quantity: number;
};

export type InitializeChapaCheckoutInput = {
  fullName: string;
  phone: string;
  lines: CartCheckoutLine[];
};

export type InitializeChapaCheckoutResult =
  | { ok: true; checkoutUrl: string; txRef: string }
  | { ok: false; error: string; status: number };

export function mapChapaVerifyStatus(
  status: string | undefined,
): ChapaPaymentStatus {
  if (!status) return "invalid";
  const normalized = status.toLowerCase();
  if (normalized === "success") return "success";
  if (normalized === "pending") return "pending";
  if (normalized === "failed" || normalized === "cancelled") return "failed";
  return "invalid";
}

export function createTxRef(): string {
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 10);
  return `adorsi-${stamp}-${rand}`;
}
