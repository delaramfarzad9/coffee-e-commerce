import HeroSection from "@/components/sections/HeroSection";
import Catalog from "@/components/features/catalog/Catalog";
import getProducts from "@/data/products";
import { useState, useEffect } from "react";

export default function Home({ addToCart, increaseQty, decreaseQty, cart }) {
  const [products] = useState(getProducts());
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
  products={products} 
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
