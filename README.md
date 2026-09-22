# Adorsi Coffee

A Next.js clone of the Adorsi Specialty Coffee website, built for a web development assessment.

The project includes the main website, menu, shop, cart, checkout, Chapa test payments, and a simple Barista AI interaction.

## Live Demo

**Deployed website:**  
`https://your-vercel-url.vercel.app`

Replace the link above with your actual Vercel production URL after deploy.

The deployed version is the recommended way to review the project.

## Features

- Responsive Adorsi Coffee website
- Home page with responsive sections
- Menu with 126 products
- Search, category, tag, price, and sorting filters
- Shop page with coffee products
- Shopping cart
- Manual payment with receipt upload
- Chapa online payment using test mode
- Barista AI dialogue with mood and quick-question options
- Responsive desktop and mobile design
- PostgreSQL database for the deployed application

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- SQLite for local development
- Chapa
- Vercel

## Running Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/Sefukamil20R/Adorsi-Coffee-Clone.git
cd Adorsi-Coffee-Clone
npm install
```

Copy the example environment file and add your Chapa test keys if you want to try online payment:

```bash
cp .env.example .env
```

Set up the local database and seed the menu:

```bash
npx prisma db push
npx prisma db seed
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Local development uses SQLite (`DATABASE_URL="file:./dev.db"` in `.env`). The live site on Vercel uses PostgreSQL (Neon) with the same app.

## Notes

- Use `npm run dev` for local development (webpack).
- Chapa is configured for **test mode** only.
- Menu data comes from the seeded database, not hardcoded in the UI.
