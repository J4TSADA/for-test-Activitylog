import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

type PaginationFooterProps = {
  page: number;
  pageSize: number;
  totalFiltered: number;
  onPrev: () => void;
  onNext: () => void;
};

export function PaginationFooter({
  page,
  pageSize,
  totalFiltered,
  onPrev,
  onNext,
}: PaginationFooterProps) {
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const from = totalFiltered === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalFiltered);

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
      <p className="text-sm text-slate-500">
        แสดง {from}-{to} จาก {totalFiltered.toLocaleString('th-TH')} รายการ
        {totalPages > 1 && (
          <span className="ml-2 text-slate-400">
            (หน้า {page} / {totalPages})
          </span>
        )}
      </p>
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="px-2.5"
          disabled={page <= 1}
          onClick={onPrev}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          ก่อนหน้า
        </Button>
        <Button
          variant="outline"
          className="px-2.5"
          disabled={page >= totalPages}
          onClick={onNext}
        >
          ถัดไป
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
        </div>
      )}
    </div>
  );
}
