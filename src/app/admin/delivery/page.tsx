'use client';
import { useState } from 'react';
export default function AdminDelivery() {
  const [zones, setZones] = useState([
    { name: 'Galway City', fee: 9.95 }, { name: 'Co. Galway', fee: 9.95 },
    { name: 'Nationwide', fee: 9.95 }, { name: 'In-store pickup', fee: 0 },
  ]);
  const [saved, setSaved] = useState(false);
  return (
    <>
      <div className="adm-h"><div><h1>Deliveries</h1><p>Zones, charges, slots and special dates.</p></div><button className="adm-btn" onClick={() => setSaved(true)}>Save changes</button></div>
      <div className="adm-2">
        <div className="adm-box"><h3>Zones &amp; charges (€)</h3>
          {zones.map((z, i) => (
            <div key={z.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
              <span>{z.name}</span>
              <input type="number" step="0.05" className="field" style={{ width: 110 }} value={z.fee} onChange={(e) => setZones((zs) => zs.map((x, ix) => ix === i ? { ...x, fee: parseFloat(e.target.value) || 0 } : x))} />
            </div>
          ))}
          <label className="lbl">Minimum order (€)</label><input className="field" defaultValue="0" type="number" />
          {saved && <div className="note" style={{ marginTop: 12 }}>Saved (demo). These charges apply at checkout when connected to Firebase.</div>}
        </div>
        <div className="adm-box"><h3>Time slots &amp; special dates</h3>
          <p style={{ color: 'var(--muted)', margin: '0 0 10px' }}>Same-day cut-off: 1pm. Slots: morning (9–1), afternoon (1–6).</p>
          <div className="alert">❤️ Valentine’s Day — capacity nearly full</div>
          <div className="alert" style={{ background: '#e0f2ec', borderColor: '#bfe3d7', color: '#1f8a70' }}>💐 Mother’s Day — bookings open</div>
          <div className="alert" style={{ background: '#eaeef0', borderColor: '#d7dde0', color: '#54606a' }}>🎄 Christmas week — set your cut-off dates</div>
        </div>
      </div>
    </>
  );
}
