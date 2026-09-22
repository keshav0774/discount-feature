import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UnlockTerminal from './UnlockTerminal.jsx';

function getMsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

function splitHMS(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  return { hrs, mins, secs };
}

function useLiveHMS(targetTime) {
  const [parts, setParts] = useState({ hrs: 0, mins: 0, secs: 0 });

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

function CountdownBox({ targetTime, label }) {
  const { hrs, mins, secs } = useLiveHMS(targetTime);
  return (
    <div className="bg-bg-card border border-border rounded-md px-4 py-3 shrink-0">
      <div className="font-mono text-[9px] text-text-faint tracking-wide mb-1.5 flex items-center gap-1.5">
        ⏱ {label}
      </div>
      <div className="flex items-center gap-1.5 font-mono">
        <div className="text-center">
          <div className="text-lg font-bold text-text leading-none">{String(hrs).padStart(2, '0')}</div>
          <div className="text-[8px] text-text-faint mt-0.5">HRS</div>
        </div>
        <div className="text-text-faint text-sm pb-3">:</div>
        <div className="text-center">
          <div className="text-lg font-bold text-text leading-none">{String(mins).padStart(2, '0')}</div>
          <div className="text-[8px] text-text-faint mt-0.5">MIN</div>
        </div>
        <div className="text-text-faint text-sm pb-3">:</div>
        <div className="text-center">
          <div className="text-lg font-bold text-text leading-none">{String(secs).padStart(2, '0')}</div>
          <div className="text-[8px] text-text-faint mt-0.5">SEC</div>
        </div>
      </div>
    </div>
  );
}

function CodePreviewBox() {
  return (
    <div className="hidden xl:block bg-bg-card border border-border rounded-md px-4 py-3 font-mono text-[10.5px] leading-relaxed text-text-dim shrink-0 w-[150px]">
      <div>{'{ } '}<span className="text-text-faint">async</span></div>
      <div className="mt-1">
        <span className="text-text-dim">const</span> <span className="text-text">discount</span> =
      </div>
      <div>&nbsp;&nbsp;<span className="text-text">await</span></div>
      <div>&nbsp;&nbsp;solveChallenge();</div>
      <div className="mt-1 text-text-faint">// Unlock your offer</div>
      <div className="text-right text-text-faint mt-1">{'</>'}</div>
    </div>
  );
}

// The three inline pills shown once a coupon is actually unlocked: code, copy, live countdown.
function ActiveCouponRow({ status }) {
  const [copied, setCopied] = useState(false);
  const { hrs, mins, secs } = useLiveHMS(status?.expiresAt);

  function handleCopy() {
    if (!status?.couponCode) return;
    navigator.clipboard.writeText(status.couponCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center xl:justify-end">
      <div className="font-mono text-[14px] font-semibold bg-bg-card border border-border-bright px-5 py-2.5 rounded-full whitespace-nowrap">
        {status.couponCode}
      </div>

      <button
        onClick={handleCopy}
        className={
          'font-mono text-[11.5px] px-4 py-2.5 rounded-full border transition-colors whitespace-nowrap ' +
          (copied
            ? 'text-success border-success'
            : 'text-text-dim border-border-bright bg-bg-card hover:text-white hover:border-white/40')
        }
      >
        {copied ? 'Copied ✓' : 'Copy'}
      </button>

      <div className="bg-bg-card border border-border rounded-full px-4 py-2.5 font-mono text-[12px] text-text-dim whitespace-nowrap">
        ⏱ {String(hrs).padStart(2, '0')}:{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </div>
    </div>
  );
}

export default function DiscountBanner({ onOpen, status }) {
    if (status === null) {
    return (
      <div className="max-w-[1180px] mx-auto px-7 pt-4">
        <div className="relative bg-gradient-to-r from-[#0b0b0d] via-[#0e0d12] to-[#0b0b0d] border border-border-bright rounded-lg p-6 h-[132px] xl:h-[104px] animate-pulse" />
      </div>
    );
  }
  
  const onCooldown = status?.onCooldown;
  const isActive = status?.active;

  const headline = onCooldown
    ? "You've already claimed your reward."
    : isActive
    ? 'Your discount is ready to claim.'
    : (
      <>Solve the Challenge.<br />Unlock Your Discount.</>
    );

  const description = onCooldown
    ? 'Come back once your cooldown ends for the next exclusive offer.'
    : isActive
    ? 'Copy your coupon below and use it before the timer runs out.'
    : 'Complete a short developer challenge and get an exclusive coupon up to 30% off on your next subscription.';

  return (
    <div className="max-w-[1180px] mx-auto px-7 pt-4">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative bg-gradient-to-r from-[#0b0b0d] via-[#0e0d12] to-[#0b0b0d]
                   border border-border-bright rounded-lg p-6 overflow-hidden"
      >
        {/* ambient glow, clipped to its own layer */}
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          <div className="absolute -top-[60%] left-[10%] w-72 h-72 rounded-full bg-white/[0.04] blur-3xl" />
          <div className="absolute -bottom-[70%] right-[15%] w-64 h-64 rounded-full bg-white/[0.03] blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center gap-6 xl:gap-8">
          {/* left: terminal visual, replaces the gift-box */}
          <div className="shrink-0 mx-auto xl:mx-0">
            <UnlockTerminal />
          </div>

          {/* middle: badge + headline + description + trust row — unchanged across states */}
          <div className="flex-1 min-w-0 text-center xl:text-left">
            <div className="inline-flex items-center gap-1.5 font-mono text-[10.5px] text-text-dim bg-bg-card border border-border px-3 py-1 rounded-full mb-3">
               EXCLUSIVE FOR YOU
            </div>
            <h3 className="font-display font-bold text-[22px] leading-tight mb-2">{headline}</h3>
            <p className="text-text-dim text-[13.5px] max-w-[420px] mx-auto xl:mx-0 mb-4">{description}</p>

            {!onCooldown && !isActive && (
              <div className="flex items-center justify-center xl:justify-start gap-4 flex-wrap font-mono text-[10.5px] text-text-faint">
                <span>{'</>'} Real-world Problems</span>
                <span> Exclusive Discount</span>
                <span>⏱ Limited Time Offer</span>
              </div>
            )}
          </div>

          {/* right side: three different states */}
          {isActive ? (
            <ActiveCouponRow status={status} />
          ) : onCooldown ? (
            <div className="shrink-0">
              <div className="font-mono text-[12px] text-text-faint bg-bg-card border border-border px-4 py-2.5 rounded-full whitespace-nowrap">
                🔒 Locked
              </div>
            </div>
          ) : (
            <>
              <div className="shrink-0 bg-bg-card border border-border rounded-md p-4 text-center xl:text-left min-w-[200px]">
                <div className="text-text-dim text-[12.5px] mb-3">Ready to claim your reward?</div>
                <motion.button
                  onClick={onOpen}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full font-sans font-semibold text-[13px] px-5 py-2.5 rounded-full whitespace-nowrap flex items-center justify-center gap-1.5 bg-text text-bg shadow-lg shadow-white/5"
                >
                  🔓 Start Challenge →
                </motion.button>
              </div>

              <div className="flex items-center gap-3 shrink-0 justify-center xl:justify-end">
                <CountdownBox targetTime={Date.now() + getMsUntilMidnight()} label="TODAY'S CHALLENGE" />
                <CodePreviewBox />
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}