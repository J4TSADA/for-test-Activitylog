import type {
  ACTIVITY_ACTIONS,
  ACTIVITY_ENTITIES,
  ACTOR_TYPES,
} from '@/app/constant/activity-log';

export type ActivityEntity = (typeof ACTIVITY_ENTITIES)[number];
export type ActivityAction = (typeof ACTIVITY_ACTIONS)[number];
export type ActorType = (typeof ACTOR_TYPES)[number];

/** แถวดิบที่ได้จาก API / ฐานข้อมูล (metadata ยังเป็น JSON string) */
export type ActivityLogRaw = {
  id: string;
  entity: ActivityEntity;
  action: ActivityAction;
  entity_id: string;
  actor_type: ActorType;
  user_id: string | null;
  metadata: string;
  description: string;
  created_at: string;
};

/** แถวที่ผ่าน normalize แล้ว พร้อมใช้ใน UI */
export type ActivityLog = Omit<ActivityLogRaw, 'metadata'> & {
  metadata: Record<string, unknown>;
};
export type ActivityLogFilter = {
  entity: ActivityEntity | '';
  action: ActivityAction | '';
};

export const EMPTY_ACTIVITY_LOG_FILTER: ActivityLogFilter = {
  entity: '',
  action: '',
};
