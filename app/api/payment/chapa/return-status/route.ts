import { paymentRepository } from "@/data/payment/payment-repository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const txRef = request.nextUrl.searchParams.get("tx_ref")?.trim() ?? "";
    const resolved = await paymentRepository.resolvePaymentForReturn(txRef);
    return NextResponse.json(resolved);
  } catch (error) {
    console.error("[GET /api/payment/chapa/return-status]", error);
    return NextResponse.json(
      { txRef: "", status: "invalid" as const },
      { status: 500 },
    );
  }
}
