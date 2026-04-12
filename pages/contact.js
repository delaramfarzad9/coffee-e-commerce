export default function Contact() {
  return (
    <div className="bg-neutral-50 min-h-screen mt-10">
      {/* Header */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl font-bold text-chocolate mb-4">
          Contact Us
        </h1>
        <p className="text-chocolate max-w-2xl mx-auto">
          We'd love to hear from you.
        </p>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-10">
        
        {/* Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-chocolate">Get in Touch</h2>
          <p className="text-chocolate mb-6">
            Questions about orders, products, or anything else? Reach out anytime.
          </p>

          <div className="space-y-3 ">
            <p><strong className="text-chocolate">Email:</strong> support@setcoffee.co.uk</p>
            <p><strong className="text-chocolate">Phone:</strong> +44 20 7946 0821</p>
            <p><strong className="text-chocolate  ">Address:</strong> 42 Brew Lane, London, E2 7RG</p>
          </div>
        </div>

        {/* Form */}
        <form className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              rows="4"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-chocolate text-gray-100 font-semibold py-3 rounded-xl hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}