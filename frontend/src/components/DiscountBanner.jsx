import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RewardOrb from './RewardOrb.jsx';

function splitHMS(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  return { hrs, mins, secs };
}

function useLiveHMS(targetTime) {
  const [parts, setParts] = useState({
    hrs: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    if (!targetTime) return;

    function tick() {
      setParts(splitHMS(targetTime - Date.now()));
    }

    tick();

    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, [targetTime]);

  return parts;
}

function RewardPanel({
  locked,
  couponCode,
  timerLabel,
  hms,
  disableCopy,
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!couponCode || disableCopy) return;

    navigator.clipboard.writeText(couponCode).then(() => {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    });
  }

  return (
    <div className="inline-flex items-center gap-3 flex-wrap bg-bg-card/90 backdrop-blur-md border border-border-bright rounded-md px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 pr-3 border-r border-border">
        <span
          className={
            locked
              ? 'text-text-faint text-[13px]'
              : 'text-white text-[13px]'
          }
        >
          {locked ? '🔒' : '✓'}
        </span>

        <span className="font-mono text-[10px] text-text-faint tracking-[0.12em]">
          REWARD PROTOCOL
        </span>
      </div>

      <div className="font-mono text-[13px] font-semibold text-text whitespace-nowrap">
        {couponCode || '—'}
      </div>

      <button
        onClick={handleCopy}
        disabled={disableCopy || !couponCode}
        className={
          'font-mono text-[10.5px] px-3 py-1.5 rounded border transition-all whitespace-nowrap ' +
          (disableCopy || !couponCode
            ? 'text-text-faint border-border cursor-default'
            : copied
              ? 'text-success border-success'
              : 'text-text-dim border-border-bright hover:text-white hover:border-white/50')
        }
      >
        {copied ? 'COPIED ✓' : 'COPY'}
      </button>

      <div className="font-mono text-[11px] text-text-faint whitespace-nowrap">
        {timerLabel}{' '}
        {String(hms.hrs).padStart(2, '0')}:
        {String(hms.mins).padStart(2, '0')}:
        {String(hms.secs).padStart(2, '0')}
      </div>
    </div>
  );
}

export default function DiscountBanner({ onOpen, status }) {
  if (status === null) {
    return (
      <div className="max-w-[1180px] mx-auto px-7 pt-5">
        <div className="h-[120px] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-bg-card animate-pulse" />
        </div>
      </div>
    );
  }

  const onCooldown = status?.onCooldown;
  const isActive = status?.active;

  const activeHms = useLiveHMS(
    isActive ? status.expiresAt : null
  );

  const cooldownHms = useLiveHMS(
    onCooldown ? status.cooldownEndsAt : null
  );

  return (
    <div className="max-w-[1180px] mx-auto px-5 sm:px-7 pt-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        {isActive ? (
          <RewardPanel
            locked={false}
            couponCode={status.couponCode}
            timerLabel="REDEEM"
            hms={activeHms}
          />
        ) : onCooldown ? (
          <RewardPanel
            locked
            couponCode={status.lastCoupon?.code}
            timerLabel="UNLOCKS"
            hms={cooldownHms}
            disableCopy
          />
        ) : (
          <RewardOrb onClick={onOpen} />
        )}
      </motion.div>
    </div>
  );
}