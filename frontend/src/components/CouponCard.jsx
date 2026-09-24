import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CouponCard({ code }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="relative flex items-center gap-3 bg-[#050505] border border-dashed border-white/25 rounded-md px-4 py-4 max-w-[330px] mx-auto mb-4"
    >
      <div className="absolute -top-2 left-4 px-2 bg-bg-elevated font-mono text-[8px] tracking-[0.15em] text-text-faint">
        COUPON // GENERATED
      </div>

      <div className="flex-1 font-mono text-[17px] font-semibold tracking-[0.12em] text-left text-white">
        {code}
      </div>

      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={
          'font-mono text-[10px] px-3 py-2 rounded border transition-all ' +
          (copied
            ? 'text-success border-success'
            : 'text-text-dim border-border-bright hover:text-white hover:border-white/50')
        }
      >
        {copied ? 'COPIED ✓' : 'COPY'}
      </motion.button>
    </motion.div>
  );
}