"use client";

import Image from "next/image";
import Link from "next/link";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/api";
import { useCart } from "@/lib/cart-context";
import Stepper from "./Stepper";

export default function MenuCard({ item }: { item: MenuItem }) {
  const { add, inc, dec, qtyOf, hydrated } = useCart();
  const qty = hydrated ? qtyOf(item.id) : 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-lime/50">
      <Link href={`/menu/${item.id}`} className="relative block aspect-[4/3] overflow-hidden" aria-label={`View ${item.name}`}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 grid h-5 w-5 place-items-center rounded-sm border-2 bg-bg/80 ${
            item.veg ? "border-lime" : "border-red-500"
          }`}
          title={item.veg ? "Vegetarian" : "Non-vegetarian"}
        >
          <span className={`h-2 w-2 rounded-full ${item.veg ? "bg-lime" : "bg-red-500"}`} />
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-bg/80 px-2 py-1 text-xs font-semibold text-brand">
          ★ {item.rating.toFixed(1)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold">
          <Link href={`/menu/${item.id}`} className="hover:text-lime">
            {item.name}
          </Link>
        </h3>
        <p className="mt-1 flex-1 text-sm text-muted">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-brand">{formatPrice(item.price)}</span>
          {qty === 0 ? (
            <button className="btn-brand !px-4 !py-2 text-sm" onClick={() => add(item)}>
              Add to cart
            </button>
          ) : (
            <Stepper qty={qty} onInc={() => inc(item.id)} onDec={() => dec(item.id)} label={item.name} />
          )}
        </div>
      </div>
    </article>
  );
}
