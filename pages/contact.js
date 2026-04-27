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
    <div className="bg-neutral-50 min-h-screen mt-10">
      {/* Header */}
      <motion.section 
      initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7 }}
      className="text-center py-16 px-6">
         
        <h1 className="text-4xl font-bold text-chocolate mb-4">Contact Us</h1>
        <p className="text-chocolate max-w-2xl mx-auto">
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
          <h2 className="text-2xl font-semibold mb-4 text-chocolate">
            Get in Touch
          </h2>
          <p className="text-chocolate mb-6">
            Questions about orders, products, or anything else? Reach out
            anytime.
          </p>

          <div className="space-y-3 ">
            <p>
              <strong className="text-chocolate">Email:</strong>{" "}
              <a
                href="mailto:support@setcoffee.co.uk"
                className="text-amber-900 underline font-semibold"
              >
                support@setcoffee.co.uk
              </a>
            </p>

            <p>
              <strong className="text-chocolate">Phone:</strong>{" "}
              <a
                href="tel:+442079460821"
                className="text-amber-900 underline font-semibold"
              >
                +44 20 7946 0821
              </a>
            </p>

            <p>
              <strong className="text-chocolate  ">Address:</strong> 42 Brew
              Lane, London, E2 7RG
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
          className="bg-white p-6 rounded-2xl shadow-sm space-y-4"
        >
          {sent && (
            <motion.div
             initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
             className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
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
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Your message..."
              required
            ></textarea>
          </div>

          <motion.button
            type="submit"
             whileTap={{ scale: 0.97 }}
            disabled={sending}
            className={`w-full ${sending ? "bg-gray-400 cursor-wait" : "bg-chocolate hover:opacity-90"} text-gray-100 font-semibold py-3 rounded-xl`}
          >
            {sending ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </section>
    </div>
  );
}
