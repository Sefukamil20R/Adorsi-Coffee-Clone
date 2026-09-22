"use client";

import CartDrawer from "./CartDrawer";
import CartSnackbar from "./CartSnackbar";

export default function CartShell() {
  return (
    <>
      <CartSnackbar />
      <CartDrawer />
    </>
  );
}
