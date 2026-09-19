const FEATURES = [
  { icon: '</>', title: 'Interactive Coding', desc: 'Practice with real problems in our advanced code editor.' },
  { icon: '◈', title: 'DSA & Problem Solving', desc: 'Build strong fundamentals with curated problem sets.' },
  { icon: '▲', title: 'System Design', desc: 'Learn to design scalable systems like a pro.' },
  { icon: '🏆', title: 'Contests & Quizzes', desc: 'Test your skills and compete with others.' },
];

export default function FeatureCards() {
  return (
    <section className="py-5 pb-16">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-bg-card border border-border rounded-md p-5.5 p-[22px] transition-all hover:-translate-y-1 hover:bg-bg-card-hover hover:border-border-bright"
            >
              <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center font-mono font-bold text-[15px] mb-4 bg-bg-elevated border border-border text-text">
                {f.icon}
              </div>
              <div className="font-display font-bold text-[15.5px] mb-1.5">{f.title}</div>
              <div className="text-text-dim text-[13px] mb-3.5">{f.desc}</div>
              <div className="w-[30px] h-[30px] rounded-full border border-border-bright flex items-center justify-center text-[13px] text-text-dim">
                →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
