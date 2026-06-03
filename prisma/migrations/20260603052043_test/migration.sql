/*
  Warnings:

  - Added the required column `baseQuantity` to the `QuotationItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseUnit` to the `QuotationItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QuotationItem" DROP CONSTRAINT "QuotationItem_quotationId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "QuotationItem" ADD COLUMN     "baseQuantity" DECIMAL(18,4) NOT NULL,
ADD COLUMN     "baseUnit" "ProductUnit" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QuotationItem" ADD CONSTRAINT "QuotationItem_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "Quotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
