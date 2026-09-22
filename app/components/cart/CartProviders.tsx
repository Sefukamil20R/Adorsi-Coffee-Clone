"use client";

import RoutePrefetch from "@/components/common/RoutePrefetch";
import { CartProvider } from "./CartContext";
import CartShell from "./CartShell";

export default function CartProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <RoutePrefetch />
      {children}
      <CartShell />
    </CartProvider>
  );
}
