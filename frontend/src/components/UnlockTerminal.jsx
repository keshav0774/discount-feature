import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMAND = 'unlock --reward';
const OUTPUT_LINES = ['checking eligibility...', 'access granted ✓'];

// How long (ms) to hold the finished state before the loop resets and retypes.
const HOLD_MS = 2200;
// Typing speed per character of the command line.
const CHAR_MS = 55;
// Delay between each output line appearing.
const LINE_DELAY_MS = 450;

export default function UnlockTerminal() {
  const [typedChars, setTypedChars] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let timers = [];

    function runCycle() {
      setTypedChars(0);
      setVisibleLines(0);

      // type the command out character by character
      for (let i = 1; i <= COMMAND.length; i++) {
        timers.push(setTimeout(() => setTypedChars(i), i * CHAR_MS));
      }

      // then reveal each output line in sequence
      const commandDone = COMMAND.length * CHAR_MS;
      OUTPUT_LINES.forEach((_, i) => {
        timers.push(
          setTimeout(() => setVisibleLines(i + 1), commandDone + 350 + i * LINE_DELAY_MS)
        );
      });

      // hold, then loop
      const totalCycle = commandDone + 350 + OUTPUT_LINES.length * LINE_DELAY_MS + HOLD_MS;
      timers.push(setTimeout(runCycle, totalCycle));
    }

    runCycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full max-w-[220px] mx-auto">
      {/* ambient glow behind the terminal */}
      <div className="absolute inset-0 -m-6 rounded-full bg-white/[0.04] blur-2xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-bg-card border border-border-bright rounded-md overflow-hidden shadow-lg shadow-black/40"
      >
        {/* title bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-bg-elevated">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="ml-2 font-mono text-[10px] text-text-faint">reward.sh</span>
        </div>

        {/* body */}
        <div className="p-3.5 font-mono text-[11.5px] leading-relaxed min-h-[92px]">
          <div className="text-text">
            <span className="text-text-dim">$</span> {COMMAND.slice(0, typedChars)}
            <span className="inline-block w-[6px] h-[12px] bg-text-dim ml-0.5 align-middle animate-pulse" />
          </div>

          <AnimatePresence>
            {OUTPUT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={i === OUTPUT_LINES.length - 1 ? 'text-text' : 'text-text-dim'}
              >
                <span className="text-text-faint">&gt;</span> {line}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}