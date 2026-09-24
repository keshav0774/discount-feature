import { motion } from 'framer-motion';

export default function RewardOrb({ onClick }) {
  return (
    <div className="relative w-full min-h-[260px] flex items-center justify-center overflow-hidden">

      {/* subtle background grid / signal glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage:
              'radial-gradient(circle at center, black 0%, transparent 75%)',
          }}
        />
      </div>

      {/* subtle scanner glow */}
      <motion.div
        className="absolute w-64 h-32 rounded-full bg-white/[0.025] blur-3xl"
        animate={{
          opacity: [0.25, 0.5, 0.25],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main companion panel */}
      <motion.button
        onClick={onClick}
        aria-label="Enter reward protocol"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.99 }}
        className="group relative w-full max-w-[620px] min-h-[225px] overflow-hidden text-left bg-[#070707]/95 border border-[#292929] rounded-xl cursor-pointer backdrop-blur-md transition-all duration-300 hover:border-[#555] hover:shadow-[0_0_45px_rgba(255,255,255,0.06)]"
      >

        {/* top scan line */}
        <motion.div
          className="absolute top-0 left-0 h-px bg-white/70"
          initial={{ width: '0%' }}
          animate={{ width: ['0%', '100%', '0%'] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 h-9 px-4 flex items-center justify-between border-b border-border bg-[#090909]/80">
          <span className="font-mono text-[8px] tracking-[0.22em] text-text-faint">
            STRIKE // REWARD PROTOCOL
          </span>

          <span className="font-mono text-[8px] text-text-faint">
            SIGNAL: DETECTED
          </span>
        </div>

        {/* Content */}
        <div className="relative flex items-center min-h-[225px] pt-9">

          {/* Boy */}
          <div className="w-[42%] h-[185px] flex items-end justify-center overflow-hidden">
            {/* Replace this with your boy image */}
            <div className="relative w-[115px] h-[165px] flex items-center justify-center">
              <div className="absolute bottom-4 w-20 h-20 rounded-full bg-white/[0.04] blur-2xl" />

              <div className="relative text-text-faint font-mono text-[8px] text-center border border-border rounded-lg px-3 py-2">
                BOY
                <br />
                <span className="text-text-faint/50">
                   <motion.img
      src="/images/boyy.png"
      alt="Strike AI"
      className="relative z-10 w-[95px] h-[130px] object-contain select-none pointer-events-none"
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
                </span>
              </div>
            </div>
          </div>

          {/* Conversation */}
          <div className="flex-1 px-3 sm:px-5 py-5">

            {/* Boy message */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-[#0d0d0d] border border-border rounded-lg px-3.5 py-3 mb-3 max-w-[270px]"
            >
              <div className="font-mono text-[8px] tracking-[0.14em] text-text-faint mb-1.5">
                DEVELOPER
              </div>

              <div className="text-[12px] text-text-dim leading-relaxed">
                Hey, I'm new here.
                <br />
                Do you have something for me?
              </div>
            </motion.div>

            {/* Robot message */}
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative bg-[#111111] border border-[#353535] rounded-lg px-3.5 py-3 ml-auto max-w-[290px]"
            >
              <div className="font-mono text-[8px] tracking-[0.14em] text-text-faint mb-1.5">
                STRIKE AI
              </div>

              <div className="text-[12px] text-text-dim leading-relaxed">
                Yes, I have something for you.
                <br />
                But there are a few challenges
                <br />
                you need to explore first.
              </div>
            </motion.div>

          </div>

          {/* Robot */}
          <div className="hidden sm:flex w-[22%] h-[185px] items-end justify-center">
            {/* Replace this with your robot image */}
            <div className="relative w-[90px] h-[120px] flex items-center justify-center">
              <div className="absolute w-16 h-16 rounded-full bg-white/[0.05] blur-2xl" />

              <div className="relative text-text-faint font-mono text-[8px] text-center border border-border rounded-lg px-3 py-2">
                BOT
                <br />
                <span className="text-text-faint/50">
                      <motion.img
                       src="/images/boat.png"
                        alt="Strike AI"
                         className="relative z-10 w-[95px] h-[130px] object-contain select-none pointer-events-none"
                       animate={{
                       y: [0, -5, 0],
                      }}
                    transition={{
                      duration: 3,
                       repeat: Infinity,
                       ease: 'easeInOut',
                    }}
                />
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Enter button */}
        <motion.div
          className="absolute bottom-4 right-4"
          whileHover={{ scale: 1.04 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black font-mono text-[10px] font-semibold tracking-wide shadow-[0_0_22px_rgba(255,255,255,0.12)]">
            ENTER
            <span>→</span>
          </div>
        </motion.div>

        {/* bottom status */}
        <div className="absolute bottom-4 left-4 font-mono text-[7px] tracking-[0.16em] text-text-faint">
          ACCESS PATH // UNKNOWN
        </div>

      </motion.button>
    </div>
  );
}