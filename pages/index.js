import HeroSection from "@/components/sections/HeroSection";
import Catalog from "@/components/features/catalog/Catalog";
import getProducts from "@/data/products";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { getBestSellerIds } from "@/utils/bestSellers";
import About from "@/components/sections/About";
import BlogSlider from "@/components/sections/BlogSlider";
import blogPosts from "@/data/blogPosts";

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
      {/* blog slider  */}
      <div className="mt-20 flex flex-col gap-10 text-xl text-chocolate font-bold ">
        <h2 className="text-2xl md:text-3xl lg:text-4xl mb-5 ml-5 border-b-2 border-b-chocolate/30 w-min whitespace-nowrap">
          From Our Blog
        </h2>
        <BlogSlider posts={blogPosts} />
      </div>

      <About />
    </div>
  );
}
