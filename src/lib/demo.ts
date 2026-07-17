export const isDemoMode = () => (process.env.NEXT_PUBLIC_DEMO_MODE ?? 'true') !== 'false';
export const demoAdmin = { name: 'Demo Admin', email: 'demo-admin@go-dutch.local', role: 'owner' };
