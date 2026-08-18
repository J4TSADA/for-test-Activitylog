'use client';

import { Eye } from 'lucide-react';
import { ActorBadge, ActionBadge } from './Badges';
import { EmptyState } from './EmptyState';
import {
  formatDatePart,
  formatTimePart,
  formatActor,
  isActorUnknown,
} from '../utils';
import type { ActivityLog } from '../types';

type LogTableProps = {
  logs: ActivityLog[];
  onViewDetails: (log: ActivityLog) => void;
  onClearFilters: () => void;
};

const TH =
  'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600';

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
        <tr className="border-b-2 border-slate-200 bg-slate-100">
          <th className={`w-[150px] ${TH}`}>Timestamp</th>
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
            className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-sky-50/70"
          >
            <td className="whitespace-nowrap px-4 py-3 align-middle">
              <div className="font-mono text-xs font-medium text-slate-700">
                {formatDatePart(log.created_at)}
              </div>
              <div className="font-mono text-xs text-slate-400">
                {formatTimePart(log.created_at)}
              </div>
            </td>
            <td className="px-4 py-3 align-middle">
              <div className="flex flex-col gap-1">
                <span
                  className={`text-sm ${
                    isActorUnknown(log.user_id, log.actor_type)
                      ? 'italic text-slate-400'
                      : 'font-medium text-slate-900'
                  }`}
                >
                  {formatActor(log.user_id, log.actor_type)}
                </span>
                <ActorBadge
                  actorType={log.actor_type}
                  unknown={isActorUnknown(log.user_id, log.actor_type)}
                />
              </div>
            </td>
            <td className="px-4 py-3 align-middle">
              <ActionBadge action={log.action} />
            </td>
            <td className="px-4 py-3 align-middle">
              <span className="inline-flex w-fit items-center rounded border border-slate-200 bg-white px-2 py-0.5 font-mono text-xs text-slate-700">
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
                title="ดูรายละเอียด"
                className="inline-flex items-center justify-center rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-900 hover:text-white"
              >
                <Eye className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
