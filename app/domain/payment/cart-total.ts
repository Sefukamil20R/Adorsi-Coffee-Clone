import type { CartCheckoutLine } from "./chapa";

export function computeCartTotalFromPrices(
  lines: CartCheckoutLine[],
  priceById: Map<string, number>,
): number | null {
  if (lines.length === 0) return null;

  let total = 0;

  for (const line of lines) {
    if (!Number.isInteger(line.quantity) || line.quantity < 1) {
      return null;
    }

    const unitPrice = priceById.get(line.id);
    if (unitPrice === undefined || unitPrice < 0) {
      return null;
    }

    total += unitPrice * line.quantity;
  }

  if (total <= 0) return null;

  return total;
}
