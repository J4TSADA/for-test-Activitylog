import LogTable from '@/app/components/activity-log/LogTable';
import { getActivityLogs } from '@/app/services/activityLog.service';

export const metadata = {
  title: 'Activity Log',
};

export default async function ActivityLogPage() {
  const logs = await getActivityLogs();

  return (
    <div style={{ padding: 24 }}>
      <h1>Activity Log</h1>
      <LogTable logs={logs} />
    </div>
  );
}
