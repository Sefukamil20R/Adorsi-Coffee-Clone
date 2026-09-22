"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ChapaPaymentStatus } from "@/domain/payment/chapa";
import { useCart } from "@/components/cart/CartContext";

type ResolvedPayment = {
  txRef: string;
  status: ChapaPaymentStatus;
  amount?: number;
};

type Props = {
  txRef: string;
};

function statusCopy(status: ChapaPaymentStatus): {
  title: string;
  body: string;
} {
  switch (status) {
    case "success":
      return {
        title: "Payment successful",
        body: "Your order has been received.",
      };
    case "pending":
      return {
        title: "Payment pending",
        body: "We are still confirming your payment. You can return to the menu and check back shortly.",
      };
    case "failed":
      return {
        title: "Payment not completed",
        body: "Your payment was cancelled or did not go through. Your cart is still saved — you can try again.",
      };
    default:
      return {
        title: "Payment status unknown",
        body: "We could not verify this payment. If you were charged, contact us with your receipt.",
      };
  }
}

export default function ChapaReturnClient({ txRef }: Props) {
  const { completeChapaPayment } = useCart();
  const cleared = useRef(false);
  const [loading, setLoading] = useState(true);
  const [resolved, setResolved] = useState<ResolvedPayment>({
    txRef: txRef.trim(),
    status: "pending",
  });

  useEffect(() => {
    const trimmed = txRef.trim();
    if (!trimmed) {
      setResolved({ txRef: "", status: "invalid" });
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(
          `/api/payment/chapa/return-status?tx_ref=${encodeURIComponent(trimmed)}`,
          { cache: "no-store" },
        );
        const data = (await res.json()) as ResolvedPayment;
        if (!cancelled) {
          setResolved(data);
        }
      } catch {
        if (!cancelled) {
          setResolved({ txRef: trimmed, status: "pending" });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [txRef]);

  useEffect(() => {
    if (loading || resolved.status !== "success" || cleared.current) return;
    cleared.current = true;
    completeChapaPayment();
  }, [loading, resolved.status, completeChapaPayment]);

  const copy = statusCopy(resolved.status);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-[520px] text-center">
        <p className="font-inter text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--gold)]">
          Online payment
        </p>
        <p className="mt-6 font-inter text-[15px] text-[#8995A9]">
          Confirming your payment…
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[520px] text-center">
      <p className="font-inter text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--gold)]">
        Online payment
      </p>
      <h1 className="mt-4 font-heading text-[36px] leading-tight text-[#F2F0EA] max-md:text-[30px]">
        {copy.title}
      </h1>
      <p className="mt-3 font-inter text-[15px] leading-relaxed text-[#8995A9]">
        {copy.body}
      </p>
      {resolved.status === "success" && resolved.amount !== undefined ? (
        <p className="mt-5 font-heading text-[28px] text-[#F2F0EA]">
          {resolved.amount}{" "}
          <span className="font-inter text-[13px] text-[#8995A9]">ETB</span>
        </p>
      ) : null}
      {resolved.txRef ? (
        <p className="mt-4 font-inter text-[11px] text-[#6B778A]">
          Reference: {resolved.txRef}
        </p>
      ) : null}
      <Link
        href="/menu"
        className="mt-10 inline-flex h-[44px] min-w-[200px] items-center justify-center rounded-[10px] bg-[var(--gold)] px-8 font-inter text-[13px] font-medium text-[#1D2636] transition hover:opacity-90"
      >
        Back to Adorsi
      </Link>
    </div>
  );
}
