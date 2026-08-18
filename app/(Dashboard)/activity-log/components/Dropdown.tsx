'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type DropdownProps<T extends string> = {
  label: string;
  value: T | '';
  options: readonly T[];
  onChange: (value: T) => void;
  onClear: () => void;
};

export function Dropdown<T extends string>({
  label,
  value,
  options,
  onChange,
  onClear,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
          value
            ? 'border-slate-300 bg-slate-900 text-white hover:bg-slate-800'
            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
        }`}
      >
        {value || label}
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 z-20 mt-1.5 w-56 overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-lg shadow-slate-200/60">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="flex w-full items-center px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-50"
              >
                {opt}
              </button>
            ))}

            {value && (
              <button
                type="button"
                onClick={() => {
                  onClear();
                  setOpen(false);
                }}
                className="mt-1 flex w-full items-center border-t border-slate-100 px-3 py-1.5 text-left text-sm text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              >
                ล้าง
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
