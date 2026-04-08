export default function About() {
  return (
    <div className=" min-h-screen mt-20">
      {/* Hero */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl font-bold text-chocolate mb-4">
          About SetCoffee
        </h1>
        <p className="text-chocolate max-w-2xl mx-auto">
          Premium coffee, crafted for everyday moments.
        </p>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-chocolate">Who We Are</h2>
          <p className="text-gray-600">
            SetCoffee is a UK-based brand delivering high-quality coffee
            products with a focus on taste, consistency, and convenience.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 text-chocolate">Our Mission</h2>
          <p className="text-gray-600">
            We aim to make exceptional coffee accessible to everyone,
            elevating daily routines with better coffee.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 text-chocolate">Our Story</h2>
          <p className="text-gray-600">
            Built from a passion for coffee, SetCoffee was created to bring
            café-quality coffee straight to your home.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 text-chocolate">Why Choose Us</h2>
          <ul className="text-gray-600 list-disc list-inside">
            <li>Premium quality beans</li>
            <li>Fast UK delivery</li>
            <li>Trusted service</li>
            <li>Carefully curated products</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className=" py-12 text-center border-t border-chocolate/30">
        <h3 className="text-xl font-semibold mb-2 text-chocolate">
          Have questions?
        </h3>
        <p className="text-chocolate mb-4">
          Contact us at support@setcoffee.co.uk
        </p>
        <a
          href="/contact"
          className="inline-block bg-chocolate text-white px-6 py-3 rounded-xl hover:opacity-90"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}