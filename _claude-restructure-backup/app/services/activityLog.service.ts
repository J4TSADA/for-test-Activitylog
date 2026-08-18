import { mockActivityLogs } from './mock/activity-log.mock';
import { normalizeActivityLog } from '@/app/(DashboardLayout)/utilities/activityLogNormalize';
import type {
  ActivityLog,
  ActivityLogRaw,
} from '@/app/(DashboardLayout)/types/activity-log';

/**
 * ตอนนี้อ่านจาก mock ก่อน
 * ถ้าต่อ API จริง เปลี่ยนแค่ fetchActivityLogsRaw() ตัวเดียว ส่วนที่เหลือไม่ต้องแตะ
 */
async function fetchActivityLogsRaw(): Promise<ActivityLogRaw[]> {
  return mockActivityLogs;
}

export async function getActivityLogs(): Promise<ActivityLog[]> {
  const rows = await fetchActivityLogsRaw();
  return rows.map(normalizeActivityLog);
}
