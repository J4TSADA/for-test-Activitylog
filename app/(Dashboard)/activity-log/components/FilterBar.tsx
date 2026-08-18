'use client';

import { Search, Calendar } from 'lucide-react';
import { Dropdown } from './Dropdown';
import { ACTIVITY_ACTIONS, ACTIVITY_ENTITIES } from '../constants';
import type {
  ActivityAction,
  ActivityEntity,
  ActivityLogFilters,
} from '../types';

type FilterBarProps = {
  filters: ActivityLogFilters;
  onFilterChange: <K extends keyof ActivityLogFilters>(
    key: K,
    value: ActivityLogFilters[K],
  ) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
};

export function FilterBar({
  filters,
  onFilterChange,
  hasActiveFilters,
  onClearFilters,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
      <div className="relative w-full max-w-[300px]">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        <input
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          placeholder="ค้นหาด้วย ID, ผู้ใช้ หรือคำสำคัญ..."
          className="w-full rounded-md border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
      </div>

      <Dropdown<ActivityAction>
        label="ทุก Action"
        value={filters.action}
        options={ACTIVITY_ACTIONS}
        onChange={(value) => onFilterChange('action', value)}
        onClear={() => onFilterChange('action', '')}
      />

      <Dropdown<ActivityEntity>
        label="ทุก Entity"
        value={filters.entity}
        options={ACTIVITY_ENTITIES}
        onChange={(value) => onFilterChange('entity', value)}
        onClear={() => onFilterChange('entity', '')}
      />

      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Calendar className="h-3.5 w-3.5 text-slate-400" />
        7 วันล่าสุด
      </button>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="ml-auto text-sm text-slate-500 hover:text-slate-900"
        >
          ล้างตัวกรอง
        </button>
      )}
    </div>
  );
}
