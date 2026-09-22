"use client";

import { CartProvider } from "./CartContext";
import CartShell from "./CartShell";

export default function CartProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {children}
      <CartShell />
    </CartProvider>
  );
}
