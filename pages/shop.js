import Catalog from "../components/features/catalog/Catalog";
import getProducts from "@/data/products";
import { useState, useEffect } from "react";
import CategoryCard from "@/components/ui/CategoryCard";
import categoryCard from "../data/categoryCard";
export default function Shop({ cart, addToCart, increaseQty, decreaseQty }) {
  const [products] = useState(getProducts());
   useEffect(() => {
    const saved = sessionStorage.getItem("scrollPosition");
    if (saved) {
      window.scrollTo(0, parseInt(saved));
      sessionStorage.removeItem("scrollPosition");
    }
  }, []);
  return (
    <section className="w-full  flex flex-col   ">
      <div className="flex flex-col gap-4 w-full  pb-5 mb-2 bg-chocolate/10 py-5 lg:px-20 px-5">
        <h1 className="text-chocolate text-3xl font-black pt-24 tracking-wider ">Shop Coffee</h1>
        <p className="text-chocolate font-medium text-xl ">
          Single origins, blends, and seasonal favourites.
        </p>
              {/* sortings */}
      <div className="flex flex-row gap-4 md:self-center mt-5 mb-10  ">
{categoryCard.map((c) => (
  <CategoryCard key={c.id} text={c.text} image={c.image} />
))}
      </div>
      </div>

      <Catalog 
      className="mb-5"
            title="all products"
  products={products} 
  cart={cart}
  addToCart={(id) => {
    const product = products.find((p) => p.id === id);
    addToCart(product);
  }}
  increaseQty={increaseQty}
        decreaseQty={decreaseQty}/>
    </section>
  );
}
