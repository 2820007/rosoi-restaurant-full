"use client";

import Link from "next/link";
import { useState } from "react";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/api";
import { useCart } from "@/lib/cart-context";
import Stepper from "./Stepper";

export default function AddToCartPanel({ item }: { item: MenuItem }) {
  const { add, inc, qtyOf, hydrated } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const inCart = hydrated ? qtyOf(item.id) : 0;

  function handleAdd() {
    add(item);
    for (let i = 1; i < qty; i++) inc(item.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Stepper qty={qty} onInc={() => setQty((q) => Math.min(q + 1, 20))} onDec={() => setQty((q) => Math.max(q - 1, 1))} label={item.name} />
        <button onClick={handleAdd} className="btn-brand flex-1 sm:flex-none">
          {added ? "Added ✓" : `Add to cart · ${formatPrice(item.price * qty)}`}
        </button>
      </div>
      {inCart > 0 && (
        <p className="text-sm text-muted">
          {inCart} in your cart.{" "}
          <Link href="/cart" className="text-lime hover:underline">
            View cart →
          </Link>
        </p>
      )}
    </div>
  );
}
