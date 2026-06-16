import { motion } from "framer-motion";

export default function Delivery() {
  return (
    <motion.div
      className="bg-neutral-50 dark:bg-gray-950 min-h-screen px-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-4xl mx-auto bg-white dark:bg-white/5 p-8 rounded-2xl shadow-sm dark:border dark:border-orange-200/15"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-6 text-chocolate dark:text-orange-200"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Shipping & Delivery
        </motion.h1>

        {/* Overview */}
        <section className="mb-8">
          <p className="text-gray-600 dark:text-orange-200/75">
            At SetCoffee, we aim to deliver your freshly roasted coffee quickly
            and reliably across the UK. Below you’ll find all the details about
            processing times, delivery options, and what to expect once your
            order is placed.
          </p>
        </section>

        {/* Processing Times */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
            1. Order Processing
          </h2>
          <p className="text-gray-600 dark:text-orange-200/75 mb-2">
            Orders are processed within{" "}
            <span className="font-medium">1–2 business days</span>. During busy
            periods or holidays, processing may take slightly longer.
          </p>
          <p className="text-gray-600 dark:text-orange-200/75">
            You will receive an email confirmation once your order has been
            dispatched.
          </p>
        </section>

        {/* Delivery Times */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
            2. Delivery Times
          </h2>
          <p className="text-gray-600 dark:text-orange-200/75 mb-2">
            Standard UK delivery typically takes{" "}
            <span className="font-medium">2–5 working days</span>, depending on
            your location.
          </p>
          <p className="text-gray-600 dark:text-orange-200/75">
            Delivery times are estimates and may vary due to courier delays,
            weather conditions, or seasonal demand.
          </p>
        </section>

        {/* Delivery Partners */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
            3. Delivery Partners
          </h2>
          <p className="text-gray-600 dark:text-orange-200/75">
            We work with trusted UK couriers to ensure your coffee arrives
            safely. Once your order is dispatched, the courier becomes
            responsible for delivery and tracking updates.
          </p>
        </section>

        {/* Shipping Fees */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
            4. Shipping Fees
          </h2>
          <p className="text-gray-600 dark:text-orange-200/75">
            Shipping costs are calculated at checkout based on your location and
            order size. Any promotional free‑shipping offers will be clearly
            displayed on our website.
          </p>
        </section>

        {/* Address Issues */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
            5. Incorrect or Incomplete Addresses
          </h2>
          <p className="text-gray-600 dark:text-orange-200/75">
            Please ensure your delivery address is correct at checkout. We
            cannot modify the address once the order has been dispatched. Failed
            deliveries due to incorrect addresses may incur additional charges.
          </p>
        </section>

        {/* International */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
            6. International Shipping
          </h2>
          <p className="text-gray-600 dark:text-orange-200/75">
            At this time, we only ship within the United Kingdom. We hope to
            expand international delivery options in the future.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-orange-200/75">
            If you have any questions about shipping or delivery, feel free to
            reach out at{" "}
            <a
              href="mailto:support@setcoffee.co.uk"
              className="font-medium text-yellow-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-orange-300"
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
