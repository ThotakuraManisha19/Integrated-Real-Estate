import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-start justify-between gap-3 text-xs animate-in slide-in-from-bottom-5 duration-300 ${
            t.type === 'success'
              ? 'bg-emerald-950 text-white border-emerald-700 shadow-emerald-900/30'
              : t.type === 'error'
              ? 'bg-rose-950 text-white border-rose-700 shadow-rose-900/30'
              : t.type === 'warning'
              ? 'bg-amber-950 text-white border-amber-700 shadow-amber-900/30'
              : 'bg-slate-900 text-white border-slate-700'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {t.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
            {t.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}

            <div>
              <h4 className="font-bold text-sm text-white">{t.title}</h4>
              <p className="text-slate-300 mt-0.5 text-xs leading-relaxed">{t.message}</p>
            </div>
          </div>

          <button
            onClick={() => onDismiss(t.id)}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
