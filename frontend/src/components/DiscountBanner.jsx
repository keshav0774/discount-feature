import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function useLiveCountdown(targetTime) {
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (!targetTime) return;
    function tick() {
      const remaining = Math.max(0, targetTime - Date.now());
      const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
      const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      setLabel(days > 0 ? `${days}d ${hours}h` : `${hours}h`);
    }
    tick();
    const id = setInterval(tick, 60 * 1000); // update every minute
    return () => clearInterval(id);
  }, [targetTime]);

  return label;
}

export default function DiscountBanner({ onOpen, status }) {
  const cooldownLabel = useLiveCountdown(status?.cooldownEndsAt);
  const onCooldown = status?.onCooldown;
  const isActive = status?.active;

  return (
    <div className="max-w-[1180px] mx-auto px-7 pt-4">
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Unlock a discount by completing a developer challenge"
        onClick={onCooldown ? undefined : onOpen}
        onKeyDown={(e) => {
          if (onCooldown) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen();
          }
        }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={onCooldown ? {} : { y: -2 }}
        className={
          'relative flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6 ' +
          'bg-gradient-to-r from-[#0b0b0d] via-[#0e0d12] to-[#0b0b0d] ' +
          'border border-border-bright rounded-lg px-6 py-5 transition-colors ' +
          (onCooldown ? 'cursor-default opacity-80' : 'cursor-pointer hover:border-white/25')
        }
      >
        {/* glow layer — clipped to its own wrapper, never clips real content */}
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          <div className="absolute -top-[60%] left-[8%] w-64 h-64 rounded-full bg-white/[0.04] blur-2xl" />
          <div className="absolute -bottom-[70%] right-[18%] w-56 h-56 rounded-full bg-white/[0.03] blur-2xl" />
        </div>

        {/* left group: cube + text, always travel together and stay vertically centered */}
        <div className="relative z-10 flex items-center gap-4 min-w-0">
          <div className="shrink-0 w-12 h-12 cube-perspective">
            <motion.div
              className="w-full h-full relative preserve-3d"
              animate={{ rotateY: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
            >
              <motion.div
                className="w-full h-full preserve-3d"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="face-front absolute w-12 h-12 rounded-lg border border-border-bright bg-bg-card flex items-center justify-center font-mono text-[13px] font-bold text-text">
                  {'</>'}
                </div>
                <div className="face-right absolute w-12 h-12 rounded-lg border border-border-bright bg-bg-card flex items-center justify-center font-mono text-[13px] font-bold text-text-dim">
                  {'{ }'}
                </div>
                <div className="face-back absolute w-12 h-12 rounded-lg border border-border-bright bg-bg-card-hover flex items-center justify-center font-mono text-[13px] font-bold text-text">
                  ◆
                </div>
                <div className="face-left absolute w-12 h-12 rounded-lg border border-border-bright bg-bg-card flex items-center justify-center font-mono text-[13px] font-bold text-text-dim">
                  λ
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="min-w-0">
            {onCooldown ? (
              <>
                <div className="font-display font-bold text-[15.5px]">
                  You've already claimed your <span className="text-text">reward</span>.
                </div>
                <div className="text-[12.5px] text-text-dim font-mono">
                  Next offer unlocks in {cooldownLabel || '…'}
                </div>
              </>
            ) : isActive ? (
              <>
                <div className="font-display font-bold text-[15.5px]">
                  Your <span className="text-text">reward</span> is ready.
                </div>
                <div className="text-[12.5px] text-text-dim font-mono">
                  View your unlocked coupon before it expires
                </div>
              </>
            ) : (
              <>
                <div className="font-display font-bold text-[15.5px]">
                  A hidden <span className="text-text">reward</span> is waiting.
                </div>
                <div className="text-[12.5px] text-text-dim font-mono">
                  Complete one developer challenge <span className="text-text-dim">→</span> unlock your offer
                </div>
              </>
            )}
          </div>
        </div>

        {/* right group: chip + button, always travel together */}
        <div className="relative z-10 flex items-center gap-3.5 shrink-0 justify-between lg:justify-end">
          {onCooldown ? (
            <div className="font-mono text-[12px] text-text-faint bg-bg-card border border-border px-4 py-2.5 rounded-full whitespace-nowrap">
              🔒 Locked
            </div>
          ) : (
            <>
              <div className="hidden sm:block font-mono text-[10.5px] text-text-faint bg-bg-card border border-border px-2.5 py-1.5 rounded-full whitespace-nowrap">
                4 CHALLENGES • 1 REWARD
              </div>
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="font-sans font-semibold text-[13px] bg-text text-bg border-none px-5 py-2.5 rounded-full whitespace-nowrap flex items-center gap-1.5 shadow-lg shadow-white/5"
              >
                {isActive ? 'View My Coupon →' : 'Unlock Discount →'}
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}