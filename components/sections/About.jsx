import React from 'react'

const AboutMe = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-14 text-center">
  <h2 className="text-3xl font-bold text-chocolate mb-4">
    About SetCoffee
  </h2>

  <p className="text-chocolate/90 font-semibold text-lg mb-6">
    We bring café-quality coffee straight to your home — crafted with care,
    delivered across the UK, and designed to elevate your daily routine.
  </p>

  <a
    href="/about"
    className="inline-block font-semibold bg-chocolate text-white px-6 py-3 rounded-xl hover:opacity-90"
  >
    Learn More
  </a>
</section>
  )
}

export default AboutMe