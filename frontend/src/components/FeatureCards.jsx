import { motion } from 'framer-motion';

function InterviewIllustration() {
  return (
    <div className="relative h-[140px] flex items-center justify-center">
      <div className="absolute w-40 h-40 rounded-full bg-blue-500/10 blur-2xl" />
      <div className="relative flex items-end gap-6">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mb-1" />
          <div className="w-14 h-16 rounded-t-2xl bg-gradient-to-b from-zinc-700 to-zinc-800" />
        </motion.div>

        <div className="w-16 h-10 rounded-md bg-zinc-800 border border-white/10 flex items-center justify-center mb-1">
          <div className="w-10 h-6 rounded-sm bg-blue-500/20 border border-blue-400/30" />
        </div>

        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 mb-1" />
          <div className="w-14 h-16 rounded-t-2xl bg-gradient-to-b from-zinc-700 to-zinc-800" />
        </motion.div>
      </div>
    </div>
  );
}

function AIRobotIllustration() {
  return (
    <div className="relative h-[140px] flex items-center justify-center">
      <div className="absolute w-44 h-44 rounded-full bg-sky-400/10 blur-2xl" />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-zinc-700 to-zinc-900 border border-sky-400/30 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.25)]">
          <div className="flex gap-3">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
            />
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
            />
          </div>
        </div>
        <div className="w-1 h-4 bg-sky-400/50 mx-auto" />
        <div className="w-2 h-2 rounded-full bg-sky-400 mx-auto -mt-1 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
      </motion.div>
    </div>
  );
}

function ProjectsIllustration() {
  const nodes = [
    { icon: '⚙', color: 'from-purple-400 to-purple-600', top: '10%', left: '15%', delay: 0 },
    { icon: '▤', color: 'from-blue-400 to-blue-600', top: '55%', left: '5%', delay: 0.6 },
    { icon: '◆', color: 'from-indigo-400 to-purple-500', top: '5%', left: '65%', delay: 1.2 },
    { icon: '●', color: 'from-blue-400 to-indigo-600', top: '50%', left: '75%', delay: 1.8 },
  ];

  return (
    <div className="relative h-[140px]">
      <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden="true">
        <line x1="25%" y1="20%" x2="70%" y2="15%" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="20%" y1="65%" x2="80%" y2="60%" stroke="#818cf8" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="30%" y1="25%" x2="25%" y2="60%" stroke="#818cf8" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
      {nodes.map((n) => (
        <motion.div
          key={n.icon}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: n.delay }}
          className={`absolute w-11 h-11 rounded-xl bg-gradient-to-br ${n.color} flex items-center justify-center text-white text-[15px] shadow-lg`}
          style={{ top: n.top, left: n.left }}
        >
          {n.icon}
        </motion.div>
      ))}
    </div>
  );
}

function ProgressChart() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = [30, 42, 38, 60, 55, 78, 92]; // % height, rises overall

  const points = values
    .map((v, i) => `${(i / (values.length - 1)) * 100},${100 - v}`)
    .join(' ');

  return (
    <div className="h-[150px]">
      <div className="flex h-[95px]">
        <div className="flex flex-col justify-between text-[10px] text-zinc-500 font-mono pr-2 pb-1">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
        </div>
        <div className="relative flex-1">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
            <polyline
              points={points}
              fill="none"
              stroke="#4ade80"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              style={{ filter: 'drop-shadow(0 0 4px rgba(74,222,128,0.6))' }}
            />
            {values.map((v, i) => (
              <circle
                key={i}
                cx={(i / (values.length - 1)) * 100}
                cy={100 - v}
                r="1.6"
                fill="#4ade80"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="flex pl-8 gap-1.5 items-end h-[35px] mt-2">
        {values.map((v, i) => (
          <motion.div
            key={days[i]}
            initial={{ height: 0 }}
            whileInView={{ height: `${(v / 100) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-green-500/20 to-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)]"
          />
        ))}
      </div>
      <div className="flex pl-8 gap-1.5 mt-1">
        {days.map((d) => (
          <span key={d} className="flex-1 text-center text-[9px] text-zinc-500 font-mono">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeatureBox({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={
          'relative overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0b0b0b] p-6 ' +
          'transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ' +
          'hover:shadow-[0_0_35px_rgba(255,255,255,0.05)] ' +
      className
    }
    >
      {children}
    </motion.div>
  );
}

export default function FeatureCards() {
  return (
    <section className="relative bg-black py-16">
      <div
        className="relative mx-auto max-w-[1180px] px-7"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-[1180px] mx-auto px-7 relative">
        <div className="text-center mb-10">
          <h2 className="font-display font-extrabold text-[32px] text-white mb-2">Why Choose Us</h2>
          <p className="text-zinc-400 text-sm">Everything you need to go from learner to job-ready engineer.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureBox>
            <h3 className="text-white font-bold text-xl mb-1.5">Interview Preparation</h3>
            <p className="text-zinc-400 text-[13.5px] mb-4 max-w-[300px]">
              Learn faster with hands-on tracks and mentor feedback.
            </p>
            <InterviewIllustration />
          </FeatureBox>

          <FeatureBox>
            <h3 className="text-white font-bold text-xl mb-1.5">AI Support</h3>
            <p className="text-zinc-400 text-[13.5px] mb-4 max-w-[300px]">
              Get unstuck instantly with an AI assistant that understands your code.
            </p>
            <AIRobotIllustration />
          </FeatureBox>

          <FeatureBox>
            <h3 className="text-white font-bold text-xl mb-1.5">Projects Based Learning</h3>
            <p className="text-zinc-400 text-[13.5px] mb-4 max-w-[300px]">
              Build real systems, not just solve isolated problems.
            </p>
            <ProjectsIllustration />
          </FeatureBox>

          <FeatureBox>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-bold text-xl">Track Your Progress</h3>
              <span className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live Progress Tracking
              </span>
            </div>
            <p className="text-green-400 text-[13px] font-semibold mb-4">Grow With Strike</p>
            <ProgressChart />
          </FeatureBox>
        </div>
      </div>
    </section>
  );
}