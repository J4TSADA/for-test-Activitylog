import type { ActivityLog } from './types';

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

  const day = date.getUTCDate();
  const month = date.toLocaleString('en-US', {
    month: 'short',
    timeZone: 'UTC',
  });
  const hh = String(date.getUTCHours()).padStart(2, '0');
  const mm = String(date.getUTCMinutes()).padStart(2, '0');
  const ss = String(date.getUTCSeconds()).padStart(2, '0');

  return `${day} ${month}, ${hh}:${mm}:${ss}`;
}

export function shortId(id: string): string {
  if (!id) return '-';
  return `${id.slice(0, 5)}...`;
}

export function formatActor(userId: string | null): string {
  if (!userId) return 'ไม่ระบุ';
  const trimmed = userId.trim();
  if (!trimmed || trimmed.toLowerCase() === 'null') return 'ไม่ระบุ';
  return trimmed;
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
