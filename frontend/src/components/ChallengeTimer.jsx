export default function ChallengeTimer({ label, urgent }) {
  return (
    <div
      className={
        'font-mono text-[13px] font-semibold border rounded-full px-3 py-1.5 ' +
        (urgent
          ? 'text-danger border-danger/40'
          : 'text-text bg-bg-card border-border-bright')
      }
    >
      {label}
    </div>
  );
}
