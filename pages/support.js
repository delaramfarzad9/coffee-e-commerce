export default function Support() {
  return (
    <div className="bg-neutral-50 min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm">

        <h1 className="text-3xl font-bold mb-6 text-chocolate">
          Customer Support
        </h1>

        {/* Intro */}
        <section className="mb-8">
          <p className="text-gray-600">
            We're here to help. Whether you have a question about your order,
            need assistance with a product, or simply want to get in touch,
            our support team is ready to assist you. Below you’ll find all the
            ways to reach us and how we handle support requests.
          </p>
        </section>

        {/* Contact Methods */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            1. How to Contact Us
          </h2>
          <p className="text-gray-600 mb-2">
            You can reach our support team through the following channels:
          </p>

          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>
              <span className="font-medium">Email:</span> support@setcoffee.co.uk
            </li>
            <li>
              <span className="font-medium">Response Time:</span> within 24–48 hours (Mon–Fri)
            </li>
            <li>
              <span className="font-medium">Location:</span> United Kingdom
            </li>
          </ul>
        </section>

        {/* Order Issues */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            2. Order Issues & Assistance
          </h2>
          <p className="text-gray-600 mb-2">
            If there’s an issue with your order — such as missing items,
            damaged packaging, or incorrect products — please contact us as soon
            as possible with your order number and a brief description.
          </p>
          <p className="text-gray-600">
            We’ll work quickly to resolve the issue and ensure you receive the
            service you expect.
          </p>
        </section>

        {/* Refunds & Returns */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            3. Refunds & Returns Support
          </h2>
          <p className="text-gray-600 mb-2">
            For return or refund requests, please review our Returns & Refunds
            Policy before contacting support. This helps us process your request
            smoothly and without delays.
          </p>
          <p className="text-gray-600">
            Once we receive your request, we’ll guide you through the next steps.
          </p>
        </section>

        {/* Product Questions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            4. Product Questions
          </h2>
          <p className="text-gray-600">
            Have a question about our coffee, grind sizes, brewing methods, or
            flavour profiles? We’re happy to help you choose the right product
            for your taste. Just send us a message and we’ll get back to you.
          </p>
        </section>

        {/* Complaints */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            5. Complaints
          </h2>
          <p className="text-gray-600 mb-2">
            We aim to provide excellent service, but if something hasn’t met your
            expectations, please let us know. We take all complaints seriously and
            will respond promptly.
          </p>
          <p className="text-gray-600">
            To submit a complaint, email us with the subject line:
            <span className="font-medium"> “Complaint – SetCoffee”</span>.
          </p>
        </section>

        {/* Final */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-chocolate">
            We're Here to Help
          </h2>
          <p className="text-gray-600">
            Your satisfaction matters to us. If you need support, guidance, or
            simply have a question, don’t hesitate to reach out at  
            <span className="font-medium"> support@setcoffee.co.uk</span>.
          </p>
        </section>

      </div>
    </div>
  );
}
