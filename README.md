# Rentivo

**Live URL:** [https://rentivo-liart.vercel.app](https://rentivo-liart.vercel.app)

## Purpose

Rentivo is an equipment rental marketplace that connects equipment owners with people who need the right tools for their projects. It makes finding, renting, and managing equipment simple and accessible — owners list their equipment, customers browse and book it for specific dates, and admins oversee the whole platform.

## Key Features

- **Role-based access** — three roles: `customer`, `owner`, and `admin`, each with its own dashboard
- **Authentication** — email/password sign-up and sign-in plus Google social login (Better Auth with MongoDB adapter)
- **Equipment marketplace** — browse equipment by category, view details, and check availability
- **Favorites** — customers can save equipment to a favorites list
- **Booking with date picker** — choose rental dates and quantity before checkout
- **Secure online payments** — Stripe checkout with success/cancel pages and server-side payment verification
- **Owner dashboard** — add, edit, and delete equipment (with image uploads to ImgBB), track rentals, and view earnings statistics
- **Customer dashboard** — manage bookings/rentals, favorites, and profile
- **Admin dashboard** — manage users, view all equipment, and oversee all rentals with status/payment updates
- **Marketing pages** — home (hero, featured equipment, categories, how-it-works, reviews, CTA), about, contact
- **Modern UI** — Tailwind CSS v4, shadcn/ui (Base UI), Framer Motion animations, carousels, toasts, and skeleton loading states

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, React Compiler) with React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4, `tw-animate-css`
- **Auth:** Better Auth + `@better-auth/mongo-adapter`, MongoDB
- **Payments:** Stripe (checkout sessions)
- **Deployment:** Vercel

## npm Packages Used

### Dependencies

| Package | Purpose |
| --- | --- |
| `next` | React framework (App Router) |
| `react` / `react-dom` | UI library |
| `better-auth` | Authentication (email/password + Google) |
| `@better-auth/mongo-adapter` | MongoDB adapter for Better Auth |
| `mongodb` | MongoDB driver |
| `@base-ui/react` | Headless UI primitives (shadcn/ui base-nova style) |
| `class-variance-authority` | Component variant utilities |
| `cn` | Class name utility |
| `lucide-react` | Icon set |
| `react-icons` | Additional icons |
| `framer-motion` | Animations |
| `embla-carousel-react` | Carousels |
| `react-day-picker` | Date range picker for bookings |
| `date-fns` | Date formatting/manipulation |
| `react-toastify` | Toast notifications |
| `shadcn` | shadcn/ui component tooling |
| `tw-animate-css` | Tailwind animation utilities |

### Dev Dependencies

| Package | Purpose |
| --- | --- |
| `tailwindcss` + `@tailwindcss/turbopack` | Tailwind CSS v4 with Turbopack loader |
| `typescript` | Type checking |
| `eslint` + `eslint-config-next` | Linting |
| `babel-plugin-react-compiler` | React Compiler |
| `@types/node`, `@types/react`, `@types/react-dom` | Type definitions |

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Required environment variables (see `.env.example` / `.env`):

```bash
BETTER_AUTH_SECRET=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=        # backend API base URL
MONGO_DB_URL=                    # MongoDB connection string
NEXT_PUBLIC_IMGBB_API_KEY=       # image uploads
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Available Scripts

```bash
npm run dev    # start dev server
npm run build  # production build (also typechecks)
npm run start  # serve production build
npm run lint   # run ESLint
```
