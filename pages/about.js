import { motion } from "framer-motion";

export default function About() {
  const blockVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.12,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="min-h-screen mt-20 bg-neutral-50 dark:bg-gray-950">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center py-16 px-6"
      >
        <h1 className="text-4xl font-bold text-chocolate dark:text-orange-200 mb-4">
          About SetCoffee
        </h1>
        <p className="text-chocolate dark:text-orange-200/75 max-w-2xl mx-auto">
          Premium coffee, crafted for everyday moments.
        </p>
      </motion.section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-10">
        {[
          {
            title: "Who We Are",
            text: "SetCoffee is a UK-based brand delivering high-quality coffee products with a focus on taste, consistency, and convenience.",
          },
          {
            title: "Our Mission",
            text: "We aim to make exceptional coffee accessible to everyone, elevating daily routines with better coffee.",
          },
          {
            title: "Our Story",
            text: "Built from a passion for coffee, SetCoffee was created to bring café-quality coffee straight to your home.",
          },
          {
            title: "Why Choose Us",
            list: [
              "Premium quality beans",
              "Fast UK delivery",
              "Trusted service",
              "Carefully curated products",
            ],
          },
        ].map((block, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={blockVariants}
          >
            <h2 className="text-2xl font-semibold mb-3 text-chocolate dark:text-orange-200">
              {block.title}
            </h2>

            {block.text && (
              <p className="text-gray-600 dark:text-orange-200/75">
                {block.text}
              </p>
            )}

            {block.list && (
              <ul className="text-gray-600 dark:text-orange-200/75 list-disc list-inside">
                {block.list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-12 text-center border-t border-chocolate/30 dark:border-orange-200/15"
      >
        <h3 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
          Have questions?
        </h3>
        <p className="text-chocolate dark:text-orange-200/75 mb-4">
          Contact us at{" "}
          <a
            href="mailto:support@setcoffee.co.uk"
            className="text-amber-900 dark:text-amber-400 underline font-semibold hover:text-amber-700 dark:hover:text-orange-300 transition-colors"
          >
            support@setcoffee.co.uk
          </a>
        </p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-block bg-chocolate dark:bg-amber-700 text-white dark:text-orange-50 px-6 py-3 rounded-xl hover:opacity-90 dark:hover:bg-amber-600 transition-colors"
        >
          Contact Us
        </motion.a>
      </motion.section>
    </div>
  );
}
