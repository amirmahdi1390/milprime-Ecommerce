import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({
  children,
  variant = 'secondary', // 'default' | 'secondary' | 'discount' | 'outline' | 'success'
  className = '',
}) {
  const variants = {
    default: 'bg-black text-white',
    secondary: 'bg-[#f4f4f5] text-[#18181b] border border-[#e4e4e7]',
    discount: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold',
    outline: 'border border-[#e4e4e7] text-[#71717a] bg-white',
    success: 'bg-emerald-100 text-emerald-800',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-tight',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
