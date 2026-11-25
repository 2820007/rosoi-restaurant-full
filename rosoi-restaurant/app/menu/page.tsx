import type { Metadata } from "next";
import { getCategories, getMenuItems } from "@/lib/api";
import MenuBrowser from "@/components/MenuBrowser";

export const metadata: Metadata = { title: "Menu | Rosoi" };

export default async function MenuPage() {
  const [items, categories] = await Promise.all([getMenuItems(), getCategories()]);
  return (
    <div className="container-x py-12">
      <p className="eyebrow">Fresh &amp; tasty</p>
      <h1 className="mb-8 mt-2 text-4xl font-bold">Our menu</h1>
      <MenuBrowser items={items} categories={categories} />
    </div>
  );
}
