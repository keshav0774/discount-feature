import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CouponCard({ code }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="flex items-center gap-2.5 bg-bg-card border border-dashed border-border-bright rounded-md px-[18px] py-4 max-w-[320px] mx-auto mb-3">
      <div className="flex-1 font-mono text-[17px] font-semibold tracking-wide text-left">{code}</div>
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={
          'font-mono text-[11.5px] px-3 py-2 rounded-md border transition-colors ' +
          (copied
            ? 'text-success border-success'
            : 'text-text-dim border-border-bright bg-bg-elevated hover:text-white hover:border-white/40')
        }
      >
        {copied ? 'Copied ✓' : 'Copy'}
      </motion.button>
    </div>
  );
}
