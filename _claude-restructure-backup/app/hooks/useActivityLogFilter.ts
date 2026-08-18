'use client';

import { useMemo, useState } from 'react';
import {
  EMPTY_ACTIVITY_LOG_FILTER,
  type ActivityLog,
  type ActivityLogFilter,
} from '@/app/(DashboardLayout)/types/activity-log';

export function useActivityLogFilter(logs: ActivityLog[]) {
  const [filter, setFilter] = useState<ActivityLogFilter>(
    EMPTY_ACTIVITY_LOG_FILTER,
  );

  const filtered = useMemo(
    () =>
      logs.filter((log) => {
        if (filter.entity && log.entity !== filter.entity) return false;
        if (filter.action && log.action !== filter.action) return false;
        return true;
      }),
    [logs, filter],
  );

  return { filter, setFilter, filtered, total: logs.length };
}
