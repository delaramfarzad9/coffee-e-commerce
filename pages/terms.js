import { motion } from "framer-motion";

export default function Terms() {
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
          Terms & Conditions
        </motion.h1>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-gray-600 dark:text-orange-200/75">
            These Terms & Conditions govern your use of the SetCoffee website
            and the purchase of products from our online store. By accessing our
            site or placing an order, you agree to these terms.
          </p>
        </section>

        {/* Orders */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
            1. Orders & Payments
          </h2>
          <p className="text-gray-600 dark:text-orange-200/75 mb-2">
            All orders are subject to availability. Prices are listed in GBP and
            include applicable taxes. Payment must be completed at checkout
            using the available payment methods.
          </p>
          <p className="text-gray-600 dark:text-orange-200/75">
            We reserve the right to cancel or refuse any order if fraudulent or
            suspicious activity is detected.
          </p>
        </section>

        {/* Shipping */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
            2. Shipping & Delivery
          </h2>
          <p className="text-gray-600 dark:text-orange-200/75">
            Delivery times are estimates and may vary due to courier delays or
            external factors. Once an order has been dispatched, we cannot
            modify the delivery address.
          </p>
        </section>

        {/* Returns */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
            3. Returns & Refunds
          </h2>
          <p className="text-gray-600 dark:text-orange-200/75 mb-2">
            You may request a return within 14 days of receiving your order.
            Products must be unused, sealed, and in their original packaging.
          </p>
          <p className="text-gray-600 dark:text-orange-200/75">
            Refunds are issued to the original payment method once the returned
            items are inspected and approved.
          </p>
        </section>

        {/* Product Info */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
            4. Product Information
          </h2>
          <p className="text-gray-600 dark:text-orange-200/75">
            We aim to provide accurate descriptions and images of our products.
            However, slight variations in colour, packaging, or flavour profile
            may occur due to the nature of coffee as an agricultural product.
          </p>
        </section>

        {/* Website Use */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
            5. Website Use
          </h2>
          <p className="text-gray-600 dark:text-orange-200/75">
            You agree not to misuse our website, attempt unauthorised access, or
            engage in any activity that disrupts our services.
          </p>
        </section>

        {/* Updates */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
            6. Changes to Terms
          </h2>
          <p className="text-gray-600 dark:text-orange-200/75">
            We may update these Terms & Conditions at any time. Continued use of
            the website indicates acceptance of the updated terms.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-chocolate dark:text-orange-200">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-orange-200/75">
            For questions regarding these terms, please contact us at{" "}
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
