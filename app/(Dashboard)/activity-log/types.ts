import { exportTraceState } from "next/dist/trace";

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

export type ActivityEntity = (typeof ACTIVITY_ENTITIES)[number];

export type ActivityAction = 'created' | 'updated' | 'deleted';

export type ActorType = 'USER' | 'WEBHOOK' | 'SYSTEM';

export type ActivityLog = {
    id: string;
    entity: ActivityEntity;
    action: ActivityAction;
    entity_id: string;
    actor_type: ActorType;
    user_id: string | null;
    metadata: string;
    description: string;
    created_at: string;
}