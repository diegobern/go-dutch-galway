export const dynamic = 'force-static';
export default function AdminSettings() {
  return (
    <>
      <div className="adm-h"><div><h1>Settings</h1><p>Staff accounts, roles and store details.</p></div></div>
      <div className="adm-2">
        <div className="adm-box"><h3>Staff &amp; roles</h3>
          <table className="adm" style={{ minWidth: 0 }}>
            <tbody>
              <tr><td>Henk Van Enk</td><td style={{ color: 'var(--muted)' }}>Owner</td><td><span className="pill st-out">Full access</span></td></tr>
              <tr><td>Shop floor</td><td style={{ color: 'var(--muted)' }}>Florist</td><td><span className="pill st-prep">Orders only</span></td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12 }}>Roles are enforced server-side (Firebase custom claims + Firestore rules) — never editable from the browser.</p>
        </div>
        <div className="adm-box"><h3>Store details</h3>
          <label className="lbl" style={{ marginTop: 0 }}>Shop name</label><input className="field" defaultValue="Go Dutch" />
          <label className="lbl">Contact email</label><input className="field" defaultValue="customer.service@go-dutch.ie" />
          <label className="lbl">Phone</label><input className="field" defaultValue="(091) 448 445" />
          <div style={{ marginTop: 14 }}><button className="adm-btn" onClick={() => alert('Saved (demo).')}>Save details</button></div>
        </div>
      </div>
    </>
  );
}
