'use client';

import type { CSSProperties } from 'react';
import LogFilterBar from './LogFilterBar';
import { useActivityLogFilter } from '@/app/hooks/useActivityLogFilter';
import {
  formatActor,
  formatLogDate,
} from '@/app/(DashboardLayout)/utilities/activityLogFormat';
import type { ActivityLog } from '@/app/(DashboardLayout)/types/activity-log';

const CELL: CSSProperties = { padding: 8, border: '1px solid #ddd' };

type Props = {
  logs: ActivityLog[];
};

export default function LogTable({ logs }: Props) {
  const { filter, setFilter, filtered, total } = useActivityLogFilter(logs);

  return (
    <div>
      <LogFilterBar filter={filter} onChange={setFilter} />

      <p style={{ color: '#888' }}>
        แสดง {filtered.length} จาก {total} รายการ
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#030303', textAlign: 'left' }}>
            <th style={CELL}>เวลา</th>
            <th style={CELL}>Entity</th>
            <th style={CELL}>Action</th>
            <th style={CELL}>ผู้ทำ</th>
            <th style={CELL}>รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td style={{ ...CELL, textAlign: 'center' }} colSpan={5}>
                ไม่พบข้อมูล
              </td>
            </tr>
          ) : (
            filtered.map((log) => (
              <tr key={log.id}>
                <td style={CELL}>{formatLogDate(log.created_at)}</td>
                <td style={CELL}>{log.entity}</td>
                <td style={CELL}>{log.action}</td>
                <td style={CELL}>{formatActor(log.actor_type, log.user_id)}</td>
                <td style={CELL}>{log.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
