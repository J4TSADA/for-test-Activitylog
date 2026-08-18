import { Inbox } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <div className="rounded-full bg-slate-100 p-3">
        <Inbox className="h-5 w-5 text-slate-400" />
      </div>
      <p className="text-sm font-medium text-slate-900">ไม่พบข้อมูล</p>
      <p className="text-sm text-slate-500">
        ลองปรับตัวกรองหรือคำค้นหาดูอีกครั้ง
      </p>
      <Button variant="outline" onClick={onClear} className="mt-1">
        ล้างตัวกรอง
      </Button>
    </div>
  );
}
