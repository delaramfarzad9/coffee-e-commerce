
import Catalog from "../components/features/catalog/Catalog";
import getProducts from "@/data/products";
import { useState, useEffect, useMemo, useRef } from "react";
import CategoryCard from "@/components/ui/CategoryCard";
import categoryCard from "../data/categoryCard";
import Svg from "@/components/ui/Svg";
import FilterPanel from "@/components/features/shop/FilterPanel";
import { useRouter } from "next/router";



export default function Shop({ cart, addToCart, increaseQty, decreaseQty, searchQuery, setSearchQuery }) {
  const [products] = useState(getProducts());
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: null,
    origin: [],
    roast: [],
    process: [],
    priceFrom: null,
    priceTo: null,
    inStock: null,
  });

  const [sortOption, setSortOption] = useState(null);
  const router = useRouter();
  const catalogRef = useRef(null);

  // ***  helpers to serialize/deserialize arrays for URL sync
  const serializeArray = (arr) => (arr && arr.length ? arr.join(",") : undefined);
  const deserializeArray = (str) => (str ? str.split(",").map(s => s.trim()).filter(Boolean) : []);

  // ***  push filters to URL (shallow replace)
  const pushFiltersToUrl = (nextFilters, nextSort) => {
    const q = {
      category: nextFilters.category || undefined,
      origin: serializeArray(nextFilters.origin),
      roast: serializeArray(nextFilters.roast),
      process: serializeArray(nextFilters.process),
      priceFrom: nextFilters.priceFrom ?? undefined,
      priceTo: nextFilters.priceTo ?? undefined,
      inStock: nextFilters.inStock === null ? undefined : String(nextFilters.inStock),
      sort: nextSort || sortOption || undefined,
    };
    Object.keys(q).forEach(k => q[k] === undefined && delete q[k]);
    router.replace({ pathname: router.pathname, query: q }, undefined, { shallow: true });
  };

  // ***  handleFiltersChange merges and pushes to URL
  const handleFiltersChange = (newFilters) => {
    setFilters(prev => {
      const merged = { ...prev, ...newFilters };
      pushFiltersToUrl(merged, sortOption);
      return merged;
    });
  };

  // ***  handleSortChange updates sort and URL
  const handleSortChange = (option) => {
    setSortOption(option);
    pushFiltersToUrl(filters, option);
  };

  // *** hydrate filters from URL on mount
  useEffect(() => {
    const q = router.query;
    if (!q || Object.keys(q).length === 0) return;

    setFilters(prev => ({
      ...prev,
      category: q.category ?? prev.category,
      origin: deserializeArray(q.origin),
      roast: deserializeArray(q.roast),
      process: deserializeArray(q.process),
      priceFrom: q.priceFrom ? Number(q.priceFrom) : prev.priceFrom,
      priceTo: q.priceTo ? Number(q.priceTo) : prev.priceTo,
      inStock: q.inStock === undefined ? prev.inStock : q.inStock === "true",
    }));

    if (q.sort) setSortOption(q.sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  //  origin tokens helper
  const normalizeOriginTokens = (originString) => {
    if (!originString) return [];
    return originString.split(/[,&]/).map(s => s.trim().toLowerCase()).filter(Boolean);
  };

  // ***  master filtering pipeline
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery?.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => item.title.toLowerCase().includes(q));
    }

   if (filters.category) {
  result = result.filter(item => item.category === filters.category);
}
    if (filters.origin?.length > 0) {
      const wanted = filters.origin.map(o => o.toLowerCase());
      result = result.filter(item => {
        const tokens = normalizeOriginTokens(item.moreInfo.origin);
        return wanted.some(w => tokens.some(t => t.includes(w) || t === w));
      });
    }

    if (filters.roast?.length > 0) {
      result = result.filter(item => filters.roast.includes(item.moreInfo.roast));
    }

    if (filters.process?.length > 0) {
      result = result.filter(item => filters.process.includes(item.moreInfo.process));
    }

    if (filters.priceFrom !== null) result = result.filter(item => item.price >= filters.priceFrom);
    if (filters.priceTo !== null) result = result.filter(item => item.price <= filters.priceTo);

    if (filters.inStock !== null) result = result.filter(item => Boolean(item.inStock) === Boolean(filters.inStock));

    if (sortOption === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortOption === "name-asc") result.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOption === "name-desc") result.sort((a, b) => b.title.localeCompare(a.title));
    if (sortOption === "best-selling") {
  result.sort((a, b) => b.sales - a.sales);
}


    return result;
  }, [products, searchQuery, filters, sortOption]);

  // scroll restore and route handling 
  useEffect(() => {
    const handleRouteDone = () => {
      const shouldScroll = sessionStorage.getItem("scrollToCatalog");
      if (shouldScroll === "true" && filteredProducts.length > 0) {
        sessionStorage.removeItem("scrollToCatalog");
        requestAnimationFrame(() => {
          if (!catalogRef.current) return;
          const offset = -70;
          const top = catalogRef.current.getBoundingClientRect().top + window.pageYOffset + offset;
          window.scrollTo({ top, behavior: "smooth" });
        });
      }
    };
    router.events.on("routeChangeComplete", handleRouteDone);
    return () => router.events.off("routeChangeComplete", handleRouteDone);
  }, [filteredProducts, router.events]);

  useEffect(() => {
    const saved = sessionStorage.getItem("scrollPosition");
    if (saved) {
      window.scrollTo(0, parseInt(saved));
      sessionStorage.removeItem("scrollPosition");
    }
  }, []);

 
const catalogTitle = useMemo(() => {
  if (searchQuery?.trim()) {
    return `Results for "${searchQuery}"`;
  }

  if (sortOption === "best-selling") {
    return "Best Sellers";
  }

  if (filters.category) {
    const found = categoryCard.find(c => c.value === filters.category);
    return found?.text || "Category";
  }

  const parts = [];

  if (filters.origin?.length) {
    parts.push(`Origin: ${filters.origin.join(", ")}`);
  }

  if (filters.roast?.length) {
    parts.push(`Roast: ${filters.roast.join(", ")}`);
  }

  if (filters.process?.length) {
    parts.push(`Process: ${filters.process.join(", ")}`);
  }

  if (filters.priceFrom !== null || filters.priceTo !== null) {
    const from = filters.priceFrom ?? 0;
    const to = filters.priceTo ?? "∞";
    parts.push(`Price: £${from}–£${to}`);
  }

  if (filters.inStock === true) parts.push("In Stock");
  if (filters.inStock === false) parts.push("Out of Stock");

  return parts.length ? parts.join(" • ") : "All Coffees";
}, [searchQuery, filters, sortOption]);
  // Note: when opening a product, set sessionStorage so back restores scroll:
  // sessionStorage.setItem("scrollToCatalog", "true"); sessionStorage.setItem("scrollPosition", String(window.scrollY)); router.push(`/product/${id}`);
// --- Add inside your Shop component, after filteredProducts is computed ---

// Order of filters to relax (from least to most important)
const RELAX_ORDER = ["price", "process", "roast", "origin", "inStock", "category"];

/**
 * Try progressively relaxing filters to find closest matches.
 * Returns { results: Product[], reason: string, relaxedFilters: object }
 */
const findClosestMatches = (allProducts, activeFilters, sortOption, searchQuery) => {
  // helper to apply a filter object (same logic as  main pipeline)
  const applyFilters = (products, f) => {
    let res = [...products];

    if (searchQuery?.trim()) {
      const q = searchQuery.toLowerCase();
      res = res.filter(item => item.title.toLowerCase().includes(q));
    }

    if (f.category) res = res.filter(item => item.category === f.category);

    if (f.origin?.length > 0) {
      const wanted = f.origin.map(o => o.toLowerCase());
      res = res.filter(item => {
        const tokens = (item.moreInfo.origin || "").split(/[,&]/).map(s => s.trim().toLowerCase());
        return wanted.some(w => tokens.some(t => t.includes(w) || t === w));
      });
    }

    if (f.roast?.length > 0) res = res.filter(item => f.roast.includes(item.moreInfo.roast));
    if (f.process?.length > 0) res = res.filter(item => f.process.includes(item.moreInfo.process));
    if (f.priceFrom !== null) res = res.filter(item => item.price >= f.priceFrom);
    if (f.priceTo !== null) res = res.filter(item => item.price <= f.priceTo);
    if (f.inStock !== null) res = res.filter(item => Boolean(item.inStock) === Boolean(f.inStock));

    // sorting (simple)
    if (sortOption === "price-asc") res.sort((a,b)=>a.price-b.price);
    if (sortOption === "price-desc") res.sort((a,b)=>b.price-a.price);
    if (sortOption === "name-asc") res.sort((a,b)=>a.title.localeCompare(b.title));
    if (sortOption === "name-desc") res.sort((a,b)=>b.title.localeCompare(a.title));

    return res;
  };

  // 1) exact
  const exact = applyFilters(allProducts, activeFilters);
  if (exact.length > 0) return { results: exact, reason: "exact", relaxedFilters: activeFilters };

  // 2) progressively relax
  for (let i = 0; i < RELAX_ORDER.length; i++) {
    const key = RELAX_ORDER[i];

    // create a shallow copy and remove that filter
    const relaxed = { ...activeFilters };

    if (key === "price") {
      relaxed.priceFrom = null;
      relaxed.priceTo = null;
    } else if (key === "origin") {
      relaxed.origin = [];
    } else if (key === "roast") {
      relaxed.roast = [];
    } else if (key === "process") {
      relaxed.process = [];
    } else if (key === "inStock") {
      relaxed.inStock = null;
    } else if (key === "category") {
      relaxed.category = null;
    }

    const res = applyFilters(allProducts, relaxed);
    if (res.length > 0) {
      return { results: res, reason: `relaxed:${key}`, relaxedFilters: relaxed };
    }
  }

  // 3) fallback: show top N best sellers or first N products
  const fallback = [...allProducts].slice(0, 12);
  return { results: fallback, reason: "fallback:default", relaxedFilters: {} };
};


const fallback = findClosestMatches(products, filters, sortOption, searchQuery);
// fallback.results is the array to render when filteredProducts is empty
// fallback.reason explains what was relaxed

  return (
    <>
      {isFilterOpen && (
        <FilterPanel
          closePanel={() => setIsFilterOpen(false)}
          onSortChange={handleSortChange}
          onFiltersChange={handleFiltersChange}
          currentFilters={filters}
          productCount={products.length}
        />
      )}

      <section className="relative w-full flex flex-col">
        <div className="flex flex-col gap-4 w-full pb-5 mb-2 bg-chocolate/10 py-5 lg:px-20 px-5">
          <h1 className="text-chocolate text-3xl font-black pt-24 tracking-wider">Shop Coffee</h1>
          <p className="text-chocolate font-medium text-xl">Single origins, blends, and seasonal favourites.</p>

          <div className="flex flex-row gap-4 md:self-center mt-5 mb-10">
            {categoryCard.map((c) => (
              <CategoryCard
                key={c.id}
                text={c.text}
                image={c.image}
onClick={() => {
  let updatedFilters = { ...filters };
  let newSort = sortOption;

  // 1. RESET (All Coffees)
  if (c.type === "reset") {
    updatedFilters = {
      category: null,
      origin: [],
      roast: [],
      process: [],
      priceFrom: null,
      priceTo: null,
      inStock: null,
    };
    newSort = null;
  }

  // 2. SORT (Best Sellers)
  else if (c.type === "sort") {
    newSort = "best-selling"; // 🔥 IMPORTANT (not "best")

    // 🔥 CLEAR category + filters
    updatedFilters = {
      category: null,
      origin: [],
      roast: [],
      process: [],
      priceFrom: null,
      priceTo: null,
      inStock: null,
    };
  }

  // 3. CATEGORY (Espresso / Decaf / Filter)
  else if (c.type === "category") {
    updatedFilters = {
      category: c.value,
      origin: [],
      roast: [],
      process: [],
      priceFrom: null,
      priceTo: null,
      inStock: null,
    };

    // 🔥 CLEAR sort when selecting category
    newSort = null;
  }

  // APPLY STATE
  setFilters(updatedFilters);
  setSortOption(newSort);

  // UPDATE URL
  pushFiltersToUrl(updatedFilters, newSort);


}}
              />
            ))}
          </div>
        </div>

        <div ref={catalogRef}>
          {filteredProducts.length > 0 && (
            <Catalog
              className="mb-5"
              btnTask={() => setIsFilterOpen(true)}
              btnTaskLabel={<div onClick={() => setIsFilterOpen(true)} className="flex flex-row gap-4"><Svg svgId="filter" /><span>Filter & Sort</span></div>}
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
 
    {/* Render the fallback results (cards) */}


{filteredProducts.length === 0 && (
  <div className="w-full flex flex-col items-center justify-center py-12 gap-4 text-chocolate text-center px-6">
    <h2 className="text-3xl font-black tracking-wide mb-2">No Exact Matches</h2>

  
    <div className="mb-6">


      <div className="flex gap-3 justify-center">
      
        <button
          onClick={() => setFilters(prev => ({ ...prev, priceFrom: null, priceTo: null }))}
          className="px-6 py-2 rounded-full border border-chocolate/20 text-chocolate shadow hover:bg-chocolate/30 hover:text-white transition"
        >
          Remove Price Filter
        </button>

        <button
          onClick={() => setFilters({ category: null, origin: [], roast: [], process: [], priceFrom: null, priceTo: null, inStock: null })}
          className="px-6 py-2 rounded-full underline tracking-wider hover:bg-chocolate/30 hover:text-white transition"
        >
          Clear All Filters
        </button>
      </div>
    </div>

    {/* Render fallback results  */}
    <div className="w-full max-w-7xl">
      <Catalog
        className="mb-5"
        btnTask={() => setIsFilterOpen(true)}
        btnTaskLabel={<div onClick={() => setIsFilterOpen(true)} className="flex flex-row gap-4"><Svg svgId="filter" /><span>Filter & Sort</span></div>}
        title={
  fallback.reason === "exact"
    ? "Results"
    : "Similar Products"
}
        svgId="circle-plus"
        products={fallback.results.slice(0, 12)} // limit to first 12 for performance
        cart={cart}
        addToCart={addToCart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
      />
    </div>
  </div>
)}


  </div>


       
      </section>
    </>
  );
}
