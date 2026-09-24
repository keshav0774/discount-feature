import { motion } from 'framer-motion';

function ChallengeIcon({ id }) {
  if (id === 'dsa') {
    return (
      <svg
        viewBox="0 0 32 32"
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <path d="M16 5 27 11 16 17 5 11 16 5Z" />
        <path d="m5 16 11 6 11-6" />
        <path d="m5 21 11 6 11-6" />
      </svg>
    );
  }

  if (id === 'ai') {
    return (
      <svg
        viewBox="0 0 32 32"
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <path d="M16 5v22" />
        <path d="M5 16h22" />
        <path d="m8.5 8.5 15 15" />
        <path d="m23.5 8.5-15 15" />
        <circle cx="16" cy="16" r="5.5" />
      </svg>
    );
  }

  if (id === 'System_Design') {
    return (
      <svg
        viewBox="0 0 32 32"
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <path d="M5 10V6h4" />
        <path d="M27 10V6h-4" />
        <path d="M5 22v4h4" />
        <path d="M27 22v4h-4" />

        <path d="M10 16h12" />
        <path d="m13 13-3 3 3 3" />
        <path d="m19 13 3 3-3 3" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 32 32"
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M16 4 26 8v7c0 6.5-4.2 10.5-10 13-5.8-2.5-10-6.5-10-13V8l10-4Z" />
      <path d="m11.5 16 3 3 6-6" />
    </svg>
  );
}

function getPathNumber(id) {
  if (id === 'dsa') return '01';
  if (id === 'ai') return '02';
  if (id === 'System_Design') return '03';
  return '04';
}

export default function ChallengeCard({
  id,
  icon,
  title,
  desc,
  meta,
  onSelect,
  selected,
}) {
  return (
    <motion.button
      onClick={() => onSelect(id)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      className={
        'group relative w-full text-left overflow-hidden rounded-[12px] ' +
        'bg-[#080808] border p-4 sm:p-[15px] transition-all duration-300 ' +
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40 ' +
        (selected
          ? 'border-white/70 bg-[#111111] shadow-[0_0_30px_rgba(255,255,255,0.11),inset_0_0_25px_rgba(255,255,255,0.025)]'
          : 'border-[#252525] hover:border-[#555] hover:bg-[#0d0d0d]')
      }
    >
      {/* top scan line */}
      <motion.div
        className="absolute left-0 top-0 h-px bg-white"
        initial={{ width: selected ? '100%' : 0, opacity: selected ? 0.65 : 0 }}
        animate={
          selected
            ? {
                width: ['0%', '100%'],
                opacity: [0.15, 0.65, 0.15],
              }
            : {
                width: 0,
                opacity: 0,
              }
        }
        whileHover={
          !selected
            ? {
                width: '100%',
                opacity: 0.35,
              }
            : undefined
        }
        transition={
          selected
            ? {
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : {
                duration: 0.35,
              }
        }
      />

      {/* subtle selected glow */}
      {selected && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background:
              'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.12), transparent 65%)',
          }}
        />
      )}

      {/* top row */}
      <div className="relative flex items-start justify-between mb-5">
        <div className="flex flex-col gap-3">
          {/* icon */}
          <div
            className={
              'w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 ' +
              (selected
                ? 'text-white border-white/60 bg-white/[0.06] shadow-[0_0_18px_rgba(255,255,255,0.12)]'
                : 'text-text-faint border-[#333] bg-[#050505] group-hover:text-text-dim group-hover:border-[#555]')
            }
          >
            <ChallengeIcon id={id} />
          </div>

          <div className="font-mono text-[8px] tracking-[0.2em] text-text-faint">
            UNLOCK PATH
          </div>
        </div>

        {/* path number */}
        <span
          className={
            'font-mono text-[8px] tracking-wide transition-colors ' +
            (selected ? 'text-text-dim' : 'text-text-faint')
          }
        >
          {selected ? 'SELECTED' : getPathNumber(id)}
        </span>
      </div>

      {/* title */}
      <div className="relative font-display font-bold text-[14px] sm:text-[14.5px] mb-2 text-text leading-tight">
        {title}
      </div>

      {/* description */}
      <div className="relative text-text-dim text-[11.5px] leading-[1.55] min-h-[52px]">
        {desc}
      </div>

      {/* meta */}
      <div className="relative flex gap-1.5 mt-3 flex-wrap">
        {meta.map((m) => (
          <span
            key={m}
            className={
              'font-mono text-[8px] tracking-wide px-2 py-1 rounded border transition-colors ' +
              (selected
                ? 'text-text-dim border-[#3b3b3b] bg-[#090909]'
                : 'text-text-faint border-[#242424] bg-[#050505]')
            }
          >
            {m}
          </span>
        ))}
      </div>

      {/* selected indicator */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-3 right-3 w-4 h-4 rounded-full border border-white/60 flex items-center justify-center"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        </motion.div>
      )}
    </motion.button>
  );
}