# FreshPhool API

TypeScript Express server with Prisma and PostgreSQL for the FreshPhool storefront: members, catalog, checkout, recurring puja packs, and ops.

## Run locally

1. Copy env and start Postgres:

```bash
cd server
cp .env.example .env
docker compose up -d
npm install
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

API: `http://localhost:4000/api/health`

## Auth

| Method | Path | Who |
| --- | --- | --- |
| POST | `/api/auth/register` | Member signup `{ email, password, name, phone }` |
| POST | `/api/auth/login` | Member or admin `{ email, password }` |
| GET | `/api/auth/me` | Bearer token |

Admin seed: `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`.

## Catalog

- `GET /api/catalog/products`
- `GET /api/catalog/zones`
- `GET /api/catalog/zones/:pincode`

## Orders

Send `Authorization: Bearer <accessToken>`.

- `POST /api/orders/checkout` — `{ community, block_flat, items[], notes? }`
- `GET /api/orders/me`
- `GET /api/orders/:orderNumber`

Checkout creates a pending order, a Razorpay stub payment, and recurring rows for daily/weekly/monthly lines.

## Ops

Admin token required.

- `GET /api/admin/board`
- `PATCH /api/admin/orders/:id` — `{ status: "Payment Received" }` (also accepts enum values)
- `PATCH /api/admin/recurring/:id` — `{ status, qty }`
- `GET /api/admin/export?dataset=orders&from=2026-09-01&to=2026-09-16`

Confirming payment marks related subscriptions `active`.
