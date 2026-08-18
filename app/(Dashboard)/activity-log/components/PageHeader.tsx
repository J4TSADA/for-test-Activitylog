import { RefreshCw, Download } from 'lucide-react';
import { Button } from './Button';

export function PageHeader() {
  return (
    <div className="flex items-center justify-between py-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Activity Log
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          ติดตามเหตุการณ์ในระบบและการกระทำของผู้ใช้
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </Button>
        <Button variant="outline">
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
      </div>
    </div>
  );
}
