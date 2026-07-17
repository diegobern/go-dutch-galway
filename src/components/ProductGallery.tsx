'use client';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, next, prev]);
  return (
    <div className="gallery">
      <div className="main" onClick={() => setOpen(true)} role="button" aria-label="Open image">
        <Image src={images[idx]} alt={name} fill priority sizes="(max-width:1024px) 100vw, 560px" style={{ objectFit: 'cover' }} />
      </div>
      {images.length > 1 && (
        <div className="thumbs">
          {images.map((src, i) => (
            <button key={i} className={i === idx ? 'sel' : ''} onClick={() => setIdx(i)} aria-label={`Image ${i + 1}`} style={{ position: 'relative' }}>
              <Image src={src} alt="" fill sizes="72px" style={{ objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
      {open && (
        <div className="lightbox" onClick={() => setOpen(false)}>
          <button className="lb-btn lb-close" aria-label="Close" onClick={(e) => { e.stopPropagation(); setOpen(false); }}>✕</button>
          {images.length > 1 && <button className="lb-btn lb-prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[idx]} alt={name} onClick={(e) => e.stopPropagation()} />
          {images.length > 1 && <button className="lb-btn lb-next" aria-label="Next" onClick={(e) => { e.stopPropagation(); next(); }}>›</button>}
          <div className="lb-count">{idx + 1} / {images.length}</div>
        </div>
      )}
    </div>
  );
}
