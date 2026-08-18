import type {
    ACTIVITY_ENTITIES,
    ACTIVITY_ACTIONS,
    ACTOR_TYPES,
} from './constants';

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

export type ActivityLogFilters = {
    search: string;
    action: ActivityAction | '';
    entity: ActivityEntity | '';
};

export const EMPTY_FILTERS: ActivityLogFilters = {
    search: '',
    action: '',
    entity: '',
};