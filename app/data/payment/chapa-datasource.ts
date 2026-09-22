import { formatApiErrorMessage } from "@/domain/payment/format-api-error";

const CHAPA_API_BASE = "https://api.chapa.co/v1";

type ChapaInitializePayload = {
  amount: string;
  currency: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  tx_ref: string;
  callback_url: string;
  return_url: string;
  customization?: {
    title: string;
    description: string;
  };
};

type ChapaApiEnvelope<T> = {
  status?: string;
  message?: unknown;
  data?: T;
};

export function getChapaSecretKeyOrError(): string | null {
  const key = process.env.CHAPA_SECRET_KEY?.trim();
  return key || null;
}

function getChapaSecretKey(): string {
  const key = getChapaSecretKeyOrError();
  if (!key) {
    throw new Error("Chapa secret key is not configured.");
  }
  return key;
}

export async function chapaInitializeTransaction(
  payload: ChapaInitializePayload,
): Promise<{ checkoutUrl: string }> {
  if (process.env.NODE_ENV === "development") {
    console.log("[CHAPA] Initialize payload email:", payload.email);
  }

  const response = await fetch(`${CHAPA_API_BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getChapaSecretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = (await response.json()) as ChapaApiEnvelope<{
    checkout_url?: string;
  }>;

  if (!response.ok || body.status !== "success" || !body.data?.checkout_url) {
    if (process.env.NODE_ENV === "development") {
      console.error("[CHAPA] Initialize API response:", body);
    }
    const message = formatApiErrorMessage(
      body.message,
      "Chapa failed to initialize the transaction",
    );
    throw new Error(message);
  }

  return { checkoutUrl: body.data.checkout_url };
}

const CHAPA_VERIFY_TIMEOUT_MS = 6000;

export async function chapaVerifyTransaction(txRef: string): Promise<{
  status: string;
  refId?: string;
}> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CHAPA_VERIFY_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(
      `${CHAPA_API_BASE}/transaction/verify/${encodeURIComponent(txRef)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getChapaSecretKey()}`,
        },
        cache: "no-store",
        signal: controller.signal,
      },
    );
  } finally {
    clearTimeout(timeout);
  }

  const body = (await response.json()) as ChapaApiEnvelope<{
    status?: string;
    reference?: string;
  }>;

  if (!response.ok || body.status !== "success") {
    const message = formatApiErrorMessage(
      body.message,
      "Chapa verification failed",
    );
    throw new Error(message);
  }

  return {
    status: body.data?.status ?? "invalid",
    refId: body.data?.reference,
  };
}
