import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <main style={{ flex: 1, overflow: 'auto' }}>{children}</main>
    </div>
  );
}