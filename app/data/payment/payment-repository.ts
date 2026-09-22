import {
  chapaInitializeTransaction,
  chapaVerifyTransaction,
  getChapaSecretKeyOrError,
} from "./chapa-datasource";
import {
  createPendingChapaPayment,
  findChapaPayment,
  updateChapaPaymentStatus,
} from "./chapa-payment-datasource";
import { getAppBaseUrl } from "./app-url";
import { findMenuItemsByIds } from "@/data/menu/menu-datasource";
import { computeCartTotalFromPrices } from "@/domain/payment/cart-total";
import {
  createTxRef,
  mapChapaVerifyStatus,
  type ChapaPaymentStatus,
  type InitializeChapaCheckoutInput,
  type InitializeChapaCheckoutResult,
} from "@/domain/payment/chapa";
import {
  chapaCustomerEmail,
  isValidCustomerName,
  isValidEthiopianPhone,
  normalizeEthiopianPhone,
  splitFullName,
} from "@/domain/payment/customer";

export type ResolvedChapaPayment = {
  txRef: string;
  status: ChapaPaymentStatus;
  amount?: number;
};

export class PaymentRepository {
  async initializeChapaCheckout(
    input: InitializeChapaCheckoutInput,
  ): Promise<InitializeChapaCheckoutResult> {
    const fullName = input.fullName.trim();
    const normalizedPhone = normalizeEthiopianPhone(input.phone);

    if (!isValidCustomerName(fullName)) {
      return {
        ok: false,
        error: "Please enter your full name.",
        status: 400,
      };
    }

    if (!normalizedPhone || !isValidEthiopianPhone(input.phone)) {
      return {
        ok: false,
        error: "Please enter a valid Ethiopian phone number (09… or 07…).",
        status: 400,
      };
    }

    if (!input.lines.length) {
      return {
        ok: false,
        error: "Your cart is empty.",
        status: 400,
      };
    }

    const ids = [...new Set(input.lines.map((line) => line.id))];
    const menuItems = await findMenuItemsByIds(ids);
    const priceById = new Map(menuItems.map((item) => [item.id, item.price]));
    const amount = computeCartTotalFromPrices(input.lines, priceById);

    if (process.env.NODE_ENV === "development") {
      console.log("[CHAPA] Calculated total:", amount);
    }

    if (amount === null) {
      return {
        ok: false,
        error: "Some cart items are invalid. Refresh and try again.",
        status: 400,
      };
    }

    if (!getChapaSecretKeyOrError()) {
      return {
        ok: false,
        error: "Chapa secret key is not configured.",
        status: 500,
      };
    }

    const txRef = createTxRef();
    const { firstName, lastName } = splitFullName(fullName);
    const baseUrl = getAppBaseUrl();
    const callbackUrl = `${baseUrl}/api/payment/chapa/callback`;
    const returnUrl = `${baseUrl}/payment/chapa/return?tx_ref=${encodeURIComponent(txRef)}`;

    try {
      await createPendingChapaPayment({
        txRef,
        amount,
        customerName: fullName,
        customerPhone: normalizedPhone,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not save the payment record.";
      return { ok: false, error: message, status: 500 };
    }

    try {
      const { checkoutUrl } = await chapaInitializeTransaction({
        amount: String(amount),
        currency: "ETB",
        email: chapaCustomerEmail(fullName, normalizedPhone),
        first_name: firstName,
        last_name: lastName,
        phone_number: normalizedPhone,
        tx_ref: txRef,
        callback_url: callbackUrl,
        return_url: returnUrl,
        customization: {
          title: "Adorsi Coffee",
          description: "Pay for your order online",
        },
      });

      return { ok: true, checkoutUrl, txRef };
    } catch (error) {
      await updateChapaPaymentStatus({
        txRef,
        status: "failed",
        verifiedAt: new Date(),
      });

      const message =
        error instanceof Error
          ? error.message
          : "Could not start Chapa checkout.";
      return { ok: false, error: message, status: 502 };
    }
  }

  async handleChapaCallback(params: {
    trxRef?: string | null;
    refId?: string | null;
    status?: string | null;
  }): Promise<{ acknowledged: boolean }> {
    const txRef = params.trxRef?.trim();
    if (!txRef) {
      return { acknowledged: false };
    }

    const existing = await findChapaPayment(txRef);
    if (!existing) {
      return { acknowledged: false };
    }

    if (existing.status === "success") {
      return { acknowledged: true };
    }

    await this.verifyAndPersist(txRef, params.refId?.trim() ?? undefined);
    return { acknowledged: true };
  }

  async resolvePaymentForReturn(txRef: string): Promise<ResolvedChapaPayment> {
    const trimmed = txRef.trim();
    if (!trimmed) {
      return { txRef: "", status: "invalid" };
    }

    const existing = await findChapaPayment(trimmed);
    if (!existing) {
      return { txRef: trimmed, status: "invalid" };
    }

    if (existing.status === "success") {
      return {
        txRef: trimmed,
        status: "success",
        amount: existing.amount,
      };
    }

    if (existing.status === "failed") {
      return {
        txRef: trimmed,
        status: "failed",
        amount: existing.amount,
      };
    }

    const verified = await this.verifyAndPersist(trimmed);
    return {
      txRef: trimmed,
      status: verified.status,
      amount: existing.amount,
    };
  }

  private async verifyAndPersist(
    txRef: string,
    callbackRefId?: string,
  ): Promise<{ status: ChapaPaymentStatus }> {
    try {
      const verified = await chapaVerifyTransaction(txRef);
      const status = mapChapaVerifyStatus(verified.status);

      await updateChapaPaymentStatus({
        txRef,
        status,
        chapaRefId: callbackRefId ?? verified.refId ?? null,
        verifiedAt: status === "success" ? new Date() : null,
      });

      return { status };
    } catch {
      return { status: "pending" };
    }
  }
}

export const paymentRepository = new PaymentRepository();
