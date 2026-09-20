import { useEffect, useRef, useState } from 'react';

export function useCountdown(onExpire) {
  const [remaining, setRemaining] = useState(0);
  const intervalRef = useRef(null);

  function start(seconds) {
    clearInterval(intervalRef.current);
    setRemaining(seconds);
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onExpire && onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function stop() {
    clearInterval(intervalRef.current);
  }

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const label = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return { remaining, label, start, stop };
}

export function useCountdownTo(expiresAt) {
  const [remaining, setRemaining] = useState(expiresAt ? expiresAt - Date.now() : 0);

  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => setRemaining(Math.max(0, expiresAt - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  const totalSec = Math.floor(remaining / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  const label = remaining <= 0 ? 'expired' : `${m}:${String(s).padStart(2, '0')}`;

  return { remaining, label, expired: remaining <= 0 };
}