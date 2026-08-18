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

export const ACTION_STYLES: Record<
    (typeof ACTIVITY_ACTIONS)[number],
    string
> = {
    created: 'text-emerald-700 bg-emerald-100',
    updated: 'text-blue-700 bg-blue-100',
    deleted: 'text-red-700 bg-red-100',
};

export const TOTAL_LOG_COUNT = 2451;