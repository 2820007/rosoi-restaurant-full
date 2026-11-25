"use client";

import { useMemo, useState } from "react";
import type { Category, MenuItem } from "@/lib/types";
import MenuCard from "./MenuCard";

type Sort = "default" | "low" | "high" | "rating";

export default function MenuBrowser({ items, categories }: { items: MenuItem[]; categories: Category[] }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("default");

  const shown = useMemo(() => {
    const query = q.trim().toLowerCase();
    const list = items.filter(
      (i) =>
        (cat === "all" || i.category === cat) &&
        (!vegOnly || i.veg) &&
        (!query || i.name.toLowerCase().includes(query) || i.description.toLowerCase().includes(query)),
    );
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [items, cat, q, vegOnly, sort]);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
        {categories.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={cat === c.id}
            onClick={() => setCat(c.id)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              cat === c.id
                ? "border-brand bg-brand font-semibold text-bg"
                : "border-line text-fg/80 hover:border-lime hover:text-lime"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search dishes…"
          aria-label="Search dishes"
          className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-lime sm:max-w-xs"
        />
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={(e) => setVegOnly(e.target.checked)}
            className="h-4 w-4 accent-lime"
          />
          Veg only
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          aria-label="Sort dishes"
          className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none focus:border-lime sm:ml-auto"
        >
          <option value="default">Sort: Featured</option>
          <option value="low">Price: Low to high</option>
          <option value="high">Price: High to low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      {shown.length === 0 ? (
        <p className="py-20 text-center text-muted">No dishes match your filters.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((i) => (
            <MenuCard key={i.id} item={i} />
          ))}
        </div>
      )}
    </>
  );
}
