'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createQuotation } from '@/actions/quotationActions';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { EmptyState } from '@/components/StateCards';
import { formatINR, calculateProductPricing } from '@/lib/pricing';
import type { ProductView } from '@/types/product';
import type { QuotationItemData } from '@/types/quotation';
import Decimal from 'decimal.js';

type CartItem = {
  product: ProductView;
  quantity: string;
  unit: string;
};

type QuotationPlacementProps = {
  products: ProductView[];
};

export function QuotationPlacement({ products }: QuotationPlacementProps) {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  function addToCart() {
    if (!selectedProduct || !quantity) return;

    const product = selectedProduct;
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      setCart(cart.map((item) => (item.product.id === product.id ? { ...item, quantity } : item)));
    } else {
      setCart([...cart, { product, quantity, unit: 'G' }]);
    }

    setQuantity('');
  }

  function removeFromCart(productId: string) {
    setCart(cart.filter((item) => item.product.id !== productId));
  }

  const cartTotal = cart.reduce((sum, item) => {
    try {
      const pricing = calculateProductPricing(item.quantity, item.unit as any, item.product.baseUnit as any, item.product.price);
      return sum.plus(pricing.totalPrice);
    } catch {
      return sum;
    }
  }, new Decimal(0));

  async function handleSubmit() {
    if (!customerName || cart.length === 0) return;

    setIsSubmitting(true);

    try {
      const quotationItems: QuotationItemData[] = cart.map((item) => {
        const pricing = calculateProductPricing(item.quantity, item.unit as any, item.product.baseUnit as any, item.product.price);
        return {
          productId: item.product.id,
          quantity: item.quantity,
          unit: item.unit as any,
          baseQuantity: pricing.convertedBaseQuantity.toString(),
          baseUnit: pricing.baseUnit,
          unitPrice: pricing.pricePerBaseUnit.toString(),
          totalPrice: pricing.totalPrice.toString(),
        };
      });

      await createQuotation(customerName, quotationItems);
      router.push('/quotations');
    } catch (error) {
      console.error(error);
      alert('Failed to create quotation.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-slate-900">New quotation</h2>
          <p className="mt-2 text-slate-600">Select products and quantities to create a quotation.</p>
        </Card>

        <Card>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Customer name</span>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none"
            />
          </label>
        </Card>

        {cart.length > 0 ? (
          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={item.product.id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{item.product.name}</p>
                  <p className="text-sm text-slate-600">
                    {item.quantity} {item.unit}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-sm font-semibold text-rose-600 hover:text-rose-700"
                >
                  Remove
                </button>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState title="Cart is empty" description="Add products to create a quotation." icon="🛒" />
        )}
      </div>

      <div className="space-y-6">
        <Card className="p-8 space-y-6 sticky top-6">
          <div>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Select product</span>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none"
              >
                <option value="">Choose a product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>

            {selectedProduct && (
              <>
                <label className="mt-4 space-y-2 block">
                  <span className="text-sm font-medium text-slate-700">Quantity</span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none"
                  />
                </label>

                <Button onClick={addToCart} className="w-full mt-4">
                  Add to cart
                </Button>
              </>
            )}
          </div>

          <div className="border-t border-slate-200 pt-6">
            <div className="text-sm text-slate-600 mb-4">
              <div className="flex justify-between mb-2">
                <span>Items:</span>
                <strong>{cart.length}</strong>
              </div>
              <div className="flex justify-between text-lg font-semibold text-slate-900">
                <span>Total:</span>
                <strong>{formatINR(cartTotal)}</strong>
              </div>
            </div>

            <Button onClick={handleSubmit} isLoading={isSubmitting} disabled={!customerName || cart.length === 0} className="w-full">
              Place quotation
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
