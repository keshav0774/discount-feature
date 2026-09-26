import { motion } from 'framer-motion';

const COURSES = [
  {
    id: 'thunder-100',
    title: 'Thunder: 100 Days of Code',
    desc: 'Web Development + System Design + Security + DevOps',
    duration: '100 Days',
    live: true,
    image: "/images/strikePlus.png",
  },
  {
    id: 'devops',
    title: 'DevOps Full Course',
    desc: 'Linux + CI/CD + Docker + Kubernetes + Terraform + Cloud',
    duration: '8 weeks',
    live: true,
    image: "/images/strikePlus.png",
  },
  {
    id: 'dsa-genai',
    title: 'DSA + GenAI Combo',
    desc: 'Complete tech stack with DSA and AI',
    duration: '4 months',
    hours: '100+ Hours',
    live: true,
    popular: true,
    image: "/images/strikePlus.png",
  },
  {
    id: 'dsa',
    title: 'Data Structure & Algorithms',
    desc: 'Master DSA with C++ from basics to advanced level',
    duration: '4 months',
    hours: '100+ Hours',
    live: true,
    image: "/images/strikePlus.png",
  },
  {
    id: 'genai',
    title: 'Generative AI',
    desc: 'Build autonomous AI agents from scratch',
    duration: '4 months',
    hours: '50+ Hours',
    live: true,
    image: "/images/strikePlus.png",
  },
];

function CourseCard({ course, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: 'easeOut',
      }}
      whileHover={{ y: -5 }}
      className="group relative rounded-md overflow-hidden border border-border bg-bg-card cursor-pointer font-sans"
    >
      {/* Thumbnail */}
      <div className="relative h-[220px] overflow-hidden bg-bg-elevated">
        <img
          src={course.image}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

        {/* Live Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-danger/90 text-white text-[10px] font-bold px-2.5 py-1 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          LIVE
        </div>

        {/* Popular Badge */}
        {course.popular && (
          <div className="absolute top-3 left-[70px] flex items-center gap-1 bg-[#f2c94c] text-black text-[10px] font-bold px-2.5 py-1 rounded">
            ★ POPULAR
          </div>
        )}

        {/* Course Title */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div
            className="
              font-sans
              font-bold
              text-[22px]
              leading-tight
              tracking-[-0.025em]
              text-white
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
            "
          >
            {course.title}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="font-sans text-text-dim text-[13px] leading-relaxed mb-3 min-h-[36px]">
          {course.desc}
        </p>

        {/* Course Info */}
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

        {/* CTA */}
        <div className="font-sans text-[12.5px] font-semibold text-text-dim group-hover:text-white transition-colors">
          Explore Course →
        </div>
      </div>
    </motion.div>
  );
}

export default function Courses() {
  return (
    <section
      id="courses"
      className="py-16 scroll-mt-24 font-sans"
    >
      <div className="max-w-[1180px] mx-auto px-7">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2
            className="
              font-sans
              font-bold
              text-[30px]
              sm:text-[34px]
              md:text-[40px]
              tracking-[-0.035em]
              leading-[1.15]
              text-white
              mb-3
            "
          >
            What We Offer
          </h2>

          <p className="font-sans text-text-dim text-[14px]">
            Explore our comprehensive courses designed to elevate your skills
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}