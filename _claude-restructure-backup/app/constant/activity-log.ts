export const ACTIVITY_ENTITIES = [
  'credit',
  'payment',
  'invoice',
  'saving_contract',
  'saving_contract_request',
  'customer',
  'product',
  'receipt',
  'bank_account',
  'user',
] as const;

export const ACTIVITY_ACTIONS = ['created', 'updated', 'deleted'] as const;

export const ACTOR_TYPES = ['USER', 'WEBHOOK', 'SYSTEM'] as const;

export const ACTIVITY_LOG_TIME_ZONE = 'Asia/Bangkok';
export const ACTIVITY_LOG_LOCALE = 'th-TH';
