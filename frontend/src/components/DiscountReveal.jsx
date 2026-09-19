import { useEffect, useState } from 'react';
import CouponCard from './CouponCard.jsx';
import { useCountdownTo } from '../hooks/useCountdown.js';

const CONFETTI_COLORS = ['#f5f5f6', '#c9cbd1', '#8e909a'];

function Confetti() {
  const [bits, setBits] = useState([]);

  useEffect(() => {
    const next = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: 40 + Math.random() * 20,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 0.2,
      dx: (Math.random() - 0.5) * 160,
    }));
    setBits(next);
    const t = setTimeout(() => setBits([]), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bits.map((b) => (
        <div
          key={b.id}
          className="absolute top-[40%] w-1.5 h-1.5 rounded-[1px] animate-confetti-fall"
          style={{
            left: `${b.left}%`,
            background: b.color,
            animationDelay: `${b.delay}s`,
            transform: `translateX(${b.dx}px)`,
          }}
        />
      ))}
    </div>
  );
}

export default function DiscountReveal({ result, onCheckout, onViewCourse }) {
  const { solved, discountValue, couponCode, expiresAt } = result;
  const { label } = useCountdownTo(expiresAt);

  return (
    <div className="relative text-center px-8 pt-11 pb-9 animate-fade-up">
      {solved && <Confetti />}

      <div
        className={
          'inline-flex items-center gap-2 font-mono text-[12.5px] px-3.5 py-1.5 rounded-full border mb-5.5 mb-[22px] ' +
          (solved
            ? 'text-success bg-success/10 border-success/30'
            : 'text-text-dim bg-bg-card border-border')
        }
      >
        {solved ? '✓ Challenge Complete!' : 'Base discount'}
      </div>

      <div
        className={
          'font-display font-extrabold text-[64px] mb-1.5 animate-percent-in ' +
          (solved
            ? 'bg-gradient-to-br from-white to-text-dim bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(245,245,246,0.25)]'
            : 'text-text')
        }
      >
        {discountValue}%
      </div>
      <div className="text-text-dim text-[14.5px] mb-8">
        {solved ? 'Your exclusive discount has been unlocked.' : 'You skipped the challenge and unlocked your base discount.'}
      </div>

      <CouponCard code={couponCode} />

      {solved && (
        <div className="text-[12.5px] text-text-faint font-mono mb-7.5 mb-[30px]">
          Expires in <span className="text-accent font-semibold">{label}</span>
        </div>
      )}

      <div className="flex gap-3 justify-center flex-wrap mt-2">
        <button
          onClick={onCheckout}
          className="font-semibold text-[14.5px] bg-text text-bg px-6 py-3 rounded-full shadow-lg shadow-white/10 hover:opacity-90 transition-opacity"
        >
          Continue to Checkout
        </button>
        {solved && (
          <button
            onClick={onViewCourse}
            className="font-semibold text-[14.5px] bg-bg-card text-text-dim border border-border px-6 py-3 rounded-sm hover:text-text hover:border-border-bright"
          >
            View Course
          </button>
        )}
      </div>
    </div>
  );
}
