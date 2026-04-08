import { useState } from "react";
import Link from "next/link";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="bg-chocolate/30 pt-40 pb-24 gap-14 flex flex-col lg:flex-row  items-stretch justify-center  px-4 sm:px-6 md:px-7 lg:px-8 xl:px-40">
      
        {/* login form */}
         <div className="flex flex-col justify-between w-full max-w-lg bg-gray-100 rounded-xl shadow-lg p-8 ">
        
        <h1 className="text-2xl font-bold text-chocolate mb-10 text-center">
          Login
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block  text-sm font-semibold text-gray-700">
              Email<span>*</span>
            </label>
            <input
              type="email"
              className="w-full mt-1 p-2 lg:p-4 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className=" font-semibold block text-sm  text-gray-700">
              Password<span>*</span>
            </label>
           <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full lg:p-4 mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                placeholder="••••••••"
                required
              />

              {/* Show/Hide Icon */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-800"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>
{/* forgot password */}
 <div className="text-left mt-1">
              <a href="/forgot-password" className="text-sm underline text-amber-900 font-semibold hover:underline">
                Forgot your password?
              </a>
            </div>
            {/* submit button */}
          <button
            type="submit"
            className="w-full mt-2 bg-chocolate text-white py-2 lg:py-4 rounded-lg font-semibold hover:bg-amber-800 transition"
          >
            Login
          </button>
        </form>

       
      </div>
      {/* information box  */}
      <div className="flex flex-col justify-between w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-chocolate mb-6 text-center">Don't have a subscription yet?</h2>
        <div className="space-y-4 text-gray-700 mb-5">
          <p><span className="font-bold">Save 20%</span> on every bag</p>
        <p>
Always <span className="font-bold">FREE next-day delivery</span> with Royal Mail Tracked 24</p>
<p>Delicious new coffees to try every month</p>
<p>
Skip, pause or cancel <span className="font-bold">anytime</span></p>
        </div>
<button
            type="submit"
            className="w-full mt-2 py-2 lg:py-4 bg-amber-500 text-  text-white rounded-lg font-semibold hover:bg-amber-300 transition"
          >
            Subscribe & Save
          </button>
          <p className="space-y-4  text-gray-700 mb-5 mt-2 text-center">Not quite ready to subscribe?</p>
        <Link href="/shop">
          <button
            type="submit"
            className="w-full mt-2 py-2 lg:py-4 bg-amber-900 text-white  rounded-lg font-semibold hover:bg-amber-800 transition"
          >
            Browse Coffees
          </button>
        </Link>
      </div>
      </div>
    
  );
}