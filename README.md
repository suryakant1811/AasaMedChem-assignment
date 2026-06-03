# AasaMedChem Inventory and Quotation System

## My Intuition and Problem-Solving Approach

The assignment looked like a small inventory application at first, but the real challenge was not just creating CRUD pages. The important part was to design a system that can handle pharmaceutical sourcing correctly: different product units, accurate pricing, role-based access, and clear quotation review for admins.

My first thought was to keep the business rules simple and consistent. In pharma procurement, the same product can be requested in different units, for example grams or kilograms, milliliters or liters. If every screen calculates these values separately, the system can easily become incorrect. So I decided to centralize unit conversion and pricing logic in dedicated files instead of mixing it inside UI components.

The main design decision was to store product quantities internally in base units:

- Weight products are stored in `G`
- Volume products are stored in `ML`
- Count products are stored in `UNIT`

This makes all calculations predictable. If a seller enters `2 KG`, the system converts it to `2000 G` before calculating the quotation total. The quotation also stores both the entered unit and the converted base quantity, so the admin can verify what the seller entered and how the system calculated the price.

I also wanted the application to feel like a real business tool, not just an assignment demo. That is why I added role-based dashboards, protected routes, login/logout flow, product search/filtering, quotation status management, INR formatting, seed data, and documentation.

## Project Overview

AasaMedChem is a role-based inventory and quotation management system for pharmaceutical sourcing.

The app allows:

- Admins to manage products and review quotations.
- Sellers/users to browse products, calculate prices, and place quotations.
- The system to handle unit conversion and decimal-safe pricing consistently.

It is built for the AasaMedChem hackathon assignment using Next.js, Prisma, PostgreSQL, and Tailwind CSS.

## High-Level Architecture

```txt
Browser
  |
  v
Next.js App Router
  |
  |-- React pages and components
  |-- API routes
  |-- Server actions
  |-- Middleware and server guards
  |
  v
Prisma ORM
  |
  v
Neon PostgreSQL Database
```

The frontend is built with React components inside the Next.js App Router. Backend operations are handled with Next.js API routes and server actions. Prisma is used as the ORM layer to connect to PostgreSQL. The database connection is configured through environment variables.

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL, intended for Neon
- bcrypt for password hashing
- JWT stored in HTTP-only cookies
- Zod for input validation
- decimal.js for decimal-safe calculations

## Main Features

- Landing page with professional AasaMedChem positioning.
- Login, logout, and registration.
- Role-based access for `ADMIN`, `SELLER`, and `BUYER`.
- Admin dashboard.
- Seller/user dashboard.
- Product CRUD for admin.
- Product search and category filtering.
- Flexible unit selection while browsing or creating quotations.
- Decimal-safe unit conversion and pricing.
- INR price formatting.
- Quotation creation by sellers.
- Quotation review and status management by admin.

## Roles and Access

### Admin

Admins can:

- Access `/admin`.
- Create, update, and delete products.
- Configure base unit, stock quantity, and price per base unit.
- View all incoming quotations.
- Open quotation details.
- Verify entered quantity, entered unit, converted base quantity, unit price, and total price.
- Approve, reject, or complete quotations.

### Seller/User

Sellers can:

- Access `/seller`.
- Browse/search/filter the product catalogue.
- Check product pricing using different valid units.
- Create quotations for customers.
- View only their own quotations.

### Buyer

The schema also supports `BUYER`. In the current implementation, buyer is treated as a user-facing role and follows the same catalogue and quotation area as seller/user.

## Authentication and Authorization

Authentication is implemented using email and password.

Flow:

```txt
User submits login form
  -> API validates input with Zod
  -> Prisma finds user by email
  -> bcrypt compares password
  -> JWT is created
  -> JWT is stored in HTTP-only cookie
  -> User is redirected based on role
```

Important files:

- `app/api/auth/login/route.ts`
- `app/api/auth/register/route.ts`
- `app/api/auth/logout/route.ts`
- `lib/auth.ts`
- `middleware.ts`
- `lib/guards.ts`
- `lib/authRoutes.ts`

Route protection works in two layers:

1. `middleware.ts` checks the JWT cookie and role before protected routes load.
2. Server guards and action-level checks protect sensitive operations like admin quotation updates.

## Folder Structure

```txt
app/
  api/
    auth/                  Login, register, logout API routes
    quotations/[id]/       Admin quotation detail API route
  admin/                   Admin dashboard, products, quotations
  login/                   Login page
  logout/                  Auto logout page
  products/                Product catalogue/search page
  quotations/              Seller quotation list/detail/new quotation flow
  register/                Registration page
  seller/                  Seller dashboard

components/                Reusable UI and client components
actions/                   Server actions for quotations and inventory
lib/                       Auth, guards, Prisma, pricing, units, route helpers
prisma/                    Prisma schema, migrations, seed data
types/                     Shared TypeScript types
validations/               Zod validation schemas
public/                    Static assets
```

## Important Files

- `prisma/schema.prisma`: Database models, enums, and decimal column definitions.
- `lib/prisma.ts`: Prisma client setup.
- `lib/auth.ts`: Password hashing, JWT creation, cookie helpers, and `getCurrentUser()`.
- `middleware.ts`: Route protection and role-based redirects.
- `lib/guards.ts`: Server-side role guards.
- `lib/units.ts`: Unit dimensions and conversion functions.
- `lib/pricing.ts`: Price calculation and INR formatting.
- `components/ProductCard.tsx`: Product catalogue pricing calculator.
- `components/QuotationPlacement.tsx`: Quotation creation UI.
- `actions/quotationActions.ts`: Quotation create/read/update logic.

## Database Design

### User

Stores application users.

Important fields:

- `email`
- `password`
- `role`

### Product

Stores inventory items.

Important fields:

- `name`
- `sku`
- `category`
- `description`
- `baseUnit`
- `baseQuantity`
- `price`

### Quotation

Stores quotation header data.

Important fields:

- `customer`
- `status`
- `totalAmount`
- `userId`

### QuotationItem

Stores each product inside a quotation.

Important fields:

- `quantity`: seller-entered quantity
- `unit`: seller-entered unit
- `baseQuantity`: converted internal quantity
- `baseUnit`: internal product base unit
- `unitPrice`: price per base unit
- `totalPrice`: calculated total

Decimal fields use:

```prisma
Decimal @db.Decimal(18, 4)
```

I used Decimal because product quantity and pricing should not depend on JavaScript floating-point numbers.

## Unit Conversion Strategy

Supported units:

- `G`
- `KG`
- `ML`
- `L`
- `UNIT`

Internal base units:

```txt
Weight -> G
Volume -> ML
Count  -> UNIT
```

Conversion factors:

```txt
1 KG = 1000 G
1 L  = 1000 ML
1 UNIT = 1 UNIT
```

Invalid conversions are blocked. For example, `KG` cannot be converted to `ML` because weight and volume are different dimensions.

Important files:

- `lib/units.ts`
- `lib/pricing.ts`

## Pricing Strategy

`Product.price` stores the price per internal base unit.

Example:

```txt
Product base unit: G
Price: 150 per G
Seller enters: 2 KG
Converted quantity: 2000 G
Total price: 2000 * 150
```

The UI displays INR values using `formatINR()` from `lib/pricing.ts`.

## Main Application Flows

### Seller Quotation Flow

```txt
Seller logs in
  -> Opens product catalogue
  -> Searches/filters products
  -> Selects product
  -> Enters quantity and unit
  -> System converts to base quantity
  -> System calculates INR total
  -> Seller places quotation
  -> Quotation is saved as PENDING
```

### Admin Review Flow

```txt
Admin logs in
  -> Opens admin quotations
  -> Reviews quotation details
  -> Checks entered quantity and converted base quantity
  -> Approves, rejects, or completes quotation
  -> Status is updated in database
```

### Product Management Flow

```txt
Admin logs in
  -> Opens products
  -> Creates/edits/deletes products
  -> Sets base unit, quantity, and price
  -> Product catalogue updates for sellers
```

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

- Admin: `admin@aasamedchem.test` / `Admin1234!`
- Admin: `suraj@gmail.com` / `11111111`
- Seller: `seller@aasamedchem.test` / `Seller1234!`

## Deployment Notes

To deploy:

1. Push the project to GitHub.
2. Import it in Vercel.
3. Add environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
4. Run Prisma migrations for the Neon database.
5. Deploy from Vercel.

## Verification Commands

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## If I Had More Time

The first improvement I would add is a true order and inventory deduction flow. After an admin approves or completes a quotation, the system should reduce product stock using a database transaction. I would also add pagination for large product and quotation lists, audit logs for admin actions, and automated tests for pricing and unit conversion.

## Short Interview Summary

This project is a role-based B2B pharmaceutical inventory and quotation system. Admins manage products and review quotations, while sellers browse products and create quotations using flexible units. The most important design choice is the unit conversion strategy: all quantities are converted into base units before pricing. This keeps calculations consistent, transparent, and safe for admin review.

