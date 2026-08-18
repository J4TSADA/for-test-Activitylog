'use client';

import { Braces } from 'lucide-react';
import { ActorBadge, ActionBadge } from './Badges';
import { EmptyState } from './EmptyState';
import { formatTimestamp, formatActor } from '../utils';
import type { ActivityLog } from '../types';

type LogTableProps = {
  logs: ActivityLog[];
  onViewDetails: (log: ActivityLog) => void;
  onClearFilters: () => void;
};

const TH =
  'px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500';

export function LogTable({
  logs,
  onViewDetails,
  onClearFilters,
}: LogTableProps) {
  if (logs.length === 0) {
    return <EmptyState onClear={onClearFilters} />;
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-slate-50">
          <th className={`w-[190px] ${TH}`}>Timestamp</th>
          <th className={`w-[140px] ${TH}`}>Actor</th>
          <th className={`w-[110px] ${TH}`}>Action</th>
          <th className={`w-[200px] ${TH}`}>Entity</th>
          <th className={TH}>Description</th>
          <th className={`w-[80px] text-right ${TH}`}>Details</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr
            key={log.id}
            className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
          >
            <td className="whitespace-nowrap px-4 py-3 align-middle font-mono text-xs text-slate-500">
              {formatTimestamp(log.created_at)}
            </td>
            <td className="px-4 py-3 align-middle">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-slate-900">
                  {formatActor(log.user_id)}
                </span>
                <ActorBadge actorType={log.actor_type} />
              </div>
            </td>
            <td className="px-4 py-3 align-middle">
              <ActionBadge action={log.action} />
            </td>
            <td className="px-4 py-3 align-middle">
              <span className="inline-flex items-center rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-xs text-slate-600">
                {log.entity}
              </span>
            </td>
            <td className="max-w-[1px] px-4 py-3 align-middle">
              <p className="truncate text-sm text-slate-700">
                {log.description}
              </p>
            </td>
            <td className="px-4 py-3 text-right align-middle">
              <button
                type="button"
                onClick={() => onViewDetails(log)}
                aria-label="ดูรายละเอียด"
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <Braces className="h-3.5 w-3.5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
