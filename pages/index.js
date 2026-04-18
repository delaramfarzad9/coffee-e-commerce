import HeroSection from "@/components/sections/HeroSection";
import Catalog from "@/components/features/catalog/Catalog";
import getProducts from "@/data/products";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { getBestSellerIds } from "@/utils/bestSellers";


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
        btnTask={() => router.push("/shop")}
        svgId="chevron-right"
        btnTaskLabel="All Products"
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

      
    </div>
  );
}
