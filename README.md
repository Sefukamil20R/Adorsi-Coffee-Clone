# Adorsi Coffee

Single Next.js application: storefront, menu API, cart, manual receipt checkout, Chapa online pay, and Barista AI.

**For assessment review:** use the **deployed Vercel URL** — it is intended to behave the same as the developer’s local demo (full menu, filters, cart, payments).

---

## Deploy once (author checklist)

### Neon (database only)

1. [console.neon.tech](https://console.neon.tech) → create project.
2. Copy the **PostgreSQL connection string** (Connection details).  
   Ignore Neon CLI steps like `neon deploy` / `neon.ts` — this app uses **Vercel**, not Neon deploy.
3. If `prisma db push` fails during build, use Neon’s **direct** (non-pooler) connection string for `DATABASE_URL`.

### Vercel

1. Import this GitHub repository.
2. Vercel automatically runs **`npm run vercel-build`** (PostgreSQL schema, tables, menu seed, Next.js build).
3. Set **Environment variables** for **Production**:

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | Yes | Neon PostgreSQL URL |
| `CHAPA_SECRET_KEY` | Yes | Chapa **TEST** secret key |
| `NEXT_PUBLIC_CHAPA_PUBLIC_KEY` | Yes | Chapa **TEST** public key |
| `APP_URL` | No | Optional. If omitted, the app uses Vercel’s production URL for Chapa return/callback. After first deploy you may set `https://your-project.vercel.app` and redeploy. |

4. Deploy → open the production URL → confirm menu loads and cart works.

### Chapa (test mode)

Return and callback URLs are built from the site URL, for example:

- `https://<your-vercel-domain>/payment/chapa/return`
- `https://<your-vercel-domain>/api/payment/chapa/callback`

---

## Local development (optional, for authors)

```bash
npm install
cp .env.example .env
npx prisma db push
npx prisma db seed
npm run dev
```

Local uses SQLite (`DATABASE_URL="file:./dev.db"`). Production on Vercel uses PostgreSQL with the same app code.
