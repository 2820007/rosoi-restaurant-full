import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getMenuItem, getMenuItems, getRelatedItems, formatPrice } from "@/lib/api";
import AddToCartPanel from "@/components/AddToCartPanel";
import MenuCard from "@/components/MenuCard";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const items = await getMenuItems();
  return items.map((i) => ({ id: String(i.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getMenuItem(Number(id));
  return item ? { title: `${item.name} | Rosoi`, description: item.description } : { title: "Dish not found | Rosoi" };
}

export default async function DishPage({ params }: Props) {
  const { id } = await params;
  const item = await getMenuItem(Number(id));
  if (!item) notFound();

  const [categories, related] = await Promise.all([getCategories(), getRelatedItems(item, 4)]);
  const categoryName = categories.find((c) => c.id === item.category)?.name ?? item.category;

  return (
    <div className="container-x py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-lime">Home</Link> /{" "}
        <Link href="/menu" className="hover:text-lime">Menu</Link> /{" "}
        <span className="text-fg">{item.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-line">
          <Image
            src={item.image.replace("w=800", "w=1200")}
            alt={item.name}
            fill
            priority
            sizes="(min-width:768px) 36rem, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="eyebrow">{categoryName}</p>
          <h1 className="mt-2 text-4xl font-bold">{item.name}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-surface-2 px-3 py-1 font-semibold text-brand">★ {item.rating.toFixed(1)}</span>
            <span className={`flex items-center gap-2 rounded-full border px-3 py-1 ${item.veg ? "border-lime text-lime" : "border-red-500 text-red-400"}`}>
              <span className={`h-2 w-2 rounded-full ${item.veg ? "bg-lime" : "bg-red-500"}`} />
              {item.veg ? "Vegetarian" : "Non-vegetarian"}
            </span>
            {item.popular && <span className="rounded-full bg-brand px-3 py-1 font-semibold text-bg">Popular</span>}
          </div>

          <p className="mt-6 text-3xl font-bold text-brand">{formatPrice(item.price)}</p>
          <p className="mt-4 max-w-prose text-muted">{item.description}</p>

          <ul className="mt-6 grid max-w-sm grid-cols-2 gap-3 text-sm text-muted">
            <li>⏱ Ready in ~20 min</li>
            <li>🔥 Freshly cooked</li>
            <li>🚚 Free delivery over ₹500</li>
            <li>♻ Eco packaging</li>
          </ul>

          <AddToCartPanel item={item} />
        </div>
      </div>

      <section className="mt-20">
        <h2 className="mb-6 text-2xl font-bold">You may also like</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((i) => (
            <MenuCard key={i.id} item={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
