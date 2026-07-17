'use client';
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24 }}>
      <div>
        <h1 style={{ fontSize: 28, color: 'var(--brand-900)' }}>Something went wrong</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 18 }}>Please try again.</p>
        <button className="btn btn-primary" onClick={() => reset()}>Retry</button>
      </div>
    </div>
  );
}
