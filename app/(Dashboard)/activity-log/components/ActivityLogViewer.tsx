'use client';

import { useMemo, useState } from 'react';
import { PageHeader } from './PageHeader';
import { FilterBar } from './FilterBar';
import { LogTable } from './LogTable';
import { PaginationFooter } from './PaginationFooter';
import { DetailDrawer } from './DetailDrawer';
import { buildSearchHaystack } from '../utils';
import { PAGE_SIZE } from '../constants';
import {
  EMPTY_FILTERS,
  type ActivityLog,
  type ActivityLogFilters,
} from '../types';

type ActivityLogViewerProps = {
  logs: ActivityLog[];
};

export function ActivityLogViewer({ logs }: ActivityLogViewerProps) {
  const [filters, setFilters] = useState<ActivityLogFilters>(EMPTY_FILTERS);
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [page, setPage] = useState(1);

  /** เปลี่ยนตัวกรองแล้วต้องกลับหน้า 1 ไม่งั้นค้างอยู่หน้าที่ไม่มีข้อมูล */
  const setFilter = <K extends keyof ActivityLogFilters>(
    key: K,
    value: ActivityLogFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const hasActiveFilters = Boolean(
    filters.search || filters.action || filters.entity,
  );

  const filtered = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return logs.filter((log) => {
      if (filters.action && log.action !== filters.action) return false;
      if (filters.entity && log.entity !== filters.entity) return false;
      if (query && !buildSearchHaystack(log).includes(query)) return false;
      return true;
    });
  }, [logs, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  /** กันหน้าเกินช่วง เผื่อข้อมูลหดลงหลังกรอง */
  const safePage = Math.min(page, totalPages);

  const paged = useMemo(
    () => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage],
  );

  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-[1600px] px-8 py-8">
        <PageHeader />

        <FilterBar
          filters={filters}
          onFilterChange={setFilter}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />

        <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <LogTable
            logs={paged}
            onViewDetails={setSelectedLog}
            onClearFilters={clearFilters}
          />
          <PaginationFooter
            page={safePage}
            pageSize={PAGE_SIZE}
            totalFiltered={filtered.length}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
        </div>
      </div>

      <DetailDrawer log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  );
}
