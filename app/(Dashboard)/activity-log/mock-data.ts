import { ACTIVITY_ACTIONS, ACTIVITY_ENTITIES } from './constants';
import type { ActivityLog } from "./types";

/** 3 แถวจริงที่ดึงมาจากฐานข้อมูล */
const REAL_LOGS: ActivityLog[] = [
    {
        id: '005989e2-c46f-455f-a27e-e9fe8207c719',
        entity: 'saving_contract',
        action: 'updated',
        entity_id: 'bcc701d0-dbe4-4c95-8f6e-d86e3997e8d7',
        actor_type: 'USER',
        user_id: '6374',
        metadata:
            '{"qtRef": null, "remark": "test close saving contract", "statusTo": "OVERDUE", "statusFrom": "PENDING", "vatInclude": false}',
        description:
            'saving_contract bcc701d0-dbe4-4c95-8f6e-d86e3997e8d7 was updated',
        created_at: '2026-08-10 08:33:19.601395+00',
    },
    {
        id: '0064c1b2-3b71-4528-b43a-0aa71d049fcc',
        entity: 'saving_contract',
        action: 'created',
        entity_id: 'fb07088d-f6ec-4728-a39a-2c9ab2ef179b',
        actor_type: 'USER',
        user_id: null,
        metadata: '{"qtRef": "QT7", "periods": 4, "netAmount": 150}',
        description: 
            'saving_contract fb07088d-f6ec-4728-a39a-2c9ab2ef179b was created',
        created_at:
            '2026-06-18 03:10:03.510976+00'
    },
    {
        id: '0098f2b7-d884-4b13-a365-75ba202913df',
        entity: 'invoice',
        action: 'updated',
        entity_id: '87e4111f-2f29-476b-8aa2-a0c3aaab89b1',
        actor_type: 'WEBHOOK',
        user_id: null,
        metadata: '{"amount": "2714.00", "statusTo": "PAID", "statusFrom": "VERIFYING"}',
        description:
            'invoice 87e4111f-2f29-476b-8aa2-a0c3aaab89b1 was updated',
        created_at:
            '2026-08-13 08:50:30.976022+00',
    },
];

/* ---------------------------------------------------------------
   ข้อมูลสังเคราะห์สำหรับทดสอบ filter กับ pagination
   ใช้ตัวสุ่มแบบมี seed ผลลัพธ์เหมือนเดิมทุกครั้งที่รัน
   ตอนต่อ API จริงลบตั้งแต่บรรทัดนี้ลงไป
---------------------------------------------------------------- */

const ACTORS = ['6374', '2011', '8890', 'admin.ploy', 'admin.krit'];
const SERVICES = ['stripe-webhook', 'billing-cron', 'sync-worker'];
const ACTOR_TYPES_POOL = ['USER', 'USER', 'USER', 'WEBHOOK', 'SYSTEM'] as const;

/** LCG เล็กๆ ให้ผลคงที่ ไม่ใช้ Math.random กัน hydration ไม่ตรงกัน */
function makeRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function fakeUuid(rand: () => number): string {
  const hex = '0123456789abcdef';
  let out = '';
  for (let i = 0; i < 32; i++) {
    out += hex[Math.floor(rand() * 16)];
    if (i === 7 || i === 11 || i === 15 || i === 19) out += '-';
  }
  return out;
}

function buildFakeLogs(count: number): ActivityLog[] {
  const rand = makeRandom(20260819);
  const rows: ActivityLog[] = [];

  for (let i = 0; i < count; i++) {
    const entity = ACTIVITY_ENTITIES[Math.floor(rand() * ACTIVITY_ENTITIES.length)];
    const action = ACTIVITY_ACTIONS[Math.floor(rand() * ACTIVITY_ACTIONS.length)];
    const actorType = ACTOR_TYPES_POOL[Math.floor(rand() * ACTOR_TYPES_POOL.length)];
    const entityId = fakeUuid(rand);

    const userId =
      actorType === 'USER'
        ? ACTORS[Math.floor(rand() * ACTORS.length)]
        : actorType === 'WEBHOOK'
          ? SERVICES[Math.floor(rand() * SERVICES.length)]
          : null;

    const month = 1 + Math.floor(rand() * 8);
    const day = 1 + Math.floor(rand() * 28);
    const hh = Math.floor(rand() * 24);
    const mm = Math.floor(rand() * 60);
    const ss = Math.floor(rand() * 60);

    rows.push({
      id: fakeUuid(rand),
      entity,
      action,
      entity_id: entityId,
      actor_type: actorType,
      user_id: userId,
      metadata: JSON.stringify({
        source: actorType.toLowerCase(),
        amount: Math.floor(rand() * 90000) / 100,
        retryCount: Math.floor(rand() * 3),
        reviewed: rand() > 0.5,
        note: null,
      }),
      description: `${entity} ${entityId} was ${action}`,
      created_at: `2026-${pad(month)}-${pad(day)} ${pad(hh)}:${pad(mm)}:${pad(ss)}.000000+00`,
    });
  }

  return rows;
}

export const mockLogs: ActivityLog[] = [...REAL_LOGS, ...buildFakeLogs(157)];
