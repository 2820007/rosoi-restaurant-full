# Rosoi – Restaurant website (Next.js)

## Run locally
Requires Node.js 20+ (https://nodejs.org).

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build
```bash
npm run build
npm start
```

## Structure
- `data/menu.json` – dummy restaurant, categories and dishes
- `lib/api.ts` – data layer (replace the bodies with `fetch()` calls when your backend is ready)
- `lib/cart-context.tsx` – cart state (saved in localStorage)
- `app/` – pages: `/`, `/menu`, `/menu/[id]`, `/cart`
- `components/` – Navbar, Footer, MenuCard, MenuBrowser, Stepper, AddToCartPanel
