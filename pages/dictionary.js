import { motion } from "framer-motion";
import ContentLayout from "@/components/layout/ContentLayout";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const dictionary = {
  A: [
    {
      term: "Arabica",
      def: "A high‑quality coffee species known for smooth, complex flavours. Most specialty coffee is Arabica.",
    },
    {
      term: "Acidity",
      def: "A bright, lively flavour characteristic — not sourness. Often described as citrusy, fruity, or sparkling.",
    },
  ],
  B: [
    {
      term: "Bloom",
      def: "The release of gas when hot water first hits fresh coffee grounds. A sign of freshness.",
    },
    {
      term: "Body",
      def: "The texture or weight of coffee on your palate — light, medium, or full‑bodied.",
    },
  ],
  C: [
    {
      term: "Crema",
      def: "The golden foam layer on top of a well‑pulled espresso shot.",
    },
    {
      term: "Cold Brew",
      def: "Coffee brewed with cold water over 12–24 hours for a smooth, low‑acidity drink.",
    },
  ],
  E: [
    {
      term: "Espresso",
      def: "A concentrated coffee brewed under pressure. The base for drinks like lattes, cappuccinos, and flat whites.",
    },
    {
      term: "Extraction",
      def: "The process of dissolving flavours from coffee grounds. Good extraction = balanced flavour.",
    },
  ],
  F: [
    {
      term: "Filter Coffee",
      def: "Coffee brewed by slowly passing water through grounds — clean, smooth, and aromatic.",
    },
    {
      term: "Flavour Notes",
      def: "Descriptions of the natural flavours in coffee, such as chocolate, berry, citrus, or caramel.",
    },
  ],
  M: [
    {
      term: "Medium Roast",
      def: "A balanced roast level with both sweetness and acidity. Popular for everyday brewing.",
    },
    {
      term: "Mouthfeel",
      def: "The tactile sensation of coffee — silky, creamy, crisp, or rich.",
    },
  ],
  R: [
    {
      term: "Robusta",
      def: "A coffee species with stronger, earthier flavours and higher caffeine. Often used in espresso blends.",
    },
    {
      term: "Roast Profile",
      def: "The roasting style that shapes flavour — light, medium, or dark.",
    },
  ],
  S: [
    {
      term: "Single Origin",
      def: "Coffee sourced from one farm or region, offering unique flavour characteristics.",
    },
    {
      term: "Specialty Coffee",
      def: "High‑quality coffee graded 80+ points, known for exceptional flavour and traceability.",
    },
  ],
  V: [
    {
      term: "V60",
      def: "A popular pour‑over brewer known for clarity and clean flavour.",
    },
    {
      term: "Variety",
      def: "A specific type of coffee plant, such as Bourbon, Typica, or Geisha — each with unique flavour traits.",
    },
  ],
};

export default function Dictionary() {
  const letters = Object.keys(dictionary);

  return (
    <ContentLayout>
      <div className="bg-chocolate/20 dark:bg-gray-950 min-h-screen px-6 py-16 mt-10">
        <div className="max-w-5xl mx-auto flex gap-10">
          {/* Sidebar (desktop only) */}
          <aside className="hidden md:flex flex-col sticky top-20 h-fit bg-chocolate/10 dark:bg-white/5 p-4 rounded-xl shadow-sm dark:border dark:border-orange-200/15">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#${letter}`}
                className="text-chocolate dark:text-orange-200 font-semibold py-1 hover:text-amber-700 dark:hover:text-orange-300"
              >
                {letter}
              </a>
            ))}
          </aside>

          {/* Main content */}
          <div className="flex-1 bg-chocolate/10 dark:bg-white/5 p-8 rounded-2xl shadow-sm dark:border dark:border-orange-200/15">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-6 text-chocolate dark:text-orange-200"
            >
              Coffee Dictionary
            </motion.h1>

            {/* Intro */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mb-10 font-semibold text-chocolate/90 dark:text-orange-200/75 text-lg"
            >
              Whether you're new to specialty coffee or a seasoned enthusiast,
              this dictionary helps you understand common terms, brewing
              language, and flavour notes used across the coffee world.
            </motion.p>

            {/* Sections */}
            {letters.map((letter) => (
              <motion.section
                key={letter}
                id={letter}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                className="mb-12 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold mb-4 text-chocolate dark:text-orange-200">
                  {letter}
                </h2>

                <div className="space-y-6">
                  {dictionary[letter].map((item, i) => (
                    <div key={i}>
                      <h3 className="font-bold text-chocolate dark:text-orange-200 text-lg mb-1 tracking-wider">
                        {item.term}
                      </h3>
                      <p className="text-chocolate/90 dark:text-orange-200/75 tracking-wide font-medium text-lg">
                        {item.def}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}

            {/* End */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-gray-600 dark:text-orange-200/75 mt-10"
            >
              Want us to add more terms? Contact us at{" "}
              <a
                href="mailto:support@setcoffee.co.uk"
                className="font-medium text-yellow-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-orange-300"
              >
                support@setcoffee.co.uk
              </a>
              .
            </motion.p>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
