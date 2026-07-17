'use client';
import { useState } from 'react';
export default function ImagePicker({ label = 'Photo', initial = '' }: { label?: string; initial?: string }) {
  const [preview, setPreview] = useState(initial);
  return (
    <div>
      <label className="lbl" style={{ marginTop: 0 }}>{label}</label>
      <div className="imgpick">
        <div className="imgpick-prev">
          {preview ? <img src={preview} alt="preview" /> : <span>No photo yet</span>}
        </div>
        <div style={{ flex: 1 }}>
          <label className="pick-btn">
            Choose photo
            <input type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) setPreview(URL.createObjectURL(f)); }} />
          </label>
          <input className="field" style={{ marginTop: 10 }} placeholder="…or paste an image URL" onChange={(e) => setPreview(e.target.value)} />
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Shows a live preview here. With Firebase Storage connected, the photo uploads for real.</p>
        </div>
      </div>
    </div>
  );
}
