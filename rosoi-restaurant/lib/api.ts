/**
 * Data layer. Everything is async and returns plain objects, so when the real
 * backend is ready you only change the body of these functions (e.g. swap the
 * JSON import for `fetch(`${process.env.API_URL}/menu`)`). Pages don't change.
 */
import data from "@/data/menu.json";
import type { Category, MenuItem, Restaurant } from "./types";

export async function getRestaurant(): Promise<Restaurant> {
  return data.restaurant;
}

export async function getCategories(): Promise<Category[]> {
  return data.categories;
}

export async function getMenuItems(): Promise<MenuItem[]> {
  return data.items as MenuItem[];
}

export async function getMenuItem(id: number): Promise<MenuItem | undefined> {
  const items = await getMenuItems();
  return items.find((i) => i.id === id);
}

export async function getRelatedItems(item: MenuItem, limit = 4): Promise<MenuItem[]> {
  const items = await getMenuItems();
  const same = items.filter((i) => i.id !== item.id && i.category === item.category);
  const rest = items.filter((i) => i.id !== item.id && i.category !== item.category);
  return [...same, ...rest].slice(0, limit);
}

export async function getPopularItems(limit = 4): Promise<MenuItem[]> {
  const items = await getMenuItems();
  return items.filter((i) => i.popular).slice(0, limit);
}

export const DELIVERY_FEE = 40;
export const TAX_RATE = 0.05;

export const formatPrice = (n: number) => `₹${n.toFixed(0)}`;
