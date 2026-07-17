'use client';
import { useEffect, useState } from 'react';
export default function ThemeToggle() {
  const [theme, setTheme] = useState('botanical');
  useEffect(() => {
    const t = document.documentElement.getAttribute('data-theme') || 'botanical';
    setTheme(t);
  }, []);
  function toggle() {
    const next = theme === 'botanical' ? 'atelier' : 'botanical';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('godutch_theme', next); } catch {}
    setTheme(next);
  }
  return (
    <button className="theme-toggle" onClick={toggle} title="Switch design concept">
      {theme === 'botanical' ? 'Botanical' : 'Atelier'} theme
    </button>
  );
}
