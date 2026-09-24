import { motion } from "framer-motion";

const companies = [
  { name: "Google", logo: "/images/google.png" },
  { name: "Meta", logo: "/images/meta.png" },
  { name: "Amazon", logo: "/images/amazon.png" },
  { name: "Apple", logo: "/images/apple.png" },
  { name: "Netflix", logo: "/images/netflix.png" },
  { name: "Cisco", logo: "/images/cisco.png" },
  { name: "PayPal", logo: "/images/paypal.png" },
  { name: "Oracle", logo: "/images/oracle.png" },
];

function CompanyLogo({ company }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ duration: 0.2 }}
      className="group flex h-20 min-w-[150px] items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] px-7 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05]"
    >
      <img
        src={company.logo}
        alt={company.name}
        className="max-h-9 w-auto max-w-[105px] object-contain opacity-55 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
      />
    </motion.div>
  );
}
export default function PremiumQuestions({ onGoAhead }) {
  // Duplicate the array to create a seamless loop.
  const marqueeItems = [...companies, ...companies];

  return (
    <section className="relative overflow-hidden bg-[#0a0a0c] px-4 py-16 md:py-24">
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.018] blur-[120px]" />

      <div className="relative mx-auto max-w-[1200px]">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-[850px] text-center md:mb-14"
        >
          <div className="mb-3 font-mono text-[8px] tracking-[0.3em] text-white/30">
            STRIKE // PREMIUM QUESTION BANK
          </div>

          <h2 className="font-sora text-2xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
            Get All Premium Questions
            <br className="hidden sm:block" />
            <span className="text-white/55"> Asked In FAANG Companies</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[560px] text-xs leading-6 text-white/35 md:text-sm">
            Practice the questions asked by top technology companies and
            prepare yourself for real interviews.
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="relative">
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0a0c] to-transparent md:w-28" />

          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0a0c] to-transparent md:w-28" />

          <div className="overflow-hidden">
            <motion.div
              className="flex w-max gap-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {marqueeItems.map((company, index) => (
                <CompanyLogo
                  key={`${company.name}-${index}`}
                  company={company}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex justify-center md:mt-12"
        >
          <button
            onClick={onGoAhead}
            className="group flex items-center gap-3 rounded-xl border border-zinc-700/60 bg-zinc-900 px-6 py-3 font-sora text-sm font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:border-white/25 hover:bg-zinc-800 active:scale-[0.98]"
          >
            Go Ahead

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}