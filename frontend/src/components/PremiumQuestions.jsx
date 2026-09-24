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
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.2 }}
      className="flex h-[90px] w-[170px] shrink-0 items-center justify-center"
    >
      <img
        src={company.logo}
        alt={company.name}
        className="max-h-[52px] max-w-[155px] w-auto object-contain opacity-75 transition-all duration-300 hover:opacity-100"
      />
    </motion.div>
  );
}

export default function PremiumQuestions({ onGoAhead }) {
  const marqueeItems = [...companies, ...companies];

  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 md:py-28">
      {/* subtle center glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[120px]" />

      <div className="relative mx-auto max-w-[1300px]">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-[900px] text-center md:mb-20"
        >
          <div className="mb-4 font-mono text-[8px] tracking-[0.32em] text-white/30">
            STRIKE // PREMIUM QUESTION BANK
          </div>

          <h2 className="font-sora text-[30px] font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-[38px] md:text-[48px] lg:text-[54px]">
            Get All Premium Questions
            <br />
            <span className="text-white/55">
              Asked In FAANG Companies
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[600px] text-xs leading-6 text-white/35 md:text-sm">
            Practice premium questions asked by top technology companies
            and prepare yourself for real interviews.
          </p>
        </motion.div>

        {/* Logo marquee */}
        <div className="relative w-full">
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-black via-black/80 to-transparent md:w-40" />

          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-black via-black/80 to-transparent md:w-40" />

          <div className="overflow-hidden">
            <motion.div
              className="flex w-max items-center"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 24,
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
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center md:mt-16"
        >
          <button
            onClick={onGoAhead}
            className="group flex items-center gap-3 rounded-lg border border-white/15 bg-[#171719] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-[#222225] hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Go Ahead</span>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}