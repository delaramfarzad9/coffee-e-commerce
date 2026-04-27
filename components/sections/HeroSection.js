import React from "react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="hero w-full">
      <div className="flex items-center lg:pb-20 w-full justify-start aspect-4/3 md:h-dvh bg-no-repeat bg-contain md:bg-cover md:bg-bottom bg-chatgpt">
        <div className="flex flex-col gap-5 landscape:gap-3!">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
           className="text-[#F6F5F5] text-left text-lg sm:text-2xl landscape:text-3xl! lg:landscape:text-5xl!  md:text-5xl xl:text-6xl font-black md:leading-snug xl:max-w-3xl max-w-1/2 md:ml-20 ml-5 md:mb-0 drop-shadow-xl md:mt-0  ">
            Fresh Beans From <span className="text-orange-600">Colombia’s</span>{" "}
            Finest Estates
          </motion.h1>
       <motion.div
         initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
       >
           <Button
            onClick={() => router.push("/shop")}
            btnTask="Shop Now"
            className="mx-0 self-start ml-5 md:ml-20 text-base sm:text-xl md:text-2xl px-6! sm:px-10!   md:py-3! tracking-widest  "
          ></Button>
       </motion.div>
        </div>
      </div>
    </section>
  );
}
