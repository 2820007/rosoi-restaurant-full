export type Category = { id: string; name: string };

export type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  veg: boolean;
  popular: boolean;
  description: string;
  image: string;
};

export type Restaurant = {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
};

export type CartLine = { item: MenuItem; qty: number };
