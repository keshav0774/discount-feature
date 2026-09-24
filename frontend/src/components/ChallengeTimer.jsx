export default function ChallengeTimer({ label, urgent }) {
  return (
    <div
      className={
        'inline-flex items-center gap-2 font-mono text-[11px] font-semibold border rounded-full px-3 py-1.5 tracking-wide transition-all ' +
        (urgent
          ? 'text-danger border-danger/40 bg-danger/5'
          : 'text-text-dim bg-bg-card border-border-bright')
      }
    >
      <span
        className={
          'w-1.5 h-1.5 rounded-full ' +
          (urgent
            ? 'bg-danger animate-pulse'
            : 'bg-white/60')
        }
      />

      {label}
    </div>
  );
}