import React from 'react';

export function CardBrandBadge({ brand = 'generic' }) {
  if (brand === 'visa') {
    return (
      <span className="px-1.5 py-0.5 rounded bg-blue-900 text-white font-black text-[9px] tracking-wider">
        VISA
      </span>
    );
  }
  if (brand === 'mastercard') {
    return (
      <span className="px-1.5 py-0.5 rounded bg-zinc-900 text-white font-bold text-[9px] flex items-center gap-0.5">
        <span className="h-2 w-2 rounded-full bg-red-500 inline-block -mr-1"></span>
        <span className="h-2 w-2 rounded-full bg-amber-400 inline-block"></span>
      </span>
    );
  }
  return null;
}

export function detectCardBrand(number = '') {
  const cleaned = number.replace(/\D/g, '');
  if (/^4/.test(cleaned)) return 'visa';
  if (/^5[1-5]/.test(cleaned)) return 'mastercard';
  if (/^3[47]/.test(cleaned)) return 'amex';
  return 'generic';
}
