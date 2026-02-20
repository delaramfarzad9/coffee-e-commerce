import HeroSection from "@/components/sections/HeroSection";
import Catalog from "@/components/features/catalog/Catalog";
import getProducts from "@/data/products";
import { useState } from "react";

export default function Home({ addToCart }) {
  const [products] = useState(getProducts());
 
  return (
    <div>
      <HeroSection />
      <Catalog 
  products={products} 
  addToCart={(id) => {
    const product = products.find((p) => p.id === id);
    addToCart(product);
  }}
/>

      
    </div>
  );
}
