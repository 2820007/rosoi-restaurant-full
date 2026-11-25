"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/api";
import Stepper from "@/components/Stepper";

export default function CartPage() {
  const { lines, subtotal, tax, delivery, total, hydrated, inc, dec, remove, clear } = useCart();
  const [placed, setPlaced] = useState<string | null>(null);

  if (placed) {
    return (
      <div className="container-x grid place-items-center py-24 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-lime text-3xl text-bg">✓</div>
        <h1 className="mt-6 text-3xl font-bold">Order placed!</h1>
        <p className="mt-2 text-muted">
          Order <span className="font-semibold text-fg">{placed}</span> is being prepared. (Demo only, no backend yet.)
        </p>
        <Link href="/menu" className="btn-brand mt-8">
          Order more
        </Link>
      </div>
    );
  }

  if (!hydrated) return <div className="container-x py-24 text-center text-muted">Loading your cart…</div>;

  if (lines.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <p className="text-6xl">🛒</p>
        <h1 className="mt-4 text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/menu" className="btn-brand mt-8">
          Browse the menu
        </Link>
      </div>
    );
  }

  function placeOrder() {
    const id = "#RS" + Math.floor(10000 + Math.random() * 90000);
    clear();
    setPlaced(id);
  }

  return (
    <div className="container-x py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="eyebrow">Review &amp; checkout</p>
          <h1 className="mt-2 text-4xl font-bold">Your cart</h1>
        </div>
        <button onClick={clear} className="text-sm text-muted hover:text-red-400">
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <ul className="space-y-4">
          {lines.map(({ item, qty }) => (
            <li key={item.id} className="flex gap-4 rounded-2xl border border-line bg-surface p-3 sm:p-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-28">
                <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold">
                      <Link href={`/menu/${item.id}`} className="hover:text-lime">
                        {item.name}
                      </Link>
                    </h2>
                    <p className="text-sm text-muted">{formatPrice(item.price)} each</p>
                  </div>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-muted hover:text-red-400"
                    aria-label={`Remove ${item.name}`}
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <Stepper qty={qty} onInc={() => inc(item.id)} onDec={() => dec(item.id)} label={item.name} />
                  <span className="text-lg font-bold text-brand">{formatPrice(item.price * qty)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-line bg-surface p-6 lg:sticky lg:top-24">
          <h2 className="text-xl font-bold">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Tax (5%)</dt>
              <dd>{formatPrice(tax)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd>{formatPrice(delivery)}</dd>
            </div>
            <div className="flex justify-between border-t border-dashed border-line pt-4 text-lg font-bold">
              <dt>Total</dt>
              <dd className="text-brand">{formatPrice(total)}</dd>
            </div>
          </dl>
          <button onClick={placeOrder} className="btn-brand mt-6 w-full">
            Place order
          </button>
          <Link href="/menu" className="btn-ghost mt-3 w-full">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
