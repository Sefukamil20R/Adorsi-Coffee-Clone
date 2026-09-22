import { paymentRepository } from "@/data/payment/payment-repository";
import type { CartCheckoutLine } from "@/domain/payment/chapa";
import { NextRequest, NextResponse } from "next/server";

function parseLines(raw: unknown): CartCheckoutLine[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const id = "id" in entry ? String(entry.id) : "";
      const quantity =
        "quantity" in entry ? Number(entry.quantity) : Number.NaN;
      if (!id || !Number.isInteger(quantity) || quantity < 1) return null;
      return { id, quantity };
    })
    .filter((line): line is CartCheckoutLine => line !== null);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      fullName?: string;
      phone?: string;
      lines?: unknown;
    };

    const lines = parseLines(body.lines);

    if (process.env.NODE_ENV === "development") {
      console.log("[CHAPA] Initialize request received");
      console.log("[CHAPA] Cart lines:", lines);
    }

    const result = await paymentRepository.initializeChapaCheckout({
      fullName: body.fullName ?? "",
      phone: body.phone ?? "",
      lines,
    });

    if (!result.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error("[CHAPA] Initialize failed:", result.error);
      }
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[CHAPA] tx_ref:", result.txRef);
      console.log("[CHAPA] checkout_url received");
    }

    return NextResponse.json({
      checkoutUrl: result.checkoutUrl,
      txRef: result.txRef,
    });
  } catch (error) {
    console.error("[CHAPA] Initialize route error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to start online payment. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
