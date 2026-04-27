import React from 'react'
import { motion } from 'framer-motion'

const AboutMe = () => {
  return (
    <motion.section 
     initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    className="max-w-4xl mx-auto px-6 py-14 text-center">
  <motion.h2 
  initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
  className="text-3xl font-bold text-chocolate mb-4">
    About SetCoffee
  </motion.h2>

  <motion.p
  initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
   className="text-chocolate/90 font-semibold text-lg mb-6">
    We bring café-quality coffee straight to your home — crafted with care,
    delivered across the UK, and designed to elevate your daily routine.
  </motion.p>

  <motion.a
    href="/about"
    initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
    className="inline-block font-semibold bg-chocolate text-white px-6 py-3 rounded-xl hover:opacity-90"
  >
    Learn More
  </motion.a>
</motion.section>
  )
}

export default AboutMe