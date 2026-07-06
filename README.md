# 🛒 ShopEase — Full-Stack E-Commerce Platform

A React + Redux Toolkit e-commerce app, built to showcase **frontend engineering** for internship
applications. The backend is intentionally minimal — a `json-server` data store — since the goal is
to demonstrate React/Redux depth, not backend architecture.

## Stack

- **Frontend:** React 19, Redux Toolkit (slices + `createAsyncThunk`), React Router v7 (with
  route-level code splitting via `React.lazy`/`Suspense`), React Hook Form, Tailwind CSS, Axios.
- **Backend:** `json-server` — a REST API over `db.json`, used pu# 🛒 ShopEase — Full-Stack E-Commerce Platform
 
A full-featured e-commerce web app built with **React 19 + Redux Toolkit**, focused on demonstrating
frontend engineering depth — state management, routing, pagination, auth, and admin CRUD — for
internship applications.
 
**🔗 Live Demo:** [https://shopease-beige-pi.vercel.app](https://shopease-beige-pi.vercel.app)
**🔗 Backend API:** [https://shopease-backend-8ucj.onrender.com](https://shopease-backend-8ucj.onrender.com)
**📂 Repo:** [github.com/Akshat2921/shopease](https://github.com/Akshat2921/shopease)
 
---
 
## ✨ Features
 
- 🛍️ **Product catalog** — 10 categories, 51 seed products, pagination, category filter, price/rating sort, debounced search
- 📄 **Product details** — quantity selector, related products, customer reviews (read + submit)
- ❤️ **Wishlist** — persisted in `localStorage`, dedicated `/wishlist` page
- 🛒 **Cart → Checkout → Order Confirmation → Order History**
- 🔔 **Toast notifications** (`react-toastify`) instead of `alert()`
- 🔐 **Auth** — register/login, protected routes, admin-only routes
- 🛠️ **Admin Dashboard** — full CRUD on products, discount/stock fields, live image preview
- 📱 **Responsive UI** — mobile hamburger nav, category tiles, footer
- ⚡ **Performance** — route-level code-splitting (`React.lazy`/`Suspense`), native lazy-loaded images
---
 
## 🧰 Tech Stack
 
| Layer    | Tech |
|----------|------|
| Frontend | React 19, Redux Toolkit, React Router v7, React Hook Form, Tailwind CSS, Axios |
| Backend  | `json-server` (REST API mock over `db.json`) |
 
> The backend is intentionally a thin `json-server` data layer — the goal of this project is to
> showcase React/Redux architecture, not backend engineering.
 
---
 
## 🚀 Run Locally
 
```bash
# clone the repo
git clone https://github.com/Akshat2921/shopease.git
cd shopease
 
# Terminal 1 — backend (data store)
cd backend
npm install
npm start          # http://localhost:3000
 
# Terminal 2 — frontend
cd Frontend
npm install
npm run dev         # http://localhost:5173
```
 
### Demo accounts (seeded in `backend/db.json`)
| Role  | Email | Password |
|-------|-------|----------|
| Admin | `admin@shop.com` | `admin123` |
| User  | `john@doe.com` | `john1234` |
 
---
 
## 📡 API Endpoints
 
| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/products` | list products |
| GET | `/products?_page=1&_limit=8` | paginated list (`X-Total-Count` header) |
| GET | `/products?category=electronics` | filter by category |
| GET | `/products?title_like=shoe` | search by title |
| GET | `/products/:id` | single product |
| POST/PUT/DELETE | `/products/:id` | admin product CRUD |
| GET | `/users?email=..&password=..` | login lookup |
| POST | `/users` | register |
| PUT | `/users/:id` | update profile |
| GET/POST/PUT/DELETE | `/cart` | cart records |
| GET/POST | `/reviews` | product reviews |
| GET/POST | `/orders` | order history / checkout |
 
---
 
## 📁 Project Structure
 
```
shopease/
├── Frontend/          # React + Vite app
│   └── src/
│       ├── pages/     # route pages (Home, Products, Cart, Checkout, admin/, user/)
│       ├── store/      # Redux Toolkit slices
│       ├── components/
│       └── routes/
└── backend/            # json-server mock API (db.json)
```
 
---
 
## 📝 Notes / Honest Caveats
 
- Auth is a plain-text lookup against `json-server` — fine for a portfolio demo, **not**
  production-grade auth.
- Cart state lives in Redux + `localStorage` (not synced to the backend `cart` collection) to keep
  the checkout flow simple.
---
 
## 👤 Author
 
**Akshat Jain** — [GitHub](https://github.com/Akshat2921) · [LinkedIn](https://www.linkedin.com/in/akshat-jain-23b7bb351/)rely as a data store.

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
