# ShopEase Backend (Mock Data Store)

This is intentionally a **thin data layer**, not a real backend — the point of this project is to
demonstrate frontend engineering (React, Redux Toolkit, routing, pagination, lazy loading). It uses
[`json-server`](https://github.com/typicode/json-server) to turn `db.json` into a REST API instantly.

> ⚠️ There is no real authentication/hashing here — passwords are stored in plain text in `db.json`
> purely so the frontend has something to check against. Do not reuse this pattern in production.

## Run it

```bash
cd backend
npm install
npm start        # serves http://localhost:3000
```

## Endpoints

| Method | Endpoint                         | Description                                  |
|--------|-----------------------------------|-----------------------------------------------|
| GET    | `/products`                       | list products                                 |
| GET    | `/products?_page=1&_limit=8`      | **paginated** list (response has `X-Total-Count` header) |
| GET    | `/products?category=electronics`  | filter by category                            |
| GET    | `/products?title_like=shoe`       | search by title                               |
| GET    | `/products/:id`                   | single product                                |
| POST   | `/products`                       | create product (admin)                        |
| PUT    | `/products/:id`                   | update product (admin)                        |
| DELETE | `/products/:id`                   | delete product (admin)                        |
| GET    | `/users?email=..&password=..`     | "login" lookup                                |
| POST   | `/users`                          | register                                      |
| PUT    | `/users/:id`                      | update profile                                |
| GET    | `/cart?userId=..`                 | fetch a user's cart                           |
| POST   | `/cart`                           | add cart record                               |
| PUT    | `/cart/:id`                       | update cart record                            |
| DELETE | `/cart/:id`                       | delete cart record                            |
| GET    | `/reviews?productId=..`           | fetch reviews for a product                   |
| POST   | `/reviews`                        | submit a review                               |
| GET    | `/orders?userId=..`               | fetch a user's order history                  |
| POST   | `/orders`                         | place an order (checkout)                     |

Pagination and filtering above are all native `json-server` query params — no custom code needed.
