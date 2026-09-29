import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 bg-white border border-[#e4e4e7] rounded-xl shadow-lg shadow-black/5 animate-in slide-in-from-bottom-3 duration-200"
          >
            <div className="flex items-center gap-2.5 text-sm text-[#09090b]">
              {isSuccess && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
              {isError && <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />}
              {!isSuccess && !isError && <Info className="h-4 w-4 text-[#71717a] shrink-0" />}
              <span className="font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-[#a1a1aa] hover:text-[#09090b] rounded-md transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
