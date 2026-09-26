import { motion } from 'framer-motion';

/* -------------------------------------------------------
   INTERVIEW ILLUSTRATION
------------------------------------------------------- */

function InterviewIllustration() {
  return (
    <div className="relative h-[165px] flex items-center justify-center">
      <div className="absolute w-44 h-32 rounded-full bg-white/[0.025] blur-3xl" />

      <div className="relative flex items-end gap-5">
        {/* Interviewer */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex flex-col items-center"
        >
          <div className="w-7 h-7 rounded-full bg-zinc-400 mb-1" />

          <div className="relative w-12 h-14">
            <div className="absolute inset-0 rounded-t-xl bg-gradient-to-b from-zinc-500 to-zinc-800" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-white/10" />
          </div>
        </motion.div>

        {/* Laptop / table */}
        <div className="relative mb-1">
          <div className="w-[72px] h-[42px] rounded-md bg-zinc-800 border border-white/15 flex items-center justify-center">
            <div className="w-[48px] h-[26px] rounded bg-zinc-700 border border-white/10" />
          </div>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[88px] h-[3px] rounded-full bg-zinc-700" />
        </div>

        {/* Candidate */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.2,
          }}
          className="flex flex-col items-center"
        >
          <div className="w-7 h-7 rounded-full bg-zinc-400 mb-1" />

          <div className="w-12 h-14 rounded-t-xl bg-gradient-to-b from-zinc-500 to-zinc-800" />
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   AI ROBOT
------------------------------------------------------- */

function AIRobotIllustration() {
  return (
    <div className="relative h-[165px] flex items-center justify-center">
      <div className="absolute w-[190px] h-[150px] rounded-full bg-cyan-400/[0.07] blur-3xl" />

      <motion.div
        animate={{
          y: [0, -7, 0],
          rotate: [0, 1.5, 0, -1.5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative"
      >
        {/* antenna */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-7">
          <div className="w-[2px] h-7 bg-zinc-500 mx-auto" />
          <div className="w-3 h-3 rounded-full bg-cyan-300/70 -mt-1 shadow-[0_0_12px_rgba(103,232,249,0.45)]" />
        </div>

        {/* head */}
        <div
          className="
            w-[100px] h-[88px]
            rounded-[28px]
            bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-900
            border border-cyan-300/25
            flex items-center justify-center
            shadow-[0_10px_40px_rgba(34,211,238,0.12)]
          "
        >
          <div className="w-[68px] h-[45px] rounded-[18px] bg-[#090d0f] flex items-center justify-center gap-5">
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]"
            />

            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: 0.25,
              }}
              className="w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]"
            />
          </div>
        </div>

        {/* body */}
        <div className="w-[58px] h-[35px] mx-auto -mt-1 rounded-b-[24px] bg-gradient-to-b from-zinc-700 to-zinc-900" />
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------
   PROJECTS ILLUSTRATION
------------------------------------------------------- */

function ProjectsIllustration() {
  const nodes = [
    {
      icon: '⚙',
      top: '12%',
      left: '20%',
      delay: 0,
    },
    {
      icon: '▤',
      top: '55%',
      left: '8%',
      delay: 0.5,
    },
    {
      icon: '◆',
      top: '10%',
      left: '70%',
      delay: 1,
    },
    {
      icon: '●',
      top: '55%',
      left: '78%',
      delay: 1.5,
    },
  ];

  return (
    <div className="relative h-[165px] max-w-[430px] mx-auto">
      <svg
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <line
          x1="27%"
          y1="27%"
          x2="75%"
          y2="24%"
          stroke="#4c1d95"
          strokeWidth="1"
          strokeDasharray="4 5"
        />

        <line
          x1="18%"
          y1="69%"
          x2="82%"
          y2="67%"
          stroke="#312e81"
          strokeWidth="1"
          strokeDasharray="4 5"
        />

        <line
          x1="29%"
          y1="30%"
          x2="20%"
          y2="65%"
          stroke="#312e81"
          strokeWidth="1"
          strokeDasharray="4 5"
        />
      </svg>

      {nodes.map((node, index) => (
        <motion.div
          key={index}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: node.delay,
          }}
          className="
            absolute
            w-[48px] h-[48px]
            rounded-xl
            flex items-center justify-center
            text-white text-[14px]
            border border-white/10
            bg-gradient-to-br
            from-violet-500
            to-indigo-600
            shadow-[0_8px_25px_rgba(124,58,237,0.18)]
          "
          style={{
            top: node.top,
            left: node.left,
          }}
        >
          {node.icon}
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------
   PROGRESS CHART
------------------------------------------------------- */

function ProgressChart() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const values = [20, 24, 42, 58, 67, 78, 90];

  const barValues = [42, 55, 34, 63, 49, 36, 72];

  const width = 600;
  const height = 115;

  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - (value / 100) * height;

      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="relative w-full pt-1">
      {/* Graph */}

      <div className="flex h-[115px]">
        {/* Y labels */}
        <div className="w-10 flex flex-col justify-between pb-1 font-mono text-[9px] text-zinc-600">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
        </div>

        <div className="relative flex-1">
          {/* horizontal grid */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="w-full border-t border-white/[0.025]"
              />
            ))}
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full overflow-visible"
          >
            <defs>
              <linearGradient
                id="progressArea"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#84ff4f"
                  stopOpacity="0.20"
                />

                <stop
                  offset="100%"
                  stopColor="#84ff4f"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>

            <polygon
              points={`0,${height} ${points} ${width},${height}`}
              fill="url(#progressArea)"
            />

            <motion.polyline
              points={points}
              fill="none"
              stroke="#84ff4f"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              initial={{
                pathLength: 0,
              }}
              whileInView={{
                pathLength: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.4,
                ease: 'easeOut',
              }}
              style={{
                filter:
                  'drop-shadow(0 0 5px rgba(132,255,79,0.65))',
              }}
            />

            {values.map((value, index) => {
              const x =
                (index / (values.length - 1)) * width;

              const y =
                height - (value / 100) * height;

              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#84ff4f"
                  style={{
                    filter:
                      'drop-shadow(0 0 5px rgba(132,255,79,0.9))',
                  }}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Bars */}

      <div className="flex ml-10 h-[68px] gap-8 items-end mt-1">
        {barValues.map((value, index) => (
          <div
            key={days[index]}
            className="flex-1 h-full flex flex-col justify-end items-center"
          >
            <div className="relative w-full max-w-[31px] h-full bg-white/[0.035] rounded-t-lg overflow-hidden">
              <motion.div
                initial={{
                  height: 0,
                }}
                whileInView={{
                  height: `${value}%`,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.07,
                  ease: 'easeOut',
                }}
                className="
                  absolute bottom-0 inset-x-0
                  rounded-t-lg
                  bg-[#8cff55]
                  shadow-[0_0_14px_rgba(140,255,85,0.3)]
                "
              />
            </div>
          </div>
        ))}
      </div>

      {/* days */}

      <div className="flex ml-10 gap-8 mt-1">
        {days.map((day) => (
          <span
            key={day}
            className="flex-1 text-center font-mono text-[8px] text-zinc-600"
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   FEATURE BOX
------------------------------------------------------- */

function FeatureBox({ children, className = '' }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: '-30px',
      }}
      transition={{
        duration: 0.45,
        ease: 'easeOut',
      }}
      className={
        `
        relative
        overflow-hidden
        rounded-[16px]
        border border-white/[0.12]
        bg-black
        px-[30px]
        py-[27px]
        transition-colors
        duration-300
        hover:border-white/[0.18]
        ` + className
      }
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------
   MAIN SECTION
------------------------------------------------------- */

export default function FeatureCards() {
  return (
    <section className="relative bg-black py-20 font-sans">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">

        {/* WHY CHOOSE US HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2
            className="
              font-display
              font-semibold
              text-[38px]
              sm:text-[46px]
              md:text-[54px]
              leading-[1.05]
              tracking-[-0.02em]
              text-white
              mb-6
            "
          >
            Why Choose Us
          </h2>

          <p
            className="
              max-w-[720px]
              mx-auto
              text-zinc-400
              text-[14px]
              sm:text-[15px]
              md:text-[16px]
              leading-[1.7]
            "
          >
            Learn smarter with modern tools, guided mentors, and a platform built
            to help you grow your skills faster, setting a new benchmark for
            modern coding excellence.
          </p>
        </motion.div>

        {/* FIRST ROW */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1.08fr_0.92fr]
            gap-4
            mb-4
          "
        >
          <FeatureBox className="min-h-[300px]">
            <h3 className="text-white font-semibold text-[19px] leading-tight mb-2">
              Interview Preparation
            </h3>

            <p className="text-zinc-400 text-[14px] leading-[1.55] max-w-[310px]">
              Learn faster with hands-on tracks and mentor feedback.
            </p>

            <InterviewIllustration />
          </FeatureBox>

          <FeatureBox className="min-h-[300px]">
            <h3 className="text-white font-semibold text-[18px] leading-tight text-center mb-3">
              AI Support
            </h3>

            <AIRobotIllustration />
          </FeatureBox>
        </div>

        {/* SECOND ROW */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[0.65fr_1.35fr]
            gap-4
          "
        >
          <FeatureBox className="min-h-[300px]">
            <h3 className="text-white font-semibold text-[18px] leading-tight text-center mb-1">
              Projects Based Learning
            </h3>

            <ProjectsIllustration />
          </FeatureBox>

          <FeatureBox className="min-h-[300px] !px-[22px] !py-[22px]">
            <div className="flex items-start justify-between gap-3 mb-1">
              <div>
                <h3 className="text-white font-semibold text-[18px] leading-tight">
                  Track Your Progress
                </h3>

                <p className="text-[#43e879] text-[12px] font-semibold mt-2">
                  Grow With Strike
                </p>
              </div>

              <span
                className="
                  hidden sm:inline-flex
                  items-center gap-2
                  border border-emerald-500/30
                  bg-emerald-500/[0.04]
                  text-emerald-400
                  text-[9px]
                  font-semibold
                  px-3 py-1.5
                  rounded-lg
                  whitespace-nowrap
                "
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Live Progress Tracking
              </span>
            </div>

            <ProgressChart />
          </FeatureBox>
        </div>
      </div>
    </section>
  );
}