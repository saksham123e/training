# Project Report

## Architecture

- Next.js 16 App Router is used for pages, layouts, and route handlers.
- Server Components query the database only through the server data layer in `lib/foods.ts`.
- Client Components do not import Prisma. They communicate with the backend through `/api/foods` route handlers.
- Prisma 7 uses the `prisma-client` generator with an explicit output path at `lib/generated/prisma`.
- Prisma Client is constructed with the official PostgreSQL driver adapter, `@prisma/adapter-pg`.
- PostgreSQL configuration is read from `DATABASE_URL` through `prisma.config.ts`.
- Prisma access is guarded with `server-only` in `lib/prisma.ts`, `lib/foods.ts`, and `lib/food-input.ts`.
- Database-backed UI routes use `connection()` so they render on demand instead of baking stale database rows into the build.
- The dev script uses the supported webpack dev server because this machine hit an OS file-watch limit with Turbopack in development. Production build still uses Next.js 16's build pipeline successfully.

## Folder Structure

```text
app/
  admin/
    add-food/page.tsx
    page.tsx
  api/
    foods/
      [id]/route.ts
      route.ts
  menu/
    [id]/page.tsx
    error.tsx
    page.tsx
  about/page.tsx
  contact/page.tsx
  layout.tsx
  not-found.tsx
  page.tsx
components/
  CategoryCard.tsx
  DeleteFoodButton.tsx
  FoodCard.tsx
  Footer.tsx
  Hero.tsx
  MenuBrowser.tsx
  navbar.tsx
lib/
  categories.ts
  food-input.ts
  foods.ts
  generated/prisma/
  prisma.ts
prisma/
  migrations/
  schema.prisma
  seed.ts
```

## Features Completed

- Home page reads featured foods from PostgreSQL through Prisma.
- Menu page uses a Client Component that fetches foods from `/api/foods`.
- Category filtering via `/menu?category=...` works after hydration.
- Food detail route `/menu/[id]` reads one food from PostgreSQL on the server.
- Admin dashboard reads foods from PostgreSQL on the server.
- Admin add page creates foods through `/api/foods`.
- Delete button removes foods through `/api/foods/[id]`.
- API supports full CRUD:
  - `POST /api/foods`
  - `GET /api/foods`
  - `GET /api/foods/[id]`
  - `PUT /api/foods/[id]`
  - `PATCH /api/foods/[id]`
  - `DELETE /api/foods/[id]`
- Prisma 7 client generation succeeds.
- PostgreSQL migration status is up to date.
- Seed script runs successfully and uses valid remote image URLs.
- Remote images from `images.unsplash.com` are allowed through `next.config.ts`.
- Duplicate, empty, and copied learning files were removed.

## Remaining Features

- Add authentication and authorization before using the admin pages in production.
- Add an admin edit UI if product editing should be exposed in the browser. The update API is already implemented.
- Add automated integration tests for route handlers and browser workflows.
- Replace placeholder About and Contact pages with real content.

## Files Modified

- `app/admin/add-food/page.tsx`
- `app/admin/page.tsx`
- `app/api/foods/[id]/route.ts`
- `app/api/foods/route.ts`
- `app/layout.tsx`
- `app/menu/[id]/page.tsx`
- `app/menu/page.tsx`
- `app/page.tsx`
- `components/CategoryCard.tsx`
- `components/FoodCard.tsx`
- `components/Hero.tsx`
- `components/MenuBrowser.tsx`
- `lib/food-input.ts`
- `lib/foods.ts`
- `lib/prisma.ts`
- `next.config.ts`
- `package-lock.json`
- `package.json`
- `prisma.config.ts`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `tsconfig.json`
- `PROJECT_REPORT.md`

## Files Removed

- `app/add-food/page.tsx`
- `app/api/food.jsx`
- `components/Counter.tsx`
- `components/Header.tsx`
- `data/foods.ts`
- `public/file.svg`
- `public/globe.svg`
- `public/next.svg`
- `public/vercel.svg`
- `public/window.svg`

## Dependencies Added

- `@prisma/adapter-pg`
- `dotenv`
- `pg`
- `server-only`
- `@types/pg`

## Verification

- `npx prisma generate`: passed.
- `npx prisma validate`: passed.
- `npx prisma migrate status`: database schema is up to date.
- `npx prisma db seed`: passed.
- Direct Prisma query against PostgreSQL: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- Dev server started at `http://127.0.0.1:3000`.
- HTTP route checks passed for:
  - `/`
  - `/menu`
  - `/menu/[id]`
  - `/admin`
  - `/admin/add-food`
  - `/api/foods`
  - `/api/foods/[id]`
- Headless Chrome smoke test confirmed `/menu?category=pizza` hydrates, fetches `/api/foods`, and renders `Margherita Pizza`.
- CRUD verification through API passed:
  - create returned `201`
  - read returned `200`
  - patch returned `200`
  - put returned `200`
  - delete returned `200`
  - read after delete returned `404`

## Summary Of Fixes

- Replaced the old Prisma Client setup with Prisma 7's generated-client output and PostgreSQL adapter.
- Centralized Prisma queries in a server-only data access layer.
- Replaced static copied food data with database-backed reads.
- Split the menu into a server route shell and a client browser component.
- Fixed `/menu/[id]` so it is a real food details page instead of a copied menu listing.
- Cleaned API route handlers and added validation plus update support.
- Removed broken duplicate routes, empty API files, unused starter assets, and copied demo components.
- Fixed layout duplication by rendering one navbar and one footer.
- Switched seed images and hero image to valid remote URLs and configured Next image allowlisting.
- Ensured all Prisma code stays on the server and all client mutations go through API routes.
