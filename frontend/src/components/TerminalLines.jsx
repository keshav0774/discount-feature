import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.32, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.22 } },
};

export default function TerminalLines({ lines, className = '', lastLineClassName = '' }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={'font-mono text-[12px] leading-relaxed ' + className}
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          variants={item}
          className={i === lines.length - 1 ? lastLineClassName || 'text-text' : 'text-text-dim'}
        >
          <span className="text-text-faint">&gt;</span> {line}
        </motion.div>
      ))}
    </motion.div>
  );
}