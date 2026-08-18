import type {
  ActivityLog,
  ActivityLogRaw,
} from '@/app/(DashboardLayout)/types/activity-log';

/** ฐานข้อมูลบางแถวส่ง string "null"/"" กลับมาแทน null จริง */
function toNullable(value: string | null): string | null {
  if (value === null) return null;
  const trimmed = value.trim();
  if (trimmed === '' || trimmed.toLowerCase() === 'null') return null;
  return trimmed;
}

function parseMetadata(raw: string): Record<string, unknown> {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
    return {};
  } catch {
    // metadata พังไม่ควรทำให้ทั้งหน้าล้ม — คืน object ว่างแล้วเก็บค่าดิบไว้ debug
    return { _raw: raw, _parseError: true };
  }
}

export function normalizeActivityLog(raw: ActivityLogRaw): ActivityLog {
  return {
    ...raw,
    user_id: toNullable(raw.user_id),
    metadata: parseMetadata(raw.metadata),
  };
}
