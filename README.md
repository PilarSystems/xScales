# xScales — skeleton

Local run & build

1. Install dependencies:

```powershell
npm install
```

2. Start dev server:

```powershell
npm run dev
```

3. Build for production (this is what Vercel runs):

```powershell
npm run build
```

4. Start built app locally:

```powershell
npm run start
```

Environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `STRIPE_SECRET_KEY` (server only)
- `STRIPE_WEBHOOK_SECRET` (server only)
- `NEXT_PUBLIC_APP_URL` (e.g. `http://localhost:3000`)
- `NEXT_PUBLIC_PRICE_STARTER`, `NEXT_PUBLIC_PRICE_HUSTLER`, `NEXT_PUBLIC_PRICE_ELITE`

Stripe test product creation

If you want the repository to create Stripe test prices for you, set `STRIPE_SECRET_KEY` and run:

```powershell
node scripts/create-stripe-prices.js
```

This will print created product and price IDs — copy them into your `.env.local` as `NEXT_PUBLIC_PRICE_*`.

Notes
- Auth is implemented using Supabase and `@supabase/auth-helpers-nextjs`. The `/app` route is protected by middleware and requires a valid Supabase auth session.
- Theme persistence uses `next-themes` in client components; animations use `framer-motion` in client components.
