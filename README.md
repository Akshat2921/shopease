# ShopEase — Full-Stack E-Commerce (Frontend-Heavy)

A React + Redux Toolkit e-commerce app, built to showcase **frontend engineering** for internship
applications. The backend is intentionally minimal — a `json-server` data store — since the goal is
to demonstrate React/Redux depth, not backend architecture.

## Stack

- **Frontend:** React 19, Redux Toolkit (slices + `createAsyncThunk`), React Router v7 (with
  route-level code splitting via `React.lazy`/`Suspense`), React Hook Form, Tailwind CSS, Axios.
- **Backend:** `json-server` — a REST API over `db.json`, used purely as a data store.

## Features

- Product catalog across **10 categories** (51 seed products) with **pagination**
  (`_page`/`_limit`, `X-Total-Count`), category filter, sort (price/rating), and debounced search —
  all via `json-server` query params.
- Product detail page with quantity selector, related products, and **customer reviews**
  (read + submit, persisted to the `reviews` collection).
- **Wishlist** (heart icon on every product card, persisted in `localStorage`) with a dedicated
  `/wishlist` page.
- Cart (add/remove/update qty, persisted in `localStorage`) → **Checkout** (shipping form) →
  order confirmation → **order history** (`/orders`, persisted to the `orders` collection).
- Discount badges, out-of-stock states, and a real image-fallback (no more broken image icons if a
  URL is missing or fails to load).
- Toast notifications (`react-toastify`) instead of `alert()` for add-to-cart, wishlist, checkout,
  and admin actions.
- Auth: register/login (checked against the `users` collection), protected routes, admin-only routes.
- Admin dashboard: create/update/delete products (full CRUD), including discount/stock fields and a
  live image preview in the product form.
- Responsive UI: mobile hamburger nav, category tiles on the homepage, footer.
- **Lazy loading** in two senses: route-level code-splitting (`React.lazy`) so each page ships as
  its own JS chunk, and native `loading="lazy"` on product images.
- User profile view/edit with quick links to orders and wishlist.

## Run locally

```bash
# Terminal 1 — backend (data store)
cd backend
npm install
npm start          # http://localhost:3000

# Terminal 2 — frontend
cd Frontend
npm install
npm run dev         # http://localhost:5173
```

Demo accounts (seeded in `backend/db.json`):
- Admin: `admin@shop.com` / `admin123`
- User: `john@doe.com` / `john1234`

## Notes / honest caveats

- Auth is a plain-text lookup against `json-server` — fine for a portfolio project, **not**
  production-grade auth. Worth saying so if asked in an interview.
- Styling uses **Tailwind CSS** (already set up in the original scaffold) rather than the
  `styled-components` library, to keep one consistent styling approach across the app instead of
  mixing two systems. Happy to swap to `styled-components` if you'd specifically rather show that
  on your resume — just say the word.
- Cart state lives in Redux + `localStorage` (not synced to the backend `cart` collection) to keep
  the checkout flow simple for a demo project.
