import type { CartCheckoutLine } from "@/domain/payment/chapa";
import { formatApiErrorMessage } from "@/domain/payment/format-api-error";

export type InitializeChapaRequest = {
  fullName: string;
  phone: string;
  lines: CartCheckoutLine[];
};

export type InitializeChapaResponse =
  | { checkoutUrl: string; txRef: string }
  | { error: string };

function extractErrorMessage(data: unknown): string {
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    return formatApiErrorMessage(
      record.error ?? record.message ?? data,
      "Unable to start online payment. Please try again.",
    );
  }

  return formatApiErrorMessage(
    data,
    "Unable to start online payment. Please try again.",
  );
}

export async function initializeChapaCheckout(
  body: InitializeChapaRequest,
): Promise<InitializeChapaResponse> {
  let res: Response;

  try {
    res = await fetch("/api/payment/chapa/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("[CHAPA] Network error:", error);
    return {
      error: "Unable to start online payment. Check your connection and try again.",
    };
  }

  let data: InitializeChapaResponse & { checkoutUrl?: string; error?: string };

  try {
    data = (await res.json()) as InitializeChapaResponse & {
      checkoutUrl?: string;
      error?: string;
    };
  } catch (error) {
    console.error("[CHAPA] Invalid JSON response:", error);
    return {
      error: "Unable to start online payment. Please try again.",
    };
  }

  if (!res.ok) {
    const message = extractErrorMessage(data);
    console.error("[CHAPA] API error:", res.status, data);
    return { error: message };
  }

  if (!data.checkoutUrl) {
    console.error("[CHAPA] Missing checkout_url in response:", data);
    return {
      error: "Chapa did not return a checkout URL. Please try again.",
    };
  }

  return {
    checkoutUrl: data.checkoutUrl,
    txRef: "txRef" in data && data.txRef ? data.txRef : "",
  };
}
