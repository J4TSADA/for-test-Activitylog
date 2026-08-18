import { ACTION_STYLES } from '../constants';
import type { ActivityAction, ActorType } from '../types';

export function ActorBadge({ actorType }: { actorType: ActorType }) {
  if (actorType === 'USER') return null;

  return (
    <span className="inline-flex w-fit items-center rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
      {actorType}
    </span>
  );
}

export function ActionBadge({ action }: { action: ActivityAction }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium uppercase ${ACTION_STYLES[action]}`}
    >
      {action}
    </span>
  );
}
