import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <header className="py-16 md:py-[72px] font-sans">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] items-center gap-10">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        >
          {/* Badge */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              font-mono
              text-[10.5px] sm:text-[11.5px]
              tracking-[0.12em]
              text-text-dim
              bg-bg-card
              border border-border
              px-3.5 py-1.5
              rounded-full
              mb-5
            "
          >
            LEVEL UP YOUR CODING
          </div>

          {/* Main Heading */}
          <h1
            className="
              font-sans
              font-bold
              text-[34px]
              sm:text-[40px]
              md:text-[46px]
              leading-[1.12]
              tracking-[-0.035em]
              text-white
              mb-4
              drop-shadow-[0_0_24px_rgba(245,245,246,0.12)]
            "
          >
            Take control of your
            <br />
            Future With{' '}
            <span className="text-white">
              Strike
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              font-sans
              text-text-dim
              text-[14px]
              sm:text-[15px]
              md:text-[16px]
              leading-[1.65]
              max-w-[460px]
              mb-7
            "
          >
            Master DSA, System Design &amp; AI with interactive coding
            environments
          </p>

          {/* CTA */}
          <motion.button
            whileHover={{
              y: -2,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              inline-flex
              items-center
              gap-2
              font-sans
              font-semibold
              text-[14px]
              bg-bg-card
              border border-border-bright
              text-white
              px-7 py-3.5
              rounded-full
              shadow-lg shadow-white/5
              transition-colors
              hover:bg-white/[0.06]
              hover:border-white/30
            "
          >
            Join Us
            <span>→</span>
          </motion.button>
        </motion.div>

        {/* RIGHT VISUAL */}
        <div
          className="
            relative
            h-[180px]
            md:h-[300px]
            flex
            items-center
            justify-center
            order-first
            md:order-none
          "
          aria-hidden="true"
        >
          {/* Orbit */}
          <div
            className="
              absolute
              w-60 h-60
              rounded-full
              border
              border-dashed
              border-white/10
              animate-orbit-spin
            "
          />

          {/* Floating Brackets */}
          <div
            className="
              absolute
              font-mono
              font-bold
              text-[38px]
              text-white/10
              top-[16%]
              right-[30%]
              animate-drift
            "
          >
            {'{ }'}
          </div>

          {/* Floating Code Icon */}
          <div
            className="
              absolute
              font-mono
              font-bold
              text-2xl
              text-white/10
              bottom-[18%]
              left-[10%]
              animate-drift
              [animation-delay:2s]
            "
          >
            {'</>'}
          </div>

          {/* Code Card */}
          <div
            className="
              absolute
              top-2.5
              left-[4%]
              w-[185px]
              bg-bg-card/85
              border
              border-border-bright
              rounded-md
              backdrop-blur-md
              font-mono
              text-[11px]
              leading-relaxed
              text-text-dim
              px-4 py-3
              animate-float-y
            "
          >
            <div>
              <span className="text-text-dim">
                const
              </span>{' '}
              <span className="text-white">
                user
              </span>{' '}
              = {'{'}
            </div>

            <div>
              &nbsp;&nbsp;level:{' '}
              <span className="text-white">
                "Advanced"
              </span>
            </div>

            <div>{'}'};</div>
          </div>

          {/* Terminal Card */}
          <div
            className="
              absolute
              bottom-5
              right-0.5
              w-[155px]
              bg-bg-card/85
              border
              border-border-bright
              rounded-md
              backdrop-blur-md
              font-mono
              text-[11px]
              leading-relaxed
              text-text-dim
              px-4 py-3
              animate-float-y
              [animation-delay:1.4s]
            "
          >
            <div>$ strike --run</div>

            <div className="text-white">
              ✓ ready
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}