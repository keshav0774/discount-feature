import { motion } from "framer-motion";

function GoogleLogo() {
  return (
    <span className="font-bold text-[28px]" style={{ fontFamily: "Arial, sans-serif" }}>
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </span>
  );
}

function MetaLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <svg viewBox="0 0 40 24" className="w-9 h-6">
        <path
          d="M6 12c0-6 3-10 7-10s6 5 7 10c1-5 3-10 7-10s7 4 7 10-3 10-7 10c-4 0-6-5-7-10-1 5-3 10-7 10s-7-4-7-10z"
          fill="none"
          stroke="url(#metaGrad)"
          strokeWidth="3"
        />
        <defs>
          <linearGradient id="metaGrad" x1="0" y1="0" x2="40" y2="0">
            <stop offset="0%" stopColor="#0081FB" />
            <stop offset="50%" stopColor="#0064E1" />
            <stop offset="100%" stopColor="#8A3AB9" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-bold text-[24px] text-white">Meta</span>
    </div>
  );
}

function AmazonLogo() {
  return (
    <div className="flex flex-col items-start leading-none">
      <span className="font-bold text-[24px] text-white lowercase tracking-tight">amazon</span>
      <svg viewBox="0 0 60 14" className="w-[60px] h-[13px] -mt-0.5 ml-1">
        <path
          d="M2 2 Q 30 14 58 2"
          fill="none"
          stroke="#FF9900"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path d="M54 0 L59 2 L55 6 Z" fill="#FF9900" />
      </svg>
    </div>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
      <path d="M16.365 1.43c0 1.14-.417 2.048-1.25 2.72-.833.675-1.727.99-2.67.94-.084-1.09.35-2.05 1.144-2.72.79-.68 1.72-1.02 2.776-.94zm4.2 17.14c-.44 1.02-.97 1.98-1.6 2.87-.86 1.23-1.57 2.08-2.13 2.55-.86.75-1.79 1.14-2.79 1.16-.72.02-1.58-.2-2.58-.66-1-.46-1.92-.68-2.76-.68-.87 0-1.82.22-2.86.68-1.04.46-1.87.7-2.5.72-.96.04-1.9-.36-2.83-1.2-.6-.51-1.34-1.4-2.23-2.66-.95-1.35-1.72-2.93-2.34-4.72-.66-1.94-1-3.82-1-5.64 0-2.08.45-3.88 1.34-5.38.7-1.2 1.63-2.15 2.8-2.85 1.16-.7 2.42-1.06 3.77-1.08.76 0 1.75.24 2.98.7 1.23.47 2.02.7 2.36.7.26 0 1.13-.27 2.6-.82 1.4-.5 2.58-.7 3.55-.62 2.62.21 4.6 1.24 5.9 3.12-2.34 1.42-3.5 3.4-3.48 5.94.02 1.98.73 3.62 2.13 4.92.63.6 1.34 1.06 2.13 1.39-.17.5-.35.98-.55 1.44z" />
    </svg>
  );
}

function NetflixLogo() {
  return (
    <span
      className="font-black text-[26px] tracking-tight text-[#E50914]"
      style={{ fontFamily: "Arial Black, sans-serif" }}
    >
      NETFLIX
    </span>
  );
}

function CiscoLogo() {
  return (
    <div className="flex flex-col items-center leading-none">
      <div className="flex items-end gap-[3px] mb-1">
        {[6, 10, 14, 10, 14, 10, 6].map((h, i) => (
          <span key={i} className="w-[3px] rounded-full bg-[#00BCEB]" style={{ height: h }} />
        ))}
      </div>
      <span className="font-bold text-[16px] tracking-wide text-[#00BCEB]">CISCO</span>
    </div>
  );
}

function PayPalLogo() {
  return (
    <div className="flex items-center gap-0.5">
      <span className="font-black text-[24px] italic text-[#003087]">P</span>
      <span className="font-black text-[24px] italic text-[#009cde] -ml-3">P</span>
      <span className="font-bold text-[20px] text-[#003087] ml-1">ay</span>
      <span className="font-bold text-[20px] text-[#009cde]">Pal</span>
    </div>
  );
}

function OracleLogo() {
  return (
    <span className="font-black text-[22px] tracking-[0.05em] text-[#F80000]">
      ORACLE
    </span>
  );
}

const companies = [
  { name: "Google", Logo: GoogleLogo },
  { name: "Meta", Logo: MetaLogo },
  { name: "Amazon", Logo: AmazonLogo },
  { name: "Apple", Logo: AppleLogo },
  { name: "Netflix", Logo: NetflixLogo },
  { name: "Cisco", Logo: CiscoLogo },
  { name: "PayPal", Logo: PayPalLogo },
  { name: "Oracle", Logo: OracleLogo },
];

function CompanyLogo({ company }) {
  const { Logo } = company;
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.2 }}
      className="flex h-[90px] w-[170px] shrink-0 items-center justify-center opacity-75 transition-opacity duration-300 hover:opacity-100"
    >
      <Logo />
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
            <span className="text-white/55">Asked In FAANG Companies</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[600px] text-xs leading-6 text-white/35 md:text-sm">
            Practice premium questions asked by top technology companies
            and prepare yourself for real interviews.
          </p>
        </motion.div>

        {/* Logo marquee */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-black via-black/80 to-transparent md:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-black via-black/80 to-transparent md:w-40" />

          <div className="overflow-hidden">
            <motion.div
              className="flex w-max items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            >
              {marqueeItems.map((company, index) => (
                <CompanyLogo key={`${company.name}-${index}`} company={company} />
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
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}