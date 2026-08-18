import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

type PaginationFooterProps = {
  resultCount: number;
  totalCount: number;
};

export function PaginationFooter({
  resultCount,
  totalCount,
}: PaginationFooterProps) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
      <p className="text-sm text-slate-500">
        แสดง {resultCount} จาก {totalCount.toLocaleString('th-TH')} รายการ
      </p>
      <div className="flex items-center gap-2">
        <Button variant="outline" disabled className="px-2.5">
          <ChevronLeft className="h-3.5 w-3.5" />
          ก่อนหน้า
        </Button>
        <Button variant="outline" className="px-2.5">
          ถัดไป
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
