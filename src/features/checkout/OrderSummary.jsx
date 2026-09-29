import React from 'react';
import { formatCurrency } from '../../utils/currency';
import { ShieldCheck } from 'lucide-react';

export function OrderSummary({ items = [], subtotal = 0, shipping = 0, tax = 0 }) {
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-[#fafafa] border border-[#e4e4e7] rounded-2xl p-6 sm:p-8 space-y-6 text-left">
      <h3 className="text-base font-semibold text-[#09090b]">Order Summary</h3>

      {/* Items List */}
      <div className="space-y-4 divide-y divide-[#e4e4e7]/60 max-h-96 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="pt-4 first:pt-0 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 rounded-lg bg-white border border-[#e4e4e7] overflow-hidden shrink-0">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-full w-full object-cover object-center"
                />
                <span className="absolute top-0 right-0 h-4 min-w-4 px-1 rounded-bl bg-black text-white text-[9px] font-bold flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#09090b] line-clamp-1">{item.name}</p>
                <p className="text-[11px] text-[#71717a]">{formatCurrency(item.price)} each</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#09090b] whitespace-nowrap">
              {formatCurrency(item.subtotal || item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals Breakdown */}
      <div className="space-y-2 pt-4 border-t border-[#e4e4e7] text-xs text-[#71717a]">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-[#09090b] font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Standard Shipping</span>
          <span className="text-[#09090b] font-medium">
            {shipping === 0 ? 'Complimentary' : formatCurrency(shipping)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Sales Tax</span>
          <span className="text-[#09090b] font-medium">{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between items-baseline pt-3 border-t border-[#e4e4e7] text-base font-bold text-[#09090b]">
          <span>Total</span>
          <span className="text-xl">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Guarantee badge */}
      <div className="flex items-center gap-2 pt-2 text-[11px] text-[#71717a]">
        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
        <span>30-Day Guaranteed Returns & Complimentary Exchange</span>
      </div>
    </div>
  );
}
