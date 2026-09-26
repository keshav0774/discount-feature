import { motion } from 'framer-motion';

const ROW_1 = [
  {
    name: 'Adheli Priyanka',
    quote:
      "Nexus builds from basics with in-depth explanations. Daily homework, live classes, and project contests with rewards kept me motivated throughout my learning journey.",
  },
  {
    name: 'Alok',
    quote:
      "The live classes, HD recordings, and daily practice problems made learning smooth. Real-world projects prepared me for actual development work in the industry.",
  },
  {
    name: 'Aryan Verma',
    quote:
      "Best decision I made was joining Nexus. The First Principles teaching helped me understand concepts deeply, not just memorize solutions like other courses.",
  },
  {
    name: 'Shree',
    quote:
      "From zero to a full-stack project in months. The mentors actually explain the difference, not just the syntax.",
  },
];

const ROW_2 = [
  {
    name: 'Sumit kumar',
    quote:
      "Completed Nexus MERN in 8-9 months. Rohit Bhaiya taught not just 'what' but 'why' behind everything. My consistency broke many times, but I finally made it!",
  },
  {
    name: 'Babita Patel',
    quote:
      "Nexus gave me a true from-scratch learning experience. The way they simplify core concepts, combined with daily assignments, live guidance, and exciting project challenges with rewards, kept me consistent and motivated every single day.",
  },
  {
    name: 'Raju Arya',
    quote:
      "The live classes, HD recordings, and daily practice problems made learning smooth. Real-world projects prepared me for actual development work in the industry.",
  },
  {
    name: 'Aryan Verma',
    quote:
      "Best decision I made was joining Nexus. First Principles teaching helped me understand concepts deeply, not just memorize solutions like other courses.",
  },
];

function ReviewCard({ name, quote }) {
  return (
    <div
      className="
        shrink-0
        w-[340px] sm:w-[380px]
        mx-2.5
        rounded-2xl
        border border-white/[0.08]
        bg-[#0b0b0b]
        p-6
        transition-all duration-300
        hover:border-white/[0.16]
        hover:bg-[#0e0e0e]
      "
    >
      {/* Reviewer Name */}
      <div className="font-sans font-semibold text-white text-[15px] mb-3 tracking-[-0.01em]">
        {name}
      </div>

      {/* Review */}
      <p className="font-sans text-white/55 text-[14px] leading-[1.7] font-normal">
        "{quote}"
      </p>
    </div>
  );
}

function MarqueeRow({ items, direction = 'left', duration = 32 }) {
  const doubled = [...items, ...items];

  const animate =
    direction === 'left'
      ? { x: ['0%', '-50%'] }
      : { x: ['-50%', '0%'] };

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={animate}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {doubled.map((item, i) => (
          <ReviewCard
            key={`${item.name}-${i}`}
            {...item}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="relative overflow-hidden bg-bg py-20 font-sans">

      {/* Left Fade */}
      <div
        className="
          pointer-events-none
          absolute inset-y-0 left-0
          z-20
          w-20 sm:w-28 md:w-40
          bg-gradient-to-r
          from-bg via-bg/80 to-transparent
        "
      />

      {/* Right Fade */}
      <div
        className="
          pointer-events-none
          absolute inset-y-0 right-0
          z-20
          w-20 sm:w-28 md:w-40
          bg-gradient-to-l
          from-bg via-bg/80 to-transparent
        "
      />

      {/* Heading */}
      <div className="relative z-10 max-w-[1180px] mx-auto px-5 sm:px-7 text-center mb-12">
        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: '-40px',
          }}
          transition={{
            duration: 0.5,
          }}
        >
          {/* Small Label */}
          <div
            className="
              inline-flex
              items-center
              gap-1.5
              font-mono
              text-[10px] sm:text-[11px]
              text-text-faint
              tracking-[0.16em]
              uppercase
              mb-4
            "
          >
            <span className="text-white/70">★</span>
            Reviews
          </div>

          {/* Main Heading */}
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
            Trusted by Visionaries
          </h2>

          {/* Subtitle */}
          <p
            className="
              font-sans
              text-white/50
              text-[13px]
              sm:text-[14px]
              leading-relaxed
            "
          >
            Hear from real users who achieved success with our automation
          </p>
        </motion.div>
      </div>

      {/* Reviews Marquee */}
      <div className="relative z-10 flex flex-col gap-5">

        {/* Row 1 */}
        <MarqueeRow
          items={ROW_1}
          direction="left"
          duration={34}
        />

        {/* Row 2 */}
        <MarqueeRow
          items={ROW_2}
          direction="right"
          duration={34}
        />

      </div>
    </section>
  );
}