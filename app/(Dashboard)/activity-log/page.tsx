import { ActivityLogViewer } from './components/ActivityLogViewer';
import { mockLogs } from './mock-data';
import { TOTAL_LOG_COUNT } from './constants';

export const metadata = {
  title: 'Activity Log',
};

export default function ActivityLogPage() {
  return <ActivityLogViewer logs={mockLogs} totalCount={TOTAL_LOG_COUNT} />;
}
