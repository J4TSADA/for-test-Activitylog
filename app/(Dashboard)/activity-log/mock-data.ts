import type { ActivityLog } from "./types";

export const mockLogs: ActivityLog[] = [
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
        user_id: 'null',
        metadata: '{"qtRef": "QT7", "periods": 4, "netAmount": 150"}',
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
        user_id: 'null',
        metadata: '{"amount": "2714.00", "statusTo": "PAID", "statusFrom": "VERIFYING"}',
        description:
            'invoice 87e4111f-2f29-476b-8aa2-a0c3aaab89b1 was updated',
        created_at:
            '2026-08-13 08:50:30.976022+00',
    },
];