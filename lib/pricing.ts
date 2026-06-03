import Decimal from 'decimal.js';
import { convertToBaseUnit, getDimension, getBaseUnit, isConversionValid } from '@/lib/units';
import type { Unit } from '@/types/units';

export type PricingResult = {
  enteredQuantity: Decimal;
  enteredUnit: Unit;
  convertedBaseQuantity: Decimal;
  baseUnit: Unit;
  pricePerBaseUnit: Decimal;
  totalPrice: Decimal;
};

export function formatINR(amount: Decimal.Value) {
  const value = new Decimal(amount);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value.toNumber());
}

export function calculateProductPricing(
  quantity: Decimal.Value,
  enteredUnit: Unit,
  productBaseUnit: Unit,
  pricePerBaseUnit: Decimal.Value,
): PricingResult {
  const enteredQuantity = new Decimal(quantity);
  const baseUnit = getBaseUnit(productBaseUnit);

  if (!isConversionValid(enteredUnit, baseUnit)) {
    throw new Error(`Invalid conversion from ${enteredUnit} to product base unit ${productBaseUnit}.`);
  }

  const convertedBaseQuantity = convertToBaseUnit(enteredQuantity, enteredUnit);
  const pricePerBase = new Decimal(pricePerBaseUnit);
  const totalPrice = convertedBaseQuantity.mul(pricePerBase);

  return {
    enteredQuantity,
    enteredUnit,
    convertedBaseQuantity,
    baseUnit,
    pricePerBaseUnit: pricePerBase,
    totalPrice,
  };
}
