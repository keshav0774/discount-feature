import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <header className="py-16 md:py-[72px]">
      <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] items-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 font-mono text-[11.5px] tracking-wide text-text-dim bg-bg-card border border-border px-3.5 py-1.5 rounded-full mb-5">
             LEVEL UP YOUR CODING
          </div>
          <h1 className="font-display font-extrabold text-[32px] md:text-[44px] leading-[1.14] tracking-tight mb-4 drop-shadow-[0_0_24px_rgba(245,245,246,0.15)]">
            Take control of your
            <br />
            Future With <span className="text-text">Strike</span>
          </h1>
          <p className="text-text-dim text-base max-w-[460px] mb-7">
            Master DSA, System Design &amp; AI with interactive coding environments
          </p>
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 font-semibold text-[14.5px] bg-bg-card border border-border-bright text-text px-7 py-3.5 rounded-full shadow-lg shadow-white/5"
          >
            Join Us →
          </motion.button>
        </motion.div>

        <div className="relative h-[180px] md:h-[300px] flex items-center justify-center order-first md:order-none" aria-hidden="true">
          <div className="absolute w-60 h-60 rounded-full border border-dashed border-white/10 animate-orbit-spin" />
          <div className="absolute font-mono font-bold text-[38px] text-white/10 top-[16%] right-[30%] animate-drift">
            {'{ }'}
          </div>
          <div className="absolute font-mono font-bold text-2xl text-white/10 bottom-[18%] left-[10%] animate-drift [animation-delay:2s]">
            {'</>'}
          </div>
          <div className="absolute top-2.5 left-[4%] w-[185px] bg-bg-card/85 border border-border-bright rounded-md backdrop-blur-md font-mono text-[11px] text-text-dim px-4 py-3 animate-float-y">
            <div><span className="text-text-dim">const</span> <span className="text-text">user</span> = {'{'}</div>
            <div>&nbsp;&nbsp;level: <span className="text-text">"Advanced"</span></div>
            <div>{'}'};</div>
          </div>
          <div className="absolute bottom-5 right-0.5 w-[155px] bg-bg-card/85 border border-border-bright rounded-md backdrop-blur-md font-mono text-[11px] text-text-dim px-4 py-3 animate-float-y [animation-delay:1.4s]">
            <div>$ strike --run</div>
            <div>✓ ready</div>
          </div>
        </div>
      </div>
    </header>
  );
}
