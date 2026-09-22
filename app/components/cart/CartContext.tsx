"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type CartItem = {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  quantity: number;
};

export type SnackbarState =
  | { kind: "item-added"; productName: string }
  | { kind: "receipt-submitted" }
  | null;

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  drawerOpen: boolean;
  snackbar: SnackbarState;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  dismissSnackbar: () => void;
  viewCartFromSnackbar: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  showReceiptSubmittedSnackbar: () => void;
  totalValue: number;
  totalLabel: string;
};

const CartContext = createContext<CartContextValue | null>(null);

const SNACKBAR_DURATION_MS = 4500;

export function parsePriceValue(price: string) {
  return parseInt(price.replace(/[^\d]/g, ""), 10) || 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>(null);
  const snackbarTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSnackbarTimer = useCallback(() => {
    if (snackbarTimer.current) {
      clearTimeout(snackbarTimer.current);
      snackbarTimer.current = null;
    }
  }, []);

  const dismissSnackbar = useCallback(() => {
    clearSnackbarTimer();
    setSnackbar(null);
  }, [clearSnackbarTimer]);

  const scheduleSnackbarDismiss = useCallback(() => {
    clearSnackbarTimer();
    snackbarTimer.current = setTimeout(() => {
      setSnackbar(null);
      snackbarTimer.current = null;
    }, SNACKBAR_DURATION_MS);
  }, [clearSnackbarTimer]);

  const showSnackbar = useCallback(
    (productName: string) => {
      setSnackbar({ kind: "item-added", productName });
      scheduleSnackbarDismiss();
    },
    [scheduleSnackbarDismiss],
  );

  const showReceiptSubmittedSnackbar = useCallback(() => {
    setSnackbar({ kind: "receipt-submitted" });
    scheduleSnackbarDismiss();
  }, [scheduleSnackbarDismiss]);

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      setItems((prev) => {
        const existing = prev.find((entry) => entry.id === item.id);

        if (existing) {
          return prev.map((entry) =>
            entry.id === item.id
              ? { ...entry, quantity: entry.quantity + 1 }
              : entry,
          );
        }

        return [...prev, { ...item, quantity: 1 }];
      });

      showSnackbar(item.title);
    },
    [showSnackbar],
  );

  const openDrawer = useCallback(() => {
    dismissSnackbar();
    setDrawerOpen(true);
  }, [dismissSnackbar]);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const viewCartFromSnackbar = useCallback(() => {
    clearSnackbarTimer();
    setSnackbar(null);
    setDrawerOpen(true);
  }, [clearSnackbarTimer]);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((entry) => entry.id !== id));
      return;
    }

    setItems((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, quantity } : entry,
      ),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [drawerOpen]);

  useEffect(() => () => clearSnackbarTimer(), [clearSnackbarTimer]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalValue = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.priceValue * item.quantity, 0),
    [items],
  );

  const totalLabel = `${totalValue} ETB`;

  const value = useMemo(
    () => ({
      items,
      itemCount,
      drawerOpen,
      snackbar,
      addToCart,
      openDrawer,
      closeDrawer,
      dismissSnackbar,
      viewCartFromSnackbar,
      updateQuantity,
      removeItem,
      clearCart,
      showReceiptSubmittedSnackbar,
      totalValue,
      totalLabel,
    }),
    [
      items,
      itemCount,
      drawerOpen,
      snackbar,
      addToCart,
      openDrawer,
      closeDrawer,
      dismissSnackbar,
      viewCartFromSnackbar,
      updateQuantity,
      removeItem,
      clearCart,
      showReceiptSubmittedSnackbar,
      totalValue,
      totalLabel,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
