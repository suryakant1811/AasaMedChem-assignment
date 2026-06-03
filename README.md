# AasaMedChem Inventory & Order Management System

A small inventory and quotation/order management system built with Next.js, Neon PostgreSQL, Prisma, and Vercel.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- Neon PostgreSQL
- Vercel

## Local Database Setup

Create a Neon PostgreSQL database and copy the connection string.

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/dbname?sslmode=require"

Implement authentication for the app.

Use:
- bcrypt for password hashing
- JWT or NextAuth credentials, whichever is simpler and production acceptable
- Role based access: ADMIN and SELLER
- Middleware or server-side guard helpers

Create:
- register/login/logout flow
- protected admin routes
- protected seller routes
- helper function getCurrentUser()
- seed script to create one admin and one seller test user


Create a reusable unit conversion module.

Supported units:
- G to KG and KG to G
- ML to L and L to ML
- UNIT remains UNIT

Create:
- lib/units.ts
- types for Unit and Dimension
- function getDimension(unit)
- function convertToBaseUnit(quantity, unit)
- function convertFromBaseUnit(quantity, fromBaseUnit, targetUnit)
- validation to prevent invalid conversion like KG to ML

Use decimal-safe calculations.

