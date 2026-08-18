import {
  ACTIVITY_LOG_LOCALE,
  ACTIVITY_LOG_TIME_ZONE,
} from '@/app/constant/activity-log';
import type { ActorType } from '@/app/(DashboardLayout)/types/activity-log';

export function formatLogDate(iso: string | null): string {
  if (!iso) return '-';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '-';

  return date.toLocaleString(ACTIVITY_LOG_LOCALE, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: ACTIVITY_LOG_TIME_ZONE,
  });
}

export function formatActor(
  actorType: ActorType,
  userId: string | null,
): string {
  if (actorType !== 'USER') return actorType;
  return userId ? `User ${userId}` : 'User (ไม่ระบุ)';
}
