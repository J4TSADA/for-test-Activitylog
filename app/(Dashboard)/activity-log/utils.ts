import type { ActivityLog, ActorType } from './types';

/** '2026-08-10 08:33:19.601395+00' -> Date ที่ parse ได้จริงทุก browser */
function toDate(raw: string): Date | null {
  if (!raw) return null;

  const iso = raw
    .trim()
    .replace(' ', 'T')
    .replace(/(\.\d{3})\d+/, '$1')
    .replace(/([+-]\d{2})$/, '$1:00');

  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatTimestamp(raw: string): string {
  const date = toDate(raw);
  if (!date) return '-';

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', {
    month: 'short',
    timeZone: 'UTC',
  });
  const year = date.getUTCFullYear();
  const hh = String(date.getUTCHours()).padStart(2, '0');
  const mm = String(date.getUTCMinutes()).padStart(2, '0');
  const ss = String(date.getUTCSeconds()).padStart(2, '0');

  return `${day} ${month} ${year}, ${hh}:${mm}:${ss}`;
}

/** '10 Aug 2026' บรรทัดบนของคอลัมน์ Timestamp */
export function formatDatePart(raw: string): string {
  const date = toDate(raw);
  if (!date) return '-';

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', {
    month: 'short',
    timeZone: 'UTC',
  });
  return `${day} ${month} ${date.getUTCFullYear()}`;
}

/** '08:33:19' บรรทัดล่าง */
export function formatTimePart(raw: string): string {
  const date = toDate(raw);
  if (!date) return '';

  const hh = String(date.getUTCHours()).padStart(2, '0');
  const mm = String(date.getUTCMinutes()).padStart(2, '0');
  const ss = String(date.getUTCSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

export function shortId(id: string): string {
  if (!id) return '-';
  return `${id.slice(0, 5)}...`;
}

/**
 * คืนชื่อผู้ทำ โดยแยกให้ชัดว่าทำไมถึงไม่มีชื่อ
 * SYSTEM ไม่มี user_id เป็นเรื่องปกติ ส่วน USER/WEBHOOK ที่ไม่มีคือข้อมูลขาด
 */
export function formatActor(
  userId: string | null,
  actorType: ActorType,
): string {
  const trimmed = userId?.trim() ?? '';
  const missing = !trimmed || trimmed.toLowerCase() === 'null';

  if (!missing) return trimmed;

  if (actorType === 'SYSTEM') return 'ระบบอัตโนมัติ';
  if (actorType === 'WEBHOOK') return 'ไม่ทราบต้นทาง';
  return 'ไม่ทราบผู้ใช้';
}

/** true เมื่อควรมีชื่อผู้ทำแต่กลับไม่มี ใช้ตัดสินว่าจะเตือนไหม */
export function isActorUnknown(
  userId: string | null,
  actorType: ActorType,
): boolean {
  if (actorType === 'SYSTEM') return false;
  const trimmed = userId?.trim() ?? '';
  return !trimmed || trimmed.toLowerCase() === 'null';
}

export function parseMetadata(raw: string): Record<string, unknown> {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
    return {};
  } catch {
    return { _raw: raw, _parseError: true };
  }
}

export function buildSearchHaystack(log: ActivityLog): string {
  return `${log.id} ${log.user_id ?? ''} ${log.description} ${log.entity}`.toLowerCase();
}
