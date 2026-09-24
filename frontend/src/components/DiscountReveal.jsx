import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CouponCard from './CouponCard.jsx';
import TerminalLines from './TerminalLines.jsx';
import { useCountdownTo } from '../hooks/useCountdown.js';

const VALIDATION_LINES = [
  'validating solution...',
  'solution verified...',
  'calculating reward...',
];

const SEQUENCE_DURATION_MS =
  VALIDATION_LINES.length * 320 + 700;

export default function DiscountReveal({
  result,
  onCheckout,
  onViewCourse,
}) {
  const {
    solved,
    discountValue,
    couponCode,
    expiresAt,
  } = result;

  const { label } = useCountdownTo(expiresAt);

  const [phase, setPhase] = useState(
    solved ? 'validating' : 'granted'
  );

  useEffect(() => {
    if (!solved) return;

    const t = setTimeout(
      () => setPhase('granted'),
      SEQUENCE_DURATION_MS
    );

    return () => clearTimeout(t);
  }, [solved]);

  return (
    <div className="relative text-center px-6 sm:px-8 pt-12 pb-10 min-h-[390px] flex flex-col items-center justify-center overflow-hidden">

      {/* cinematic background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-1/2 top-1/2 w-56 h-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-3xl"
          animate={{
            scale: [0.8, 1.15, 0.8],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <AnimatePresence mode="wait">
        {phase === 'validating' ? (
          <motion.div
            key="validating"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            className="relative w-full max-w-[340px] text-left"
          >
            <div className="font-mono text-[9px] tracking-[0.2em] text-text-faint mb-3">
              REWARD PROTOCOL // PROCESSING
            </div>

            <div className="bg-[#050505] border border-border-bright rounded-md p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <TerminalLines
                lines={VALIDATION_LINES}
                lastLineClassName="text-white"
              />

              <motion.div
                className="mt-5 h-px bg-white/10 overflow-hidden"
              >
                <motion.div
                  className="h-full bg-white/60"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: SEQUENCE_DURATION_MS / 1000,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="granted"
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.2, 0.9, 0.3, 1],
            }}
            className="relative w-full"
          >
            {/* access granted */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.05em' }}
              animate={{
                opacity: 1,
                letterSpacing: '0.18em',
              }}
              transition={{ duration: 0.5 }}
              className={
                'inline-flex items-center gap-2 font-mono text-[10px] px-3.5 py-1.5 rounded-full border mb-5 ' +
                (solved
                  ? 'text-success bg-success/5 border-success/30'
                  : 'text-text-dim bg-bg-card border-border')
              }
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />

              {solved
                ? 'ACCESS GRANTED'
                : 'BASE REWARD APPLIED'}
            </motion.div>

            <div className="font-mono text-[9px] tracking-[0.25em] text-text-faint mb-2">
              REWARD UNLOCKED
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.12,
                duration: 0.55,
                ease: [0.2, 0.9, 0.3, 1.3],
              }}
              className="font-display font-extrabold text-[72px] sm:text-[82px] leading-none mb-2 bg-gradient-to-b from-white via-white to-text-dim bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,255,255,0.18)]"
            >
              {discountValue}%
            </motion.div>

            <div className="font-mono text-[11px] text-text-faint tracking-[0.18em] mb-8">
              DISCOUNT AUTHORIZED
            </div>

            <CouponCard code={couponCode} />

            <div className="font-mono text-[10.5px] text-text-faint mb-7">
              VALID UNTIL{' '}
              <span className="text-white font-semibold">
                {label}
              </span>
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={onCheckout}
                className="font-semibold text-[13.5px] bg-white text-black px-6 py-3 rounded-full hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(255,255,255,0.08)]"
              >
                Continue to Checkout →
              </button>

              {solved && (
                <button
                  onClick={onViewCourse}
                  className="font-semibold text-[13.5px] bg-bg-card text-text-dim border border-border px-6 py-3 rounded-md hover:text-white hover:border-border-bright transition-colors"
                >
                  View Course
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}