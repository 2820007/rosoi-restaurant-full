import Link from "next/link";
import type { Restaurant } from "@/lib/types";

export default function Footer({ restaurant }: { restaurant: Restaurant }) {
  return (
    <footer id="contact" className="mt-24 border-t border-line bg-surface">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="text-xl font-bold">{restaurant.name}</p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Traditional recipes, fresh ingredients and a modern dining experience.
          </p>
        </div>
        <div>
          <p className="eyebrow">Quick links</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link className="hover:text-lime" href="/">Home</Link></li>
            <li><Link className="hover:text-lime" href="/menu">Menu</Link></li>
            <li><Link className="hover:text-lime" href="/cart">Cart</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Visit us</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>{restaurant.address}</li>
            <li>{restaurant.hours}</li>
            <li>{restaurant.phone}</li>
            <li>{restaurant.email}</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-line py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {restaurant.name}. All rights reserved.
      </p>
    </footer>
  );
}
