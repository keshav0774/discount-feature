const NAV_ITEMS = ['Home', 'Courses', 'Practice', 'CodeArena', 'Quiz', 'System Design', 'Contests'];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] bg-bg/85 backdrop-blur-md border-b border-border">
      <div className="max-w-[1180px] mx-auto px-7 h-[68px] flex items-center justify-between gap-6">
        <div className="font-display font-extrabold text-[19px] tracking-wide">STRIKE</div>

        <div className="hidden md:flex items-center gap-1 bg-bg-card border border-border rounded-full p-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              className={
                'text-[13.5px] font-medium px-4 py-2 rounded-full transition-colors ' +
                (item === 'Home'
                  ? 'bg-text text-bg font-semibold'
                  : 'text-text-dim hover:text-text')
              }
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-bg-card border border-border px-3 py-1.5 rounded-full text-[12.5px] text-text-dim font-mono">
            ◆ 0
          </div>
          <div className="w-9 h-9 rounded-full bg-bg-card border border-border flex items-center justify-center font-bold text-[13px] cursor-pointer">
            K
          </div>
        </div>
      </div>
    </nav>
  );
}
