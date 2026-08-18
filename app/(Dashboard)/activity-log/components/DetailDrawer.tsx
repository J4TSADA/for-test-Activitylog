'use client';

import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { ActionBadge, ActorBadge } from './Badges';
import { JsonBlock } from './JsonBlock';
import { formatTimestamp, shortId, formatActor, parseMetadata } from '../utils';
import type { ActivityLog } from '../types';

type DetailDrawerProps = {
  log: ActivityLog | null;
  onClose: () => void;
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      {children}
    </div>
  );
}

export function DetailDrawer({ log, onClose }: DetailDrawerProps) {
  if (!log) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div className="space-y-2">
            <ActionBadge action={log.action} />
            <p className="text-sm font-medium text-slate-900">
              {log.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="ปิด"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <Field label="Log ID">
              <p className="mt-1 font-mono text-xs text-slate-700">{log.id}</p>
            </Field>
            <Field label="เวลา">
              <p className="mt-1 font-mono text-xs text-slate-700">
                {formatTimestamp(log.created_at)}
              </p>
            </Field>
            <Field label="ผู้ทำ">
              <div className="mt-1 flex items-center gap-1.5">
                <p className="text-xs font-medium text-slate-700">
                  {formatActor(log.user_id)}
                </p>
                <ActorBadge actorType={log.actor_type} />
              </div>
            </Field>
            <Field label="Entity">
              <p className="mt-1 text-xs text-slate-700">{log.entity}</p>
              <p className="font-mono text-[11px] text-slate-400">
                id: {shortId(log.entity_id)}
              </p>
            </Field>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              Metadata
            </p>
            <JsonBlock data={parseMetadata(log.metadata)} />
          </div>
        </div>
      </div>
    </div>
  );
}
