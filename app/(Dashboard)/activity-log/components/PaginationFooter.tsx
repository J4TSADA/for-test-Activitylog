'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PAGE_WINDOW } from '../constants';

type PaginationFooterProps = {
  page: number;
  pageSize: number;
  totalFiltered: number;
  onPageChange: (page: number) => void;
};

/**
 * เลขหน้าที่จะแสดง ถ้าเยอะเกินใส่ 'gap' คั่น
 * 20 หน้า อยู่หน้า 10 -> [1, 'gap', 9, 10, 11, 'gap', 20]
 */
function buildPageList(current: number, total: number): (number | 'gap')[] {
  if (total <= PAGE_WINDOW) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const wanted = new Set([1, total, current - 1, current, current + 1]);
  const shown = [...wanted]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const out: (number | 'gap')[] = [];
  let prev = 0;

  for (const p of shown) {
    if (prev && p - prev > 1) out.push('gap');
    out.push(p);
    prev = p;
  }
  return out;
}

const BOX =
  'inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors';
const IDLE =
  'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900';
const ARROW = `${BOX} ${IDLE} w-8 disabled:opacity-35 disabled:pointer-events-none`;

export function PaginationFooter({
  page,
  pageSize,
  totalFiltered,
  onPageChange,
}: PaginationFooterProps) {
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const from = totalFiltered === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalFiltered);
  const pages = buildPageList(page, totalPages);

  /** เก็บว่ากำลังพิมพ์เลขอยู่ที่ gap ตัวไหน null คือยังไม่ได้กด */
  const [editingGap, setEditingGap] = useState<number | null>(null);
  const [draft, setDraft] = useState('');

  const closeJump = () => {
    setEditingGap(null);
    setDraft('');
  };

  const commitJump = () => {
    const target = Number(draft);
    if (draft && Number.isInteger(target)) {
      onPageChange(Math.min(totalPages, Math.max(1, target)));
    }
    closeJump();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/60 px-4 py-3">
      <p className="text-sm text-slate-500">
        แสดง {from}-{to} จาก {totalFiltered.toLocaleString('th-TH')} รายการ
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          className={ARROW}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="หน้าก่อนหน้า"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((p, i) => {
          if (p !== 'gap') {
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={p === page ? 'page' : undefined}
                className={`${BOX} ${
                  p === page ? 'bg-slate-900 text-white' : IDLE
                }`}
              >
                {p}
              </button>
            );
          }

          return editingGap === i ? (
            <input
              key={`jump-${i}`}
              autoFocus
              inputMode="numeric"
              value={draft}
              placeholder="#"
              onChange={(e) => setDraft(e.target.value.replace(/\D/g, ''))}
              onBlur={commitJump}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitJump();
                if (e.key === 'Escape') closeJump();
              }}
              className={`${BOX} w-14 border border-slate-400 bg-white text-center text-slate-900 outline-none`}
            />
          ) : (
            <button
              key={`gap-${i}`}
              type="button"
              onClick={() => {
                setEditingGap(i);
                setDraft('');
              }}
              title={`พิมพ์เลขหน้า 1-${totalPages} แล้วกด Enter`}
              className={`${BOX} ${IDLE} text-slate-400`}
            >
              ...
            </button>
          );
        })}

        <button
          type="button"
          className={ARROW}
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="หน้าถัดไป"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
