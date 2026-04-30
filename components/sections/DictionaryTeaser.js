import { motion } from "framer-motion";
import Link from "next/link";

const TEASER_TERMS = [
  {
    term: "Crema",
    def: "The golden foam layer on a well‑pulled espresso shot.",
  },
  {
    term: "Bloom",
    def: "The release of gas when hot water first hits fresh grounds.",
  },
  {
    term: "Single Origin",
    def: "Coffee sourced from one farm, full of unique character.",
  },
];

export default function DictionaryTeaser() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="mt-10 mx-4 sm:mx-6 lg:mx-10"
    >
      <div className="relative overflow-hidden rounded-3xl bg-chocolate/10 border border-amber-200/60 shadow-xl px-8 py-14 sm:px-14 sm:py-16">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-amber-600 rounded-t-3xl" />

        {/* Decorative large background letter */}
        <div className="pointer-events-none select-none absolute -bottom-4 right-6 text-[11rem] font-black text-chocolate/5 leading-none">
          A–Z
        </div>

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          {/* Left: text */}
          <div className="max-w-lg">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block mb-5 rounded-full  px-4 py-1 text-lg font-bold uppercase tracking-widest text-amber-600"
            >
              Coffee Knowledge
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-black text-chocolate leading-[1.1] mb-5"
            >
              Speak the 
              Language 
              of Coffee
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-chocolate/55 font-medium text-lg leading-relaxed mb-8 "
            >
              From bloom to crema, explore our coffee glossary and elevate your
              experience — one term at a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Link
                href="/dictionary"
                className="inline-flex items-center gap-3 rounded-full bg-chocolate px-8 py-3.5 font-bold text-amber-100 transition-all hover:bg-chocolate/85  active:scale-95"
              >
                Explore the Dictionary
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right: teaser term cards */}
          <div className="flex flex-col gap-4 lg:min-w-[300px]">
            {TEASER_TERMS.map((item, i) => (
              <motion.div
                key={item.term}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                className="rounded-2xl bg-white/80 border-l-4 border-amber-400 shadow-sm px-5 py-4"
              >
                <p className="text-sm font-bold text-chocolate mb-1">
                  {item.term}
                </p>
                <p className="text-sm text-chocolate/55 leading-snug tracki">
                  {item.def}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
