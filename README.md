# AasaMedChem Inventory and Quotation System

A small inventory, pricing, and quotation management system built for the AasaMedChem hackathon assignment.

The app lets admins manage pharmaceutical products and lets sellers browse products, calculate prices with unit conversion, and place quotations. Admins can review submitted quotations, inspect entered quantities versus internal base quantities, and approve, reject, or complete quotations.

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL, intended for Neon
- bcrypt password hashing
- JWT session cookie authentication
- decimal.js for decimal-safe calculations

## Main Features

- Login, logout, and registration flows.
- Role-based access for `ADMIN`, `SELLER`, and `BUYER`.
- Admin dashboard with product and quotation management.
- Seller/user dashboard with product catalog and quotation flow.
- Product CRUD for admins.
- Product search and category filtering.
- Flexible unit entry for quotations.
- INR price display across products and quotations.
- Decimal-safe unit conversion and pricing.

## Roles

### Admin

Admins can:

- Create, update, and delete products.
- Configure product base unit, stock quantity, and price per base unit.
- View all quotations.
- Open quotation details with product, SKU, entered quantity, entered unit, converted base quantity, base unit, unit price, and total price.
- Approve, reject, or mark quotations as completed.

### Seller/User

Sellers can:

- Browse and filter the product catalog.
- Enter quantity in supported units.
- See converted base quantity and total INR price.
- Create quotations for customers.
- View their own quotation history and quotation details.

### Buyer

The schema supports `BUYER` as an extra user-facing role. It is routed through the same browsing and quotation area as seller/user.

## Folder Structure

```txt
app/
  api/
    auth/                  Login, register, logout API routes
    quotations/[id]/       Admin quotation detail API route
  admin/                   Admin dashboard, products, quotations
  login/                   Login page
  logout/                  Auto logout page
  products/                Product catalog/search page
  quotations/              Seller quotation list/detail/new quotation flow
  register/                Registration page
  seller/                  Seller dashboard
components/                Reusable UI and client components
actions/                   Server actions for quotations and inventory
lib/                       Auth, guards, Prisma, pricing, units, route helpers
prisma/                    Prisma schema, migrations, seed data
types/                     Shared TypeScript types
validations/               Zod validation schemas
```

## Important Files

- `prisma/schema.prisma`: Database models, enums, and decimal column definitions.
- `lib/units.ts`: Unit dimensions, base unit strategy, and conversion helpers.
- `lib/pricing.ts`: INR formatting and quote price calculation.
- `lib/auth.ts`: Password hashing, JWT creation, cookie helpers, and `getCurrentUser()`.
- `lib/guards.ts`: Server-side route guards.
- `middleware.ts`: Edge-compatible JWT verification and route protection.
- `components/QuotationPlacement.tsx`: Product, quantity, unit selection, cart, and quote placement UI.
- `components/ProductCard.tsx`: Catalog pricing calculator.
- `actions/quotationActions.ts`: Quotation create/read/update logic with authorization checks.

## Database Design

### Key tables

- `User`
  - `id String @id @default(uuid())`
  - `email String @unique`
  - `password String`
  - `role UserRole`

- `Product`
  - `id String @id @default(uuid())`
  - `name String`
  - `sku String @unique`
  - `category String?`
  - `description String?`
  - `baseUnit ProductUnit`
  - `baseQuantity Decimal @db.Decimal(18, 4)`
  - `price Decimal @db.Decimal(18, 4)`

- `Quotation`
  - `customer String`
  - `status DocumentStatus`
  - `totalAmount Decimal @db.Decimal(18, 4)`
  - `userId String?`

- `QuotationItem`
  - `quantity Decimal @db.Decimal(18, 4)`: quantity entered by the seller
  - `unit ProductUnit`: unit entered by the seller
  - `baseQuantity Decimal @db.Decimal(18, 4)`: converted internal quantity
  - `baseUnit ProductUnit`: product internal unit
  - `unitPrice Decimal @db.Decimal(18, 4)`: price per base unit
  - `totalPrice Decimal @db.Decimal(18, 4)`

`Decimal(18, 4)` was chosen to avoid floating-point errors and support large values with four decimal places. Calculations use `decimal.js` in application code.

## Unit Storage and Conversion Strategy

Quantities are stored internally in base units:

- Weight: `G`
- Volume: `ML`
- Count: `UNIT`

Supported entered units:

- `G`
- `KG`
- `ML`
- `L`
- `UNIT`

Conversion factors:

- `1 KG = 1000 G`
- `1 G = 1 G`
- `1 L = 1000 ML`
- `1 ML = 1 ML`
- `1 UNIT = 1 UNIT`

Invalid cross-dimension conversions are rejected. For example, `KG` cannot be converted to `ML`.

Conversions happen in:

- `lib/units.ts`: dimension checks and base-unit conversion.
- `lib/pricing.ts`: converts entered quantity to base quantity and calculates total price.
- `components/ProductCard.tsx`: displays catalog calculation.
- `components/QuotationPlacement.tsx`: calculates quotation item totals before saving.

## Pricing Strategy

`Product.price` stores price per internal base unit.

Example:

- Product base unit: `G`
- Price: `150`
- Seller enters: `2 KG`
- Converted base quantity: `2000 G`
- Total price: `2000 * 150`

All prices and totals are displayed using INR formatting from `formatINR()` in `lib/pricing.ts`.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/dbname?sslmode=require"
JWT_SECRET="replace-with-a-secure-secret"
```

3. Run migrations:

```bash
npx prisma migrate dev
```

4. Seed test data:

```bash
npm run seed
```

5. Start the app:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Test Credentials

Seeded credentials:

- Admin: `admin@aasamedchem.test` / `Admin1234!`
- Admin: `suraj@gmail.com` / `11111111`
- Seller: `seller@aasamedchem.test` / `Seller1234!`

## How to Use

### Admin flow

1. Log in as admin.
2. Go to `/admin`.
3. Use Products to create/edit/delete inventory.
4. Use Quotations to review incoming quotations.
5. Open a quotation to verify entered quantity, entered unit, converted base quantity, price, and total.
6. Approve, reject, or complete the quotation.

### Seller flow

1. Log in as seller.
2. Go to `/seller`.
3. Browse products from the dashboard or `/products`.
4. Use quantity and unit controls to check converted quantity and INR price.
5. Go to `/quotations/new`.
6. Select product, enter quantity, select unit, add items to cart, and place the quotation.
7. View submitted quotations under `/quotations`.

## Deployment on Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Add environment variables in Vercel:
   - `DATABASE_URL`
   - `JWT_SECRET`
4. Run Prisma migrations against the Neon database.
5. Deploy.

## Verification Commands

```bash
npm run lint
npx tsc --noEmit
npm run build
```

