import { paymentRepository } from "@/data/payment/payment-repository";
import { NextRequest, NextResponse } from "next/server";

async function handleCallback(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const result = await paymentRepository.handleChapaCallback({
    trxRef: searchParams.get("trx_ref"),
    refId: searchParams.get("ref_id"),
    status: searchParams.get("status"),
  });

  return NextResponse.json({ ok: result.acknowledged });
}

export async function GET(request: NextRequest) {
  try {
    return await handleCallback(request);
  } catch (error) {
    console.error("[GET /api/payment/chapa/callback]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    return await handleCallback(request);
  } catch (error) {
    console.error("[POST /api/payment/chapa/callback]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
