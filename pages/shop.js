import Catalog from "../components/features/catalog/Catalog";
import getProducts from "@/data/products";
import { useState, useEffect, useMemo } from "react";
import CategoryCard from "@/components/ui/CategoryCard";
import categoryCard from "../data/categoryCard";
import Svg from "@/components/ui/Svg";
import FilterPanel from "@/components/features/shop/FilterPanel";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Shop({ cart, addToCart, increaseQty, decreaseQty ,searchQuery, setSearchQuery, }) {
  const [products] = useState(getProducts());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
 
const [filters, setFilters] = useState({
  category: null,
});
const [sortOption, setSortOption] = useState(null);
const router = useRouter();
const catalogRef = useRef(null);



// MASTER FILTERING FUNCTION 
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // SEARCH
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.title.toLowerCase().includes(q)
      );
    }

    // CATEGORY FILTER
    if (filters.category) {
      result = result.filter(
        (item) => item.moreInfo.roast === filters.category
      );
    }

    // SORTING
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    }
    if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    if (sortOption === "name-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, searchQuery, filters, sortOption]);
// SCROLL AFTER CATALOG IS READY
useEffect(() => {
  const handleRouteDone = () => {
    const shouldScroll = sessionStorage.getItem("scrollToCatalog");

    if (shouldScroll === "true" && filteredProducts.length > 0) {
      sessionStorage.removeItem("scrollToCatalog");

      requestAnimationFrame(() => {
        if (!catalogRef.current) return;

        const offset = -70; // adjust to taste
        const top =
          catalogRef.current.getBoundingClientRect().top +
          window.pageYOffset +
          offset;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      });
    }
  };

  router.events.on("routeChangeComplete", handleRouteDone);

  return () => {
    router.events.off("routeChangeComplete", handleRouteDone);
  };
}, [filteredProducts]);

  //  SCROLL RESTORE
  useEffect(() => {
    const saved = sessionStorage.getItem("scrollPosition");
    if (saved) {
      window.scrollTo(0, parseInt(saved));
      sessionStorage.removeItem("scrollPosition");
    }
  }, []);

const handleSortChange = (option) => {
  setSortOption(option);
};
const handleFiltersChange = (newFilters) => {
  setFilters(newFilters);
};
//dynamic title
const catalogTitle =
  searchQuery.trim() !== ""
    ? `Results for "${searchQuery}"`
    : "all products";


  return (
   <>
   {/* backdrop + filterPanel */}
   {isFilterOpen && (
 <div className="fixed inset-0 z-40">
     {/* backdrop */}
        <div  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsFilterOpen(false)}
      />
        {/* filterPanel */}
        <FilterPanel isOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}  closePanel={() => setIsFilterOpen(false)}  onSortChange={handleSortChange} 
        onFiltersChange={handleFiltersChange} />
 </div>
      )}  
    
    {/* main shop page */}
    <section className="relative w-full  flex flex-col   ">
      
      <div className="flex flex-col gap-4 w-full  pb-5 mb-2 bg-chocolate/10 py-5 lg:px-20 px-5">
        <h1 className="text-chocolate text-3xl font-black pt-24 tracking-wider ">Shop Coffee</h1>
        <p className="text-chocolate font-medium text-xl ">
          Single origins, blends, and seasonal favourites.
        </p>
              {/* sortings */}
      <div className="flex flex-row gap-4 md:self-center mt-5 mb-10  ">
{categoryCard.map((c) => (
  <CategoryCard key={c.id} text={c.text} image={c.image}
   onClick={() =>
      setFilters((prev) => ({ ...prev, category: c.value }))
    } />
))}
      </div>
      </div>
{filteredProducts.length === 0 && searchQuery.trim() !== "" && (
  <div className="w-full flex flex-col items-center justify-center py-20 text-chocolate text-center px-6">
    <h2 className="text-3xl font-black tracking-wide mb-2">
      No results found
    </h2>

    <p className="text-lg opacity-80 mb-6">
      We couldn’t find anything matching “{searchQuery}”.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <button
        onClick={() => setSearchQuery("")}
        className="px-6 py-3 rounded-full bg-chocolate text-white font-semibold hover:bg-chocolate/90 transition"
      >
        Search again
      </button>

      <button
        onClick={() => {
          setSearchQuery("");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="px-6 py-3 rounded-full border border-chocolate text-chocolate font-semibold hover:bg-chocolate/10 transition"
      >
        Browse all coffees
      </button>

     
    </div>
  </div>
)}


 <div ref={catalogRef}>
  {filteredProducts.length > 0 && (
    <Catalog
      className="mb-5"
      btnTask={() => setIsFilterOpen(true)}
      btnTaskLabel={
        <div onClick={() => setIsFilterOpen(true)} className="flex flex-row gap-4">
          <Svg svgId="filter" />
          <span>Filter & Sort</span>
        </div>
      }
      title={catalogTitle}

      svgId="circle-plus"
      products={filteredProducts}
      cart={cart}
      addToCart={(id) => {
        const product = products.find((p) => p.id === id);
        addToCart(product);
      }}
      increaseQty={increaseQty}
      decreaseQty={decreaseQty}
    />
  )}
</div>


        
    </section></>
  );
}
