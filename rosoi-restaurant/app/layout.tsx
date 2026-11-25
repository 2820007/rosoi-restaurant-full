import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getRestaurant } from "@/lib/api";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rosoi | Restaurant",
  description: "Delicious food, traditional cuisine and a modern dining experience.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const restaurant = await getRestaurant();
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Navbar name={restaurant.name} />
          <main className="flex-1">{children}</main>
          <Footer restaurant={restaurant} />
        </CartProvider>
      </body>
    </html>
  );
}
