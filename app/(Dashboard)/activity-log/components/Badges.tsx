import { ACTION_STYLES } from '../constants';
import type { ActivityAction, ActorType } from '../types';

const BADGE =
  'inline-flex w-fit items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide';

/**
 * แยกสีตามชนิดผู้ทำ เลี่ยงเขียว/ฟ้า/แดง เพราะ ACTION_STYLES ใช้ไปแล้ว
 * ถ้าเพิ่ม ActorType ใหม่แล้วลืมใส่สี TypeScript จะฟ้องตรงนี้
 */
const ACTOR_STYLES: Record<ActorType, string> = {
  USER: 'bg-amber-100 text-amber-700',
  WEBHOOK: 'bg-violet-100 text-violet-700',
  SYSTEM: 'bg-slate-200 text-slate-700',
};

type ActorBadgeProps = {
  actorType: ActorType;
  /** true เมื่อควรมีชื่อผู้ทำแต่ไม่มี ทำให้ USER โผล่ขึ้นมาเตือน */
  unknown?: boolean;
};

export function ActorBadge({ actorType, unknown = false }: ActorBadgeProps) {
  // USER ที่มี user_id ครบคือกรณีปกติ ไม่ต้องติดป้ายให้รก
  if (actorType === 'USER' && !unknown) return null;

  return (
    <span className={`${BADGE} ${ACTOR_STYLES[actorType]}`}>{actorType}</span>
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
