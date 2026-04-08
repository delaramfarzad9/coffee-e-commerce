export default function Delivery() {
  return (
    <div className="bg-neutral-50 min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm">

        <h1 className="text-3xl font-bold mb-6 text-chocolate">
          Shipping & Delivery
        </h1>

        {/* Overview */}
        <section className="mb-8">
          <p className="text-gray-600">
            At SetCoffee, we aim to deliver your freshly roasted coffee quickly
            and reliably across the UK. Below you’ll find all the details about
            processing times, delivery options, and what to expect once your
            order is placed.
          </p>
        </section>

        {/* Processing Times */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            1. Order Processing
          </h2>
          <p className="text-gray-600 mb-2">
            Orders are processed within <span className="font-medium">1–2 business days</span>.
            During busy periods or holidays, processing may take slightly longer.
          </p>
          <p className="text-gray-600">
            You will receive an email confirmation once your order has been dispatched.
          </p>
        </section>

        {/* Delivery Times */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            2. Delivery Times
          </h2>
          <p className="text-gray-600 mb-2">
            Standard UK delivery typically takes <span className="font-medium">2–5 working days</span>,
            depending on your location.
          </p>
          <p className="text-gray-600">
            Delivery times are estimates and may vary due to courier delays,
            weather conditions, or seasonal demand.
          </p>
        </section>

        {/* Delivery Partners */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            3. Delivery Partners
          </h2>
          <p className="text-gray-600">
            We work with trusted UK couriers to ensure your coffee arrives safely.
            Once your order is dispatched, the courier becomes responsible for
            delivery and tracking updates.
          </p>
        </section>

        {/* Shipping Fees */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            4. Shipping Fees
          </h2>
          <p className="text-gray-600">
            Shipping costs are calculated at checkout based on your location and
            order size. Any promotional free‑shipping offers will be clearly
            displayed on our website.
          </p>
        </section>

        {/* Address Issues */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            5. Incorrect or Incomplete Addresses
          </h2>
          <p className="text-gray-600">
            Please ensure your delivery address is correct at checkout. We cannot
            modify the address once the order has been dispatched. Failed
            deliveries due to incorrect addresses may incur additional charges.
          </p>
        </section>

        {/* International */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            6. International Shipping
          </h2>
          <p className="text-gray-600">
            At this time, we only ship within the United Kingdom. We hope to
            expand international delivery options in the future.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            Contact Us
          </h2>
          <p className="text-gray-600">
            If you have any questions about shipping or delivery, feel free to
            reach out at <span className="font-medium">support@setcoffee.co.uk</span>.
          </p>
        </section>

      </div>
    </div>
  );
}
