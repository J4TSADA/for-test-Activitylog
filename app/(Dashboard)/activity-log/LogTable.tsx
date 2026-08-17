'use client';

import { useState } from 'react';
import { ACTIVITY_ENTITIES, type ActivityLog } from './types';

const CELL: React.CSSProperties = { padding: 8, border: '1px solid #ddd' };

function formatDate(iso: string | null) {
  if (!iso) return '-';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleString('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Bangkok',
  });
}

function formatActor(actorType: string, userId: string | null) {
  if (actorType === 'USER') {
    return userId ? `User ${userId}` : 'User (ไม่ระบุ)';
  }
  return actorType;
}

export default function LogTable({ logs }: { logs: ActivityLog[] }) {
  const [entity, setEntity] = useState('');
  const [action, setAction] = useState('');

  const filtered = logs.filter((log) => {
    if (entity && log.entity !== entity) return false;
    if (action && log.action !== action) return false;
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <select value={entity} onChange={(e) => setEntity(e.target.value)}>
          <option value="">ทุก Entity</option>
          {ACTIVITY_ENTITIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="">ทุก Action</option>
          <option value="created">created</option>
          <option value="updated">updated</option>
          <option value="deleted">deleted</option>
        </select>
      </div>

      <p style={{ color: '#888' }}>
        แสดง {filtered.length} จาก {logs.length} รายการ
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
                <td style={CELL}>{formatDate(log.created_at)}</td>
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