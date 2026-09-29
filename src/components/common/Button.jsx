import React from 'react';
import { cn } from '../../lib/utils';

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size = 'md', // 'sm' | 'md' | 'lg' | 'icon'
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20';

  const variants = {
    primary: 'bg-black text-white hover:bg-black/85 active:scale-[0.98]',
    secondary: 'bg-[#f4f4f5] text-[#18181b] hover:bg-[#e4e4e7] active:scale-[0.98]',
    outline: 'border border-[#e4e4e7] bg-white text-[#18181b] hover:bg-[#f4f4f5] active:scale-[0.98]',
    ghost: 'text-[#18181b] hover:bg-[#f4f4f5] active:scale-[0.98]',
    destructive: 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]',
  };

  const sizes = {
    sm: 'h-8 px-4 text-xs rounded-full gap-1.5',
    md: 'h-10 px-5 text-sm rounded-full gap-2',
    lg: 'h-12 px-7 text-base rounded-full gap-2.5',
    icon: 'h-9 w-9 rounded-full p-0 flex items-center justify-center',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
