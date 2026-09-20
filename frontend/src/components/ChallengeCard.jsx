import { motion } from 'framer-motion';

export default function ChallengeCard({ id, icon, title, desc, meta, onSelect }) {
  return (
    <motion.button
      onClick={() => onSelect(id)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="text-left relative bg-bg-card border border-border rounded-md p-5 transition-colors
                 hover:bg-bg-card-hover hover:border-border-bright
                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40 group"
    >
      <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center font-mono font-bold text-[15px] mb-3.5 bg-bg-elevated border border-border text-text">
        {icon}
      </div>
      <div className="font-display font-bold text-[15.5px] mb-1.5">{title}</div>
      <div className="text-text-dim text-[13px] mb-3.5 leading-relaxed">{desc}</div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {meta.map((m) => (
          <span key={m} className="font-mono text-[10.5px] text-text-dim bg-bg-elevated border border-border px-2 py-1 rounded">
            {m}
          </span>
        ))}
      </div>
      <div className="text-[13px] font-semibold text-text flex items-center gap-1.5 group-hover:text-white">
        Start Challenge →
      </div>
    </motion.button>
  );
}
