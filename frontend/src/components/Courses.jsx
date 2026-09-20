import { motion } from 'framer-motion';

const COURSES = [
  {
    id: 'thunder-100',
    title: 'Thunder: 100 Days of Code',
    desc: 'Web Development + System Design + Security + DevOps',
    duration: '100 Days',
    live: true,
  },
  {
    id: 'devops',
    title: 'DevOps Full Course',
    desc: 'Linux + CI/CD + Docker + Kubernetes + Terraform + Cloud',
    duration: '8 weeks',
    live: true,
  },
  {
    id: 'dsa-genai',
    title: 'DSA + GenAI Combo',
    desc: 'Complete tech stack with DSA and AI',
    duration: '4 months',
    hours: '100+ Hours',
    live: true,
    popular: true,
  },
  {
    id: 'dsa',
    title: 'Data Structure & Algorithms',
    desc: 'Master DSA with C++ from basics to advanced level',
    duration: '4 months',
    hours: '100+ Hours',
    live: true,
  },
  {
    id: 'genai',
    title: 'Generative AI',
    desc: 'Build autonomous AI agents from scratch',
    duration: '4 months',
    hours: '50+ Hours',
    live: true,
  },
];

function CourseCard({ course, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -5 }}
      className="group relative rounded-md overflow-hidden border border-border bg-bg-card cursor-pointer"
    >
      {/* thumbnail area */}
      <div className="relative h-[220px] overflow-hidden bg-gradient-to-br from-[#1a1b1f] to-[#0a0a0c]">
        {/* faint code-rain texture */}
        <div
          className="absolute inset-0 opacity-[0.08] font-mono text-[9px] leading-[11px] text-text select-none pointer-events-none whitespace-pre-wrap break-all p-2"
          aria-hidden="true"
        >
          {'getAttribute(node,key){const v=this.state[key];if(v==null)return;} '.repeat(20)}
        </div>

        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-danger/90 text-white text-[10px] font-bold px-2.5 py-1 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          LIVE
        </div>

        {course.popular && (
          <div className="absolute top-3 left-[70px] flex items-center gap-1 bg-[#f2c94c] text-black text-[10px] font-bold px-2.5 py-1 rounded">
            ★ POPULAR
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="font-display font-extrabold text-2xl leading-tight text-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {course.title}
          </div>
        </div>
      </div>

      {/* body */}
      <div className="p-4">
        <p className="text-text-dim text-[13px] mb-3 min-h-[36px]">{course.desc}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 font-mono text-[10.5px] text-text-dim bg-bg-elevated border border-border px-2 py-1 rounded">
            ⏱ {course.duration}
          </span>
          {course.hours && (
            <span className="inline-flex items-center gap-1 font-mono text-[10.5px] text-text-dim bg-bg-elevated border border-border px-2 py-1 rounded">
              📖 {course.hours}
            </span>
          )}
        </div>
        <div className="text-[12.5px] font-semibold text-text-dim group-hover:text-white transition-colors">
          Explore Course →
        </div>
      </div>
    </motion.div>
  );
}

export default function Courses() {
  return (
    <section id="courses" className="py-16 scroll-mt-24">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="text-center mb-10">
          <h2 className="font-display font-extrabold text-[32px] mb-2">What We Offer</h2>
          <p className="text-text-dim text-sm">Explore our comprehensive courses designed to elevate your skills</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((c, i) => (
            <CourseCard key={c.id} course={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
