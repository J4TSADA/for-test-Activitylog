import LogTable from './LogTable';
import { mockLogs } from './mock-data';

export default function ActivityLogPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Activity Log</h1>
      <LogTable logs={mockLogs} />
    </div>
  );
}