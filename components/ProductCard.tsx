'use client';

import { useMemo, useState } from 'react';
import { calculateProductPricing, formatINR } from '@/lib/pricing';
import { getSelectableUnitsForBaseUnit } from '@/lib/units';
import type { ProductView } from '@/types/product';
import type { Unit } from '@/types/units';

type ProductCardProps = {
  product: ProductView;
};

export function ProductCard({ product }: ProductCardProps) {
  const units = useMemo(() => getSelectableUnitsForBaseUnit(product.baseUnit as Unit), [product.baseUnit]);
  const [selectedUnit, setSelectedUnit] = useState<Unit>(units[0]);
  const [quantity, setQuantity] = useState('1');

  const pricing = useMemo(() => {
    try {
      return calculateProductPricing(quantity || '0', selectedUnit, product.baseUnit as Unit, product.price);
    } catch {
      return null;
    }
  }, [quantity, selectedUnit, product.baseUnit, product.price]);

  const totalStock = Number(product.baseQuantity);
  const requiredStock = pricing ? pricing.convertedBaseQuantity.toNumber() : 0;
  const isInStock = pricing ? requiredStock <= totalStock : true;
  const stockLabel = pricing ? (isInStock ? 'In stock' : 'Insufficient stock') : 'Enter quantity to check availability';

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">{product.category || 'General'}</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{product.name}</h2>
          <p className="text-sm text-slate-500">SKU: {product.sku}</p>
        </div>
        <p className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          {formatINR(product.price)} / {product.baseUnit}
        </p>
      </div>

      {product.description ? <p className="text-slate-600">{product.description}</p> : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Quantity</span>
          <input
            type="number"
            min="0"
            step="any"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Unit</span>
          <select
            value={selectedUnit}
            onChange={(event) => setSelectedUnit(event.target.value as Unit)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none"
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-3 rounded-3xl bg-slate-50 p-4 text-slate-700">
        <div className="flex items-center justify-between text-sm">
          <span>Converted Base Quantity</span>
          <strong>{pricing ? `${pricing.convertedBaseQuantity.toFixed(4)} ${pricing.baseUnit}` : '-'}</strong>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Base unit price</span>
          <strong>{pricing ? formatINR(pricing.pricePerBaseUnit) : '-'}</strong>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Total price</span>
          <strong>{pricing ? formatINR(pricing.totalPrice) : '-'}</strong>
        </div>
      </div>

      <div className="mt-5 grid gap-3 rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">
        <div className="flex items-center justify-between">
          <span>Stock available</span>
          <strong>{stockLabel}</strong>
        </div>
        <div className="flex items-center justify-between">
          <span>Current stock</span>
          <strong>{new Intl.NumberFormat('en-IN').format(Number(product.baseQuantity))} {product.baseUnit}</strong>
        </div>
      </div>
    </article>
  );
}
