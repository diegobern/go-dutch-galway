import { isDemoMode } from '@/lib/demo';
export default function DemoBadge() {
  if (!isDemoMode()) return null;
  return <div className="demo-badge">✦ Demo mode</div>;
}
