export default function DiscountBanner({ onOpen }) {
  return (
    <div className="max-w-[1180px] mx-auto px-7 pt-4">
      <div
        role="button"
        tabIndex={0}
        aria-label="Unlock a discount by completing a developer challenge"
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen();
          }
        }}
        className="relative flex flex-wrap sm:flex-nowrap items-center gap-5 min-h-[76px]
                   bg-gradient-to-r from-[#0b0b0d] via-[#0e0d12] to-[#0b0b0d]
                   border border-border-bright rounded-lg px-5 py-3.5 overflow-hidden
                   cursor-pointer transition-all hover:-translate-y-0.5 hover:border-accent/40"
      >
        {/* ambient glow — neutral white, no hue */}
        <div className="pointer-events-none absolute -top-[60%] left-[8%] w-64 h-64 rounded-full bg-white/[0.04] blur-2xl" />
        <div className="pointer-events-none absolute -bottom-[70%] right-[18%] w-56 h-56 rounded-full bg-white/[0.03] blur-2xl" />

        {/* 3D cube */}
        <div className="relative z-10 shrink-0 w-12 h-12 cube-perspective">
          <div className="w-full h-full relative preserve-3d animate-cube-float animate-cube-spin">
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
          </div>
        </div>

        {/* text */}
        <div className="relative z-10 flex-1 min-w-0 order-1 sm:order-none">
          <div className="font-display font-bold text-[15.5px]">
            A hidden <span className="text-text">reward</span> is waiting.
          </div>
          <div className="text-[12.5px] text-text-dim font-mono">
            Complete one developer challenge <span className="text-text-dim">→</span> unlock your offer
          </div>
        </div>

        {/* right side */}
        <div className="relative z-10 flex items-center gap-3.5 shrink-0 w-full sm:w-auto justify-end">
          <div className="hidden sm:block font-mono text-[10.5px] text-text-faint bg-bg-card border border-border px-2.5 py-1.5 rounded-full whitespace-nowrap">
            4 CHALLENGES • 1 REWARD
          </div>
          <button className="font-sans font-semibold text-[13px] bg-text text-bg border-none px-4.5 py-2.5 rounded-full whitespace-nowrap flex items-center gap-1.5 transition-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10">
            Unlock Discount →
          </button>
        </div>
      </div>
    </div>
  );
}
