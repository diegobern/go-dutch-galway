import Link from 'next/link';
export default function NotFound() {
  return (
    <div style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24 }}>
      <div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 64, color: 'var(--brand-900)' }}>404</div>
        <h1 style={{ fontSize: 30, color: 'var(--brand-900)', margin: '8px 0' }}>Page not found</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 20 }}>We couldn’t find the page you were looking for.</p>
        <Link className="btn btn-primary" href="/">Back to home</Link>
      </div>
    </div>
  );
}
