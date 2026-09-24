import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    id: "plus",
    name: "Strike Plus",
    description:
      "All existing Strike courses with access for your selected duration.",
    image: "/images/strikePlus.png",
    badge: null,
    accent: "silver",
    durations: [
      { label: "6 Months", price: "₹8,999", oldPrice: "₹11,999" },
      { label: "1 Year", price: "₹12,499", oldPrice: "₹16,999" },
    ],
    features: [
      "All current courses included",
      "HD recordings",
      "Live class access during plan",
      "Notes",
      "Resume Review",
      "Certificates",
      "System Design Platform",
      "DSA Platform",
      "Code Arena Platform",
    ],
    button: "Get Strike Plus",
  },
  {
    id: "ultra",
    name: "Strike Ultra",
    description:
      "This plan includes all existing courses, plus upcoming courses for your selected duration.",
    image: "/images/strikeUltra.png",
    badge: "BEST VALUE",
    accent: "gold",
    durations: [
      { label: "2 Years", price: "₹11,999", oldPrice: "₹16,999" },
      { label: "3 Years", price: "₹12,999", oldPrice: "₹18,999" },
      { label: "4 Years", price: "₹13,499", oldPrice: "₹21,999" },
    ],
    features: [
      "Everything in Strike Plus",
      "Upcoming batches included",
      "Code Arena Platform",
      "Certificates",
      "Resume Review",
      "Notes",
      "System Design Platform",
      "DSA Platform",
    ],
    button: "Get Strike Ultra",
  },
];

function CheckIcon({ gold = false }) {
  return (
    <span
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
        gold
          ? "border-[#d8a928]/60 text-[#e2b52f]"
          : "border-white/20 text-white/70"
      }`}
    >
      <svg
        width="9"
        height="9"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 6.2L5 8.7L9.5 3.8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function MembershipCard({ plan }) {
  const [selectedDuration, setSelectedDuration] = useState(
    plan.durations.length - 1
  );

  const selected = plan.durations[selectedDuration];
  const isUltra = plan.id === "ultra";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className={`group relative w-full max-w-[440px] overflow-hidden rounded-[18px] border ${
        isUltra
          ? "border-[#9b7415]/70 bg-[#0c0b08]"
          : "border-white/20 bg-[#0b0b0b]"
      }`}
    >
      {/* Top image */}
      <div className="relative h-[185px] overflow-hidden">
        <img
          src={plan.image}
          alt={plan.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
        />

        {/* image overlay */}
        <div
          className={`absolute inset-0 ${
            isUltra
              ? "bg-gradient-to-t from-[#0c0b08] via-transparent to-black/10"
              : "bg-gradient-to-t from-[#0b0b0b] via-transparent to-black/10"
          }`}
        />

        {/* top border glow */}
        {isUltra && (
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e4b52d] to-transparent" />
        )}

        {plan.badge && (
          <div className="absolute right-3 top-3 rounded-full border border-[#d8a928]/60 bg-[#161107]/90 px-2.5 py-1 font-mono text-[8px] font-semibold tracking-[0.12em] text-[#e5b936] backdrop-blur">
            {plan.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-5 pb-5 pt-3">
        <div className="mb-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
          {isUltra ? "MEMBERSHIP PLAN" : "MEMBERSHIP PLAN"}
        </div>

        <h3
          className={`font-sora text-[20px] font-semibold tracking-tight ${
            isUltra ? "text-[#e7ba39]" : "text-white"
          }`}
        >
          {plan.name}
        </h3>

        <p className="mt-2 min-h-[42px] text-[10px] leading-[1.65] text-white/45">
          {plan.description}
        </p>

        {/* Duration */}
        <div className="mt-4">
          <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.14em] text-white/30">
            Select Duration
          </div>

          <div className="flex flex-wrap gap-1.5">
            {plan.durations.map((duration, index) => {
              const active = selectedDuration === index;

              return (
                <button
                  key={duration.label}
                  onClick={() => setSelectedDuration(index)}
                  className={`rounded-md border px-2.5 py-1.5 font-mono text-[8px] transition-all ${
                    active
                      ? isUltra
                        ? "border-[#d7a923] bg-[#d7a923] text-black"
                        : "border-white/50 bg-white text-black"
                      : "border-white/10 bg-white/[0.025] text-white/40 hover:border-white/25 hover:text-white/70"
                  }`}
                >
                  {duration.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price */}
        <div className="mt-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-end gap-2">
            <span
              className={`font-sora text-[29px] font-bold tracking-tight ${
                isUltra ? "text-white" : "text-white"
              }`}
            >
              {selected.price}
            </span>

            <span className="mb-1 text-[10px] text-white/25 line-through">
              {selected.oldPrice}
            </span>

            <span
              className={`mb-1 rounded px-1.5 py-0.5 font-mono text-[7px] ${
                isUltra
                  ? "bg-[#d7a923]/15 text-[#e1b435]"
                  : "bg-white/10 text-white/45"
              }`}
            >
              SAVE
            </span>
          </div>

          <div className="mt-1 text-[8px] text-white/25">
            One-time payment · No renewal
          </div>
        </div>

        {/* Features */}
        <div className="mt-4 space-y-2">
          {plan.features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 text-[9px] text-white/55"
            >
              <CheckIcon gold={isUltra} />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className={`mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-lg font-mono text-[9px] font-semibold tracking-wide transition-all ${
            isUltra
              ? "bg-[#e1b52f] text-black shadow-[0_0_25px_rgba(225,181,47,0.12)] hover:bg-[#f0c445]"
              : "border border-white/15 bg-white/[0.07] text-white hover:border-white/30 hover:bg-white/10"
          }`}
        >
          {plan.button}
          <span>→</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function MembershipPlans() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-32 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.018] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[980px]">
        {/* Heading */}
        <div className="mb-12 text-center">
          <div className="mb-3 font-mono text-[8px] font-semibold tracking-[0.3em] text-[#b18b28]">
            THE STRIKE MEMBERSHIP
          </div>

          <h2 className="font-sora text-[38px] font-semibold tracking-[-0.04em] text-white sm:text-[46px]">
            Membership
            <br />
            <span className="text-white/75">Plans</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[430px] text-[10px] leading-[1.7] text-white/35">
            One focused investment in your engineering career.
            <br />
            Every course. Present and future. Pay once, learn forever.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col items-center justify-center gap-5 lg:flex-row lg:items-stretch">
          {plans.map((plan) => (
            <MembershipCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-7 text-center font-mono text-[7px] tracking-[0.12em] text-white/20">
          PRICES INCLUSIVE OF GST · ONE-TIME PAYMENT · NO RENEWALS
        </div>
      </div>
    </section>
  );
}