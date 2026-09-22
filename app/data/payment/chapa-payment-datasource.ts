import type { ChapaPaymentStatus } from "@/domain/payment/chapa";
import { prisma } from "@/data/menu/prisma-client";

export type ChapaPaymentRecord = {
  txRef: string;
  status: ChapaPaymentStatus;
  amount: number;
  currency: string;
  customerName: string;
  customerPhone: string;
  chapaRefId: string | null;
  verifiedAt: Date | null;
};

function mapStatus(status: string): ChapaPaymentStatus {
  if (
    status === "pending" ||
    status === "success" ||
    status === "failed" ||
    status === "invalid"
  ) {
    return status;
  }
  return "invalid";
}

export function assertChapaPaymentReady(): void {
  const delegate = (
    prisma as unknown as { chapaPayment?: { create?: unknown } }
  ).chapaPayment;

  if (!delegate?.create) {
    throw new Error(
      "Chapa payment storage is unavailable. Run npx prisma generate and restart the Next.js dev server.",
    );
  }
}

export async function createPendingChapaPayment(input: {
  txRef: string;
  amount: number;
  customerName: string;
  customerPhone: string;
}): Promise<void> {
  assertChapaPaymentReady();
  await prisma.chapaPayment.create({
    data: {
      txRef: input.txRef,
      status: "pending",
      amount: input.amount,
      currency: "ETB",
      customerName: input.customerName,
      customerPhone: input.customerPhone,
    },
  });
}

export async function findChapaPayment(
  txRef: string,
): Promise<ChapaPaymentRecord | null> {
  assertChapaPaymentReady();
  const row = await prisma.chapaPayment.findUnique({ where: { txRef } });
  if (!row) return null;

  return {
    txRef: row.txRef,
    status: mapStatus(row.status),
    amount: row.amount,
    currency: row.currency,
    customerName: row.customerName,
    customerPhone: row.customerPhone,
    chapaRefId: row.chapaRefId,
    verifiedAt: row.verifiedAt,
  };
}

export async function updateChapaPaymentStatus(input: {
  txRef: string;
  status: ChapaPaymentStatus;
  chapaRefId?: string | null;
  verifiedAt?: Date | null;
}): Promise<void> {
  assertChapaPaymentReady();
  await prisma.chapaPayment.update({
    where: { txRef: input.txRef },
    data: {
      status: input.status,
      chapaRefId: input.chapaRefId ?? undefined,
      verifiedAt: input.verifiedAt ?? undefined,
    },
  });
}
