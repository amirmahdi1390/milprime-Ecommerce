import React from 'react';
import { cn } from '../../lib/utils';

export function Input({
  label,
  error,
  icon: Icon,
  className = '',
  pill = false,
  ...props
}) {
  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label className="block text-xs font-medium text-[#71717a] uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="pointer-events-none absolute left-3.5 text-[#a1a1aa]">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          className={cn(
            'w-full bg-white border border-[#e4e4e7] px-4 py-2.5 text-sm text-[#09090b] placeholder:text-[#a1a1aa] transition-all duration-150',
            'focus:outline-none focus:border-[#09090b] focus:ring-1 focus:ring-[#09090b]',
            pill ? 'rounded-full' : 'rounded-lg',
            Icon && 'pl-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
