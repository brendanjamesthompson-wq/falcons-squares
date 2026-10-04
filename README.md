# Falcons Squares

A responsive football-squares fundraising app for the Niagara Falls Falcons 13U AAA 2027 team.

## Included in V1

- Public, view-only 10x10 board
- Falcons logo and red / black / white branding
- Multiple fundraiser boards
- Buyer + selling player on every square
- Paid / unpaid tracking
- Sold / available totals
- Configurable price and Q1 / halftime / Q3 / final payouts
- Randomize 0-9 numbers independently for both teams
- Lock numbers once drawn
- Quarter/final score entry and automatic winner highlighting
- Reusable 2027 player roster
- Magic-link admin authentication for `brendanjamesthompson@gmail.com`
- Supabase Row Level Security so only the admin email can modify data
- Vercel-ready Next.js application

## Local preview

The app intentionally falls back to a demo board until Supabase environment variables are supplied.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a Supabase project.
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. In **Authentication > URL Configuration**, add your production Vercel URL and callback URL:
   - `https://YOUR-DOMAIN/auth/callback`
4. Copy `.env.example` to `.env.local` and fill in:

```text
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=brendanjamesthompson@gmail.com
```

Do not place a Supabase service-role key in this app. V1 uses the public anon key plus Row Level Security.

## Vercel deployment

1. Push this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Add the same environment variables in Vercel Project Settings.
4. Deploy.
5. Add the final Vercel domain to Supabase Authentication URL Configuration.

## Data structure

- `players`: Falcons roster / sellers
- `boards`: game information, payouts, randomized axes, scores, status
- `squares`: the 100 squares for each board, buyer, seller, payment status, notes

## Recommended next enhancements

- CSV/Excel export
- QR code for each public board
- Search/filter by buyer or player
- Self-service reservation workflow with admin approval
- Per-player fundraising totals dashboard
- Optional NFL team logos
