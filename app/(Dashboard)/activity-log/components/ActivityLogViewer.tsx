'use client';

import { useMemo, useState } from 'react';
import { PageHeader } from './PageHeader';
import { FilterBar } from './FilterBar';
import { LogTable } from './LogTable';
import { PaginationFooter } from './PaginationFooter';
import { DetailDrawer } from './DetailDrawer';
import { buildSearchHaystack } from '../utils';
import {
  EMPTY_FILTERS,
  type ActivityLog,
  type ActivityLogFilters,
} from '../types';

type ActivityLogViewerProps = {
  logs: ActivityLog[];
  totalCount: number;
};

export function ActivityLogViewer({
  logs,
  totalCount,
}: ActivityLogViewerProps) {
  const [filters, setFilters] = useState<ActivityLogFilters>(EMPTY_FILTERS);
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);

  const setFilter = <K extends keyof ActivityLogFilters>(
    key: K,
    value: ActivityLogFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(EMPTY_FILTERS);

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

  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <PageHeader />

        <FilterBar
          filters={filters}
          onFilterChange={setFilter}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />

        <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <LogTable
            logs={filtered}
            onViewDetails={setSelectedLog}
            onClearFilters={clearFilters}
          />
          <PaginationFooter
            resultCount={filtered.length}
            totalCount={totalCount}
          />
        </div>
      </div>

      <DetailDrawer log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  );
}
