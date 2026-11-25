import Image from "next/image";
import Link from "next/link";
import { getMenuItems, getPopularItems, getRestaurant, formatPrice } from "@/lib/api";
import MenuCard from "@/components/MenuCard";

export default async function Home() {
  const [restaurant, popular, items] = await Promise.all([
    getRestaurant(),
    getPopularItems(4),
    getMenuItems(),
  ]);
  const special = items.filter((i) => ["mains", "starters"].includes(i.category)).slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-x grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="eyebrow">Get 10% discount</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{restaurant.tagline}</h1>
            <p className="mt-5 max-w-md text-muted">
              Fresh ingredients, bold flavours and traditional recipes, served hot at your table or delivered to your
              door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/menu" className="btn-brand">
                Order now
              </Link>
              <Link href="/#about" className="btn-ghost">
                Our story
              </Link>
            </div>
            <dl className="mt-10 flex gap-8 text-sm">
              <div>
                <dt className="text-muted">Dishes</dt>
                <dd className="text-2xl font-bold">{items.length}+</dd>
              </div>
              <div>
                <dt className="text-muted">Avg. rating</dt>
                <dd className="text-2xl font-bold text-brand">4.7★</dd>
              </div>
              <div>
                <dt className="text-muted">Delivery</dt>
                <dd className="text-2xl font-bold text-lime">30 min</dd>
              </div>
            </dl>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="glow absolute inset-[-15%]" />
            <div className="float relative h-full w-full overflow-hidden rounded-full border-4 border-line shadow-2xl shadow-lime/10">
              <Image
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80"
                alt="Signature bowl"
                fill
                priority
                sizes="(min-width:768px) 28rem, 90vw"
                className="object-cover"
              />
            </div>
            <span className="absolute right-2 top-6 rounded-full bg-brand px-4 py-2 text-sm font-bold text-bg">
              Fresh today
            </span>
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="container-x py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Customer favourites</p>
            <h2 className="mt-2 text-3xl font-bold">Popular dishes</h2>
          </div>
          <Link href="/menu" className="text-sm text-lime hover:underline">
            View full menu →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((i) => (
            <MenuCard key={i.id} item={i} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="container-x grid scroll-mt-20 items-center gap-10 py-14 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=80"
            alt="Restaurant interior"
            fill
            sizes="(min-width:768px) 36rem, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow">About us</p>
          <h2 className="mt-2 text-3xl font-bold">A sophisticated and traditional cuisine</h2>
          <p className="mt-4 text-muted">
            For over a decade our chefs have blended time-honoured recipes with modern technique. Every plate is made
            to order from locally sourced produce.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Locally sourced, fresh ingredients",
              "Cooked to order by experienced chefs",
              "Dine-in, takeaway and home delivery",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="text-lime">✔</span>
                {t}
              </li>
            ))}
          </ul>
          <Link href="/menu" className="btn-brand mt-8">
            Explore the menu
          </Link>
        </div>
      </section>

      {/* SPECIAL MENU */}
      <section className="container-x py-14">
        <div className="mb-8 text-center">
          <p className="eyebrow">Chef&apos;s picks</p>
          <h2 className="mt-2 text-3xl font-bold">Our special menu</h2>
        </div>
        <ul className="mx-auto grid max-w-4xl gap-x-12 gap-y-5 md:grid-cols-2">
          {special.map((i) => (
            <li key={i.id} className="flex items-baseline gap-3 border-b border-dashed border-line pb-3">
              <div className="min-w-0">
                <p className="font-semibold">{i.name}</p>
                <p className="truncate text-sm text-muted">{i.description}</p>
              </div>
              <span className="ml-auto font-bold text-brand">{formatPrice(i.price)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="container-x py-10">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 text-center sm:p-14">
          <div className="glow absolute inset-0" />
          <h2 className="relative text-3xl font-bold sm:text-4xl">Double the fun on every lunch item</h2>
          <p className="relative mx-auto mt-3 max-w-lg text-muted">
            Order online and get your food hot and fresh in about 30 minutes.
          </p>
          <Link href="/menu" className="btn-brand relative mt-7">
            Order now
          </Link>
        </div>
      </section>
    </>
  );
}
