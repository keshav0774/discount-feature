import { motion } from "framer-motion";

const mentors = [
  {
    id: "rohit",
    name: "Rohit Negi",
    role: "Founder & Lead Instructor",
    image: "/images/rohitBhaiya.jpg",
    bio: "Founder and lead instructor at Strike, focused on helping developers build strong technical skills and become industry ready.",
    tags: ["Founder @Strike", "Educator"],
  },
  {
    id: "aditya",
    name: "Aditya Tandon",
    role: "Co-Founder & Senior Instructor",
    image: "/images/adityaBhaiya.jpg",
    bio: "Senior Software Engineer passionate about scalable systems and elegant algorithms. Dedicated mentor committed to teaching, learning, and inspiring future developers.",
    tags: ["Ex-Ola | Currently @Oxyzo", "IIT Guwahati", "Ex-Ola"],
  },
];



function MentorCard({ mentor }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group h-[500px] w-full max-w-[420px]"
      style={{
        perspective: "1200px",
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{
          rotateY: flipped ? 180 : 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* ================= FRONT ================= */}
        <div
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.15] bg-black px-6"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[80px]" />

          <div className="relative mb-7 h-[178px] w-[178px] overflow-hidden rounded-full border-[4px] border-zinc-700">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="h-full w-full object-cover"
            />
          </div>

          <h3 className="relative font-display text-[25px] font-semibold text-white">
            {mentor.name}
          </h3>

          <p className="relative mt-2 text-[16px] text-zinc-400">
            {mentor.role}
          </p>

          <div className="absolute bottom-7 font-mono text-[8px] tracking-[0.22em] text-white/20">
            HOVER TO EXPLORE
          </div>
        </div>

        {/* ================= BACK ================= */}
        <div
          className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/[0.15] bg-[#050505] px-8 py-8"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="mb-8 flex items-center justify-between border-b border-white/[0.08] pb-4">
            <span className="font-mono text-[8px] tracking-[0.22em] text-white/30">
              STRIKE // MENTOR
            </span>

            <span className="font-mono text-[8px] text-white/20">
              PROFILE_{mentor.id.toUpperCase()}
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <div className="mb-5">
              <p className="mb-2 font-mono text-[8px] tracking-[0.2em] text-white/30">
                ABOUT
              </p>

              <h3 className="font-display text-[27px] font-semibold text-white">
                {mentor.name}
              </h3>

              <p className="mt-1 text-sm text-zinc-400">
                {mentor.role}
              </p>
            </div>

            <p className="max-w-[340px] text-[13px] leading-6 text-zinc-400">
              {mentor.bio}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {mentor.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[9px] font-medium text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-full bg-white px-5 py-2.5 text-[12px] font-semibold text-black transition-transform duration-200 hover:scale-105">
              Start Learning
            </button>

            <button className="rounded-full border border-white/30 px-5 py-2.5 text-[12px] font-medium text-white transition-all duration-200 hover:border-white hover:bg-white/[0.06]">
              Know More
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}