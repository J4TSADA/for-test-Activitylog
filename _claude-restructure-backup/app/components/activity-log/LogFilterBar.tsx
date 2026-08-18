'use client';

import {
  ACTIVITY_ACTIONS,
  ACTIVITY_ENTITIES,
} from '@/app/constant/activity-log';
import type {
  ActivityAction,
  ActivityEntity,
  ActivityLogFilter,
} from '@/app/(DashboardLayout)/types/activity-log';

type Props = {
  filter: ActivityLogFilter;
  onChange: (filter: ActivityLogFilter) => void;
};

export default function LogFilterBar({ filter, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
      <select
        value={filter.entity}
        onChange={(e) =>
          onChange({ ...filter, entity: e.target.value as ActivityEntity | '' })
        }
      >
        <option value="">ทุก Entity</option>
        {ACTIVITY_ENTITIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={filter.action}
        onChange={(e) =>
          onChange({ ...filter, action: e.target.value as ActivityAction | '' })
        }
      >
        <option value="">ทุก Action</option>
        {ACTIVITY_ACTIONS.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
