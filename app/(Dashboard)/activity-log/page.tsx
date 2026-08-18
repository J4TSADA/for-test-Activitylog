import { ActivityLogViewer } from './components/ActivityLogViewer';
import { mockLogs } from './mock-data';

export const metadata = {
  title: 'Activity Log',
};

export default function ActivityLogPage() {
  return <ActivityLogViewer logs={mockLogs} />;
}
