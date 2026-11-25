import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <p className="text-6xl">🍽️</p>
      <h1 className="mt-4 text-3xl font-bold">Dish not found</h1>
      <p className="mt-2 text-muted">This dish isn&apos;t on our menu (anymore).</p>
      <Link href="/menu" className="btn-brand mt-8">
        Back to menu
      </Link>
    </div>
  );
}
