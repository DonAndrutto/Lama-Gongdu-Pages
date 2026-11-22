import { Moon, Sun, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ReadingControls() {
  const [dark, setDark] = useState(() => localStorage.getItem('lama-gongdu-theme') === 'dark');
  const [size, setSize] = useState(() => {
    const stored = Number(localStorage.getItem('lama-gongdu-font-size'));
    return [14,16,18,20,22,24].includes(stored) ? stored : 16;
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('lama-gongdu-theme', dark ? 'dark' : 'light');
  }, [dark]);
  useEffect(() => {
    document.documentElement.style.fontSize = size + 'px';
    localStorage.setItem('lama-gongdu-font-size', String(size));
  }, [size]);
  return <div className="bottom-bar"><div className="bar-inner">
    <button className="bar-btn" aria-label="Toggle theme" aria-pressed={dark} onClick={() => setDark(!dark)}>{dark ? <Sun/> : <Moon/>}</button>
    <div className="bar-group size-controls">
      <button className="bar-btn" disabled={size===14} aria-label="Decrease text size" onClick={() => setSize(size-2)}><ZoomOut/></button>
      <button className="bar-btn" disabled={size===24} aria-label="Increase text size" onClick={() => setSize(size+2)}><ZoomIn/></button>
    </div>
  </div></div>;
}
