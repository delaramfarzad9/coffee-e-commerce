import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <motion.div
      className="bg-neutral-50 min-h-screen px-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-6 text-chocolate"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Privacy Policy
        </motion.h1>

        {/* Intro */}
        <section className="mb-8">
          <p className="text-gray-600">
            At SetCoffee, we respect your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            what data we collect, how we use it, and your rights as a customer
            in the United Kingdom.
          </p>
        </section>

        {/* Data Collection */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 mb-2">
            We collect personal information only when necessary to process your
            order or improve your experience. This may include:
          </p>

          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Billing and delivery address</li>
            <li>Order details</li>
            <li>
              Payment information (processed securely by our payment provider)
            </li>
          </ul>
        </section>

        {/* How Data is Used */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 mb-2">We use your information to:</p>

          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Process and deliver your orders</li>
            <li>Send order confirmations and updates</li>
            <li>Improve our website and customer experience</li>
            <li>Respond to customer support enquiries</li>
          </ul>
        </section>

        {/* Data Protection */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            3. How We Protect Your Data
          </h2>
          <p className="text-gray-600">
            We take data protection seriously. Your information is stored
            securely and is only accessible to authorised staff. Payment details
            are handled by trusted third‑party payment processors and are never
            stored on our servers.
          </p>
        </section>

        {/* Sharing */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            4. Sharing Your Information
          </h2>
          <p className="text-gray-600">
            We do not sell or share your personal information with third
            parties, except when required to fulfil your order (such as delivery
            couriers or payment providers). These partners only receive the
            information needed to complete their service.
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            5. Cookies
          </h2>
          <p className="text-gray-600">
            Our website uses basic cookies to improve functionality and enhance
            your browsing experience. Cookies help us remember your preferences
            and understand how visitors use our site. You can disable cookies in
            your browser settings at any time.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            6. Your Rights
          </h2>
          <p className="text-gray-600 mb-2">
            As a UK customer, you have the right to:
          </p>

          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Request access to your personal data</li>
            <li>Request corrections to inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for marketing communications</li>
          </ul>
        </section>

        {/* Updates */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            7. Updates to This Policy
          </h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            Contact Us
          </h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy or how your data
            is handled, please contact us at{" "}
            <a
              href="mailto:support@setcoffee.co.uk"
              className="font-medium text-yellow-600 hover:text-amber-700"
            >
              support@setcoffee.co.uk
            </a>
            .
          </p>
        </section>
      </motion.div>
    </motion.div>
  );
}
