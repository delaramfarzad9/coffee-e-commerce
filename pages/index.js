
import HeroSection from "@/components/sections/HeroSection";
import Catalog from "@/components/features/catalog/Catalog";
import getProducts from "@/data/products";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { getBestSellerIds } from "@/utils/bestSellers";
import About from "@/components/sections/About";
import BlogSlider from "@/components/sections/BlogSlider";
import blogPosts from "@/data/blogPosts";
import { motion } from "framer-motion";

export default function Home({ addToCart, increaseQty, decreaseQty, cart }) {
  const [products] = useState(getProducts());
  const bestSellers = useMemo(() => {
    const ids = getBestSellerIds();
    return products
      .filter((p) => ids.has(p.id))
      .sort((a, b) => b.sales - a.sales);
  }, [products]);
  const router = useRouter();

  useEffect(() => {
    const saved = sessionStorage.getItem("scrollPosition");
    if (saved) {
      window.scrollTo(0, parseInt(saved));
      sessionStorage.removeItem("scrollPosition");
    }
  }, []);

  return (
    <div>
      <HeroSection />
<motion.div
   initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0 }}
  transition={{ duration: 0.6 }}>
        <Catalog
        className="mt-10 lg:mt-20"
        btnTask={() => router.push("/shop")}
        svgId="chevron-right"
        btnTaskLabel="All Products"
        mobileBtnLabel="Products"
        title="Best Sellers"
        products={bestSellers}
        cart={cart}
        addToCart={(id) => {
          const product = products.find((p) => p.id === id);
          addToCart(product);
        }}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
      />
</motion.div>
      {/* blog slider  */}
      <motion.div
      initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.7 }}
       className="mt-20 flex flex-col gap-10 text-xl text-chocolate font-bold ">
        <h2 className="text-2xl md:text-3xl lg:text-4xl mb-5 ml-5 border-b-2 border-b-chocolate/30 w-min whitespace-nowrap">
          From Our Blog
        </h2>
        <BlogSlider posts={blogPosts} />
      </motion.div>

      <About />
    </div>
  );
}
