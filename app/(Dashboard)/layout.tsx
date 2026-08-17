import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: 220,
          background: '#1e1e2d',
          color: '#fff',
          padding: 16,
          flexShrink: 0,
        }}
      >
        <h2 style={{ fontSize: 18, marginBottom: 24 }}>DDG Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link href="/activity-log" style={{ color: '#ccc' }}>
            Activity Log
          </Link>
          <Link href="/customers" style={{ color: '#ccc' }}>
            Customers
          </Link>
        </nav>
      </aside>

      <main style={{ flex: 1, overflow: 'auto' }}>{children}</main>
    </div>
  );
}