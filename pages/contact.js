import { useState } from "react";

import { motion } from "framer-motion";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    // Simulate async send (replace with real API call)
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");

      // Auto-hide success after 4 seconds
      setTimeout(() => setSent(false), 4000);
    }, 800);
  };

  return (
    <div className="bg-neutral-50 dark:bg-gray-950 min-h-screen mt-10">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center py-16 px-6"
      >
        <h1 className="text-4xl font-bold text-chocolate dark:text-orange-200 mb-4">
          Contact Us
        </h1>
        <p className="text-chocolate dark:text-orange-200/75 max-w-2xl mx-auto">
          We'd love to hear from you.
        </p>
      </motion.section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-10">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-chocolate dark:text-orange-200">
            Get in Touch
          </h2>
          <p className="text-chocolate dark:text-orange-200/75 mb-6">
            Questions about orders, products, or anything else? Reach out
            anytime.
          </p>

          <div className="space-y-3 ">
            <p className="dark:text-orange-200/75">
              <strong className="text-chocolate dark:text-orange-200">
                Email:
              </strong>{" "}
              <a
                href="mailto:support@setcoffee.co.uk"
                className="text-amber-900 dark:text-amber-400 underline font-semibold hover:text-amber-700 dark:hover:text-orange-300 transition-colors"
              >
                support@setcoffee.co.uk
              </a>
            </p>

            <p className="dark:text-orange-200/75">
              <strong className="text-chocolate dark:text-orange-200">
                Phone:
              </strong>{" "}
              <a
                href="tel:+442079460821"
                className="text-amber-900 dark:text-amber-400 underline font-semibold hover:text-amber-700 dark:hover:text-orange-300 transition-colors"
              >
                +44 20 7946 0821
              </a>
            </p>

            <p className="dark:text-orange-200/75">
              <strong className="text-chocolate dark:text-orange-200">
                Address:
              </strong>{" "}
              42 Brew Lane, London, E2 7RG
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="bg-white dark:bg-white/5 dark:border dark:border-orange-200/15 p-6 rounded-2xl shadow-sm space-y-4"
        >
          {sent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">Message sent successfully!</span>
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-orange-200/80">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:border-orange-200/20 rounded-lg px-3 py-2 bg-white dark:bg-white/5 text-gray-800 dark:text-orange-200 placeholder:text-gray-400 dark:placeholder:text-orange-200/40 focus:outline-none focus:ring-2 focus:ring-chocolate/50 dark:focus:ring-amber-500/50 transition"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-orange-200/80">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-orange-200/20 rounded-lg px-3 py-2 bg-white dark:bg-white/5 text-gray-800 dark:text-orange-200 placeholder:text-gray-400 dark:placeholder:text-orange-200/40 focus:outline-none focus:ring-2 focus:ring-chocolate/50 dark:focus:ring-amber-500/50 transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-orange-200/80">
              Message
            </label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 dark:border-orange-200/20 rounded-lg px-3 py-2 bg-white dark:bg-white/5 text-gray-800 dark:text-orange-200 placeholder:text-gray-400 dark:placeholder:text-orange-200/40 focus:outline-none focus:ring-2 focus:ring-chocolate/50 dark:focus:ring-amber-500/50 transition"
              placeholder="Your message..."
              required
            ></textarea>
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={sending}
            className={`w-full transition-all duration-200 font-semibold py-3 rounded-xl text-gray-100 ${
              sending
                ? "bg-gray-400 dark:bg-gray-600 cursor-wait"
                : "bg-chocolate dark:bg-amber-700 hover:opacity-90 dark:hover:bg-amber-600 active:scale-95"
            }`}
          >
            {sending ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </section>
    </div>
  );
}
