"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, MenuItem } from "./types";
import { DELIVERY_FEE, TAX_RATE } from "./api";

type Action =
  | { type: "add"; item: MenuItem }
  | { type: "inc"; id: number }
  | { type: "dec"; id: number }
  | { type: "remove"; id: number }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;
    case "add": {
      const found = state.find((l) => l.item.id === action.item.id);
      return found
        ? state.map((l) => (l.item.id === action.item.id ? { ...l, qty: l.qty + 1 } : l))
        : [...state, { item: action.item, qty: 1 }];
    }
    case "inc":
      return state.map((l) => (l.item.id === action.id ? { ...l, qty: l.qty + 1 } : l));
    case "dec":
      return state
        .map((l) => (l.item.id === action.id ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0);
    case "remove":
      return state.filter((l) => l.item.id !== action.id);
    case "clear":
      return [];
  }
}

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  tax: number;
  delivery: number;
  total: number;
  hydrated: boolean;
  add: (item: MenuItem) => void;
  inc: (id: number) => void;
  dec: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  qtyOf: (id: number) => number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "rosoi-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);

  // Load saved cart after mount (avoids SSR/client hydration mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) dispatch({ type: "hydrate", lines: JSON.parse(raw) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, hydrated]);

  const add = useCallback((item: MenuItem) => dispatch({ type: "add", item }), []);
  const inc = useCallback((id: number) => dispatch({ type: "inc", id }), []);
  const dec = useCallback((id: number) => dispatch({ type: "dec", id }), []);
  const remove = useCallback((id: number) => dispatch({ type: "remove", id }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.item.price, 0);
    const tax = Math.round(subtotal * TAX_RATE);
    const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
    return {
      lines, count, subtotal, tax, delivery,
      total: subtotal + tax + delivery,
      hydrated, add, inc, dec, remove, clear,
      qtyOf: (id) => lines.find((l) => l.item.id === id)?.qty ?? 0,
    };
  }, [lines, hydrated, add, inc, dec, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
}
