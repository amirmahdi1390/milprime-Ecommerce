import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
  className = '',
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          'relative w-full bg-white rounded-2xl border border-[#e4e4e7] shadow-xl overflow-hidden z-10 transition-all duration-200 animate-in fade-in zoom-in-95',
          maxWidth,
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-[#e4e4e7] px-6 py-4">
          <h3 className="text-lg font-semibold text-[#09090b]">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#71717a] hover:text-[#09090b] hover:bg-[#f4f4f5] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
