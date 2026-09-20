import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'What programming languages can I learn on the platform?',
    a: 'JavaScript, Python, Java, C++ and more — across DSA, web development and system design tracks.',
  },
  {
    q: 'What will I learn in the DSA + Gen AI course?',
    a: 'Core data structures and algorithms alongside practical generative AI engineering — prompting, RAG, and agents.',
  },
  {
    q: 'Do I need prior coding experience to join DSA + Gen AI course?',
    a: 'No — the course starts from fundamentals and progressively builds up to advanced topics.',
  },
  {
    q: 'How is Gen AI integrated with DSA in this course?',
    a: "You'll use AI tools to accelerate problem-solving while still building deep manual understanding first.",
  },
  {
    q: 'Will this course help me crack product-based company interviews?',
    a: 'Yes — the curriculum is built around the patterns most commonly asked at product and FAANG-style companies.',
  },
  {
    q: 'How long does it take to complete the DSA + Gen AI course?',
    a: 'Most learners complete it in 3–4 months studying a few hours a week.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-5 pb-16">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="text-center mb-8">
          <span className="inline-block font-mono text-[11px] text-text bg-bg-card border border-border px-3 py-1 rounded-full mb-4">
            FAQs
          </span>
          <h2 className="font-display font-bold text-[28px] mb-2">
            Your Questions, <em className="not-italic text-text">Answered</em>
          </h2>
          <p className="text-text-dim text-sm">Get instant answers to most common questions about Strike.</p>
        </div>

        <div className="max-w-[720px] mx-auto flex flex-col gap-2.5">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className="bg-bg-card border border-border rounded-sm overflow-hidden">
                <button
                  className="w-full text-left bg-transparent text-text font-medium text-sm px-[18px] py-4 flex items-center justify-between"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                >
                  {item.q}
                  <motion.span
                    animate={{ rotate: open ? 45 : 0, color: open ? '#f5f5f6' : '#55565d' }}
                    transition={{ duration: 0.2 }}
                    className="text-base ml-3 shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-[18px] pb-4 text-text-dim text-[13.5px]">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
