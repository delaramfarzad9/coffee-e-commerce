import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const boxVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="bg-chocolate/30 dark:bg-gray-950 pt-40 pb-24 gap-14 flex flex-col lg:flex-row items-center lg:items-stretch justify-center px-4 sm:px-6 md:px-7 lg:px-8 xl:px-40">
      {/* login form */}
      <motion.div
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={boxVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="flex flex-col justify-between w-full max-w-lg bg-white dark:bg-white/5 rounded-xl shadow-lg p-8 dark:border dark:border-orange-200/15"
      >
        <h1 className="text-2xl font-bold text-chocolate dark:text-orange-200 mb-10 text-center">
          Login
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-orange-200/80">
              Email<span>*</span>
            </label>
            <input
              type="email"
              className="w-full mt-1 p-2 lg:p-4 border border-gray-300 dark:border-orange-200/20 rounded-lg bg-white dark:bg-white/5 text-gray-800 dark:text-orange-200 placeholder:text-gray-400 dark:placeholder:text-orange-200/40 focus:outline-none focus:ring-2 focus:ring-chocolate/50 dark:focus:ring-amber-500/50 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="font-semibold block text-sm text-gray-700 dark:text-orange-200/80">
              Password<span>*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full lg:p-4 mt-1 p-2 border border-gray-300 dark:border-orange-200/20 rounded-lg bg-white dark:bg-white/5 text-gray-800 dark:text-orange-200 placeholder:text-gray-400 dark:placeholder:text-orange-200/40 focus:outline-none focus:ring-2 focus:ring-chocolate/50 dark:focus:ring-amber-500/50 transition"
                placeholder="••••••••"
                required
              />

              {/* Show/Hide Icon */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 dark:text-orange-200/70 hover:text-gray-800 dark:hover:text-orange-300 transition-colors"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>
          {/* forgot password */}
          <div className="text-left mt-1">
            <a
              href="/forgot-password"
              className="text-sm underline text-amber-900 dark:text-amber-400 font-semibold hover:underline dark:hover:text-orange-300 transition-colors"
            >
              Forgot your password?
            </a>
          </div>
          {/* submit button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="w-full mt-2 bg-chocolate dark:bg-amber-700 text-white dark:text-orange-50 py-2 lg:py-4 rounded-lg font-semibold hover:bg-amber-800 dark:hover:bg-amber-600 active:scale-95 transition"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
      {/* information box  */}
      <motion.div
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={boxVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="flex flex-col justify-between w-full max-w-lg bg-white dark:bg-white/5 rounded-xl shadow-lg p-8 dark:border dark:border-orange-200/15"
      >
        <h2 className="text-2xl font-semibold text-chocolate dark:text-orange-200 mb-6 text-center">
          Don't have a subscription yet?
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-orange-200/75 mb-5">
          <p>
            <span className="font-bold">Save 20%</span> on every bag
          </p>
          <p>
            Always <span className="font-bold">FREE next-day delivery</span>{" "}
            with Royal Mail Tracked 24
          </p>
          <p>Delicious new coffees to try every month</p>
          <p>
            Skip, pause or cancel <span className="font-bold">anytime</span>
          </p>
        </div>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="w-full mt-2 py-2 lg:py-4 bg-amber-600 dark:bg-amber-700 text-white dark:text-orange-50 rounded-lg font-semibold hover:bg-amber-500 dark:hover:bg-amber-600 active:scale-95 transition"
        >
          Subscribe & Save
        </motion.button>
        <p className="space-y-4 text-gray-700 dark:text-orange-200/75 mb-5 mt-2 text-center">
          Not quite ready to subscribe?
        </p>
        <Link href="/shop">
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="w-full mt-2 py-2 lg:py-4 bg-amber-900 dark:bg-amber-900 text-white dark:text-orange-50 rounded-lg font-semibold hover:bg-amber-800 dark:hover:bg-amber-800 active:scale-95 transition"
          >
            Browse Coffees
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
