import Decimal from 'decimal.js';
import type { Dimension, Unit } from '@/types/units';

const unitDimensionMap: Record<Unit, Dimension> = {
  G: 'WEIGHT',
  KG: 'WEIGHT',
  ML: 'VOLUME',
  L: 'VOLUME',
  UNIT: 'COUNT',
};

const baseUnitMap: Record<Dimension, Unit> = {
  WEIGHT: 'G',
  VOLUME: 'ML',
  COUNT: 'UNIT',
};

const unitMultiplier: Record<Unit, Decimal> = {
  G: new Decimal(1),
  KG: new Decimal(1000),
  ML: new Decimal(1),
  L: new Decimal(1000),
  UNIT: new Decimal(1),
};

const baseUnits: Unit[] = ['G', 'ML', 'UNIT'];

export function getDimension(unit: Unit): Dimension {
  return unitDimensionMap[unit];
}

export function convertToBaseUnit(quantity: Decimal.Value, unit: Unit): Decimal {
  const amount = new Decimal(quantity);
  return amount.mul(unitMultiplier[unit]);
}

export function convertFromBaseUnit(
  quantity: Decimal.Value,
  fromBaseUnit: Unit,
  targetUnit: Unit,
): Decimal {
  if (!baseUnits.includes(fromBaseUnit)) {
    throw new Error('convertFromBaseUnit must receive a base unit type: G, ML, or UNIT.');
  }

  const sourceDimension = getDimension(fromBaseUnit);
  const targetDimension = getDimension(targetUnit);

  if (sourceDimension !== targetDimension) {
    throw new Error(`Invalid conversion from ${fromBaseUnit} to ${targetUnit}. Units must share the same dimension.`);
  }

  const baseAmount = new Decimal(quantity);
  return baseAmount.div(unitMultiplier[targetUnit]);
}

export function isConversionValid(sourceUnit: Unit, targetUnit: Unit) {
  return getDimension(sourceUnit) === getDimension(targetUnit);
}

export function getSelectableUnitsForBaseUnit(baseUnit: Unit) {
  const dimension = getDimension(baseUnit);

  if (dimension === 'WEIGHT') {
    return ['G', 'KG'] as const;
  }

  if (dimension === 'VOLUME') {
    return ['ML', 'L'] as const;
  }

  return ['UNIT'] as const;
}

export function getBaseUnit(unit: Unit): Unit {
  return baseUnitMap[getDimension(unit)];
}
