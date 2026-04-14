import React, { useEffect, useState } from "react";
import Svg from "@/components/ui/Svg";
import FilterPanelRow from "./FilterPanelRow";

/**
 * FilterPanel
 * Props:
 * - closePanel(): close the panel
 * - onSortChange(option): set sort option in parent
 * - onFiltersChange(filters): send filters to parent (merged there)
 * - currentFilters: the current filter object from parent
 */
const FilterPanel = ({ closePanel, onSortChange, onFiltersChange, currentFilters }) => {
  const [open, setOpen] = useState(false); // sort dropdown open
  const [localFilters, setLocalFilters] = useState({
    origin: [],
    roast: [],
    process: [],
    priceFrom: null,
    priceTo: null,
    inStock: null, // null = any, true = in stock, false = out of stock
  });
 useEffect(() => {
    if (currentFilters) {
      const {
        origin = [],
        roast = [],
        process = [],
        priceFrom = null,
        priceTo = null,
        inStock = null,
      } = currentFilters;
      setLocalFilters({ origin, roast, process, priceFrom, priceTo, inStock });
    }
  }, [currentFilters]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") closePanel(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closePanel]);

  const toggleFilter = (key, value) => {
    setLocalFilters(prev => {
      const arr = prev[key] || [];
      return { ...prev, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };

  const handlePriceChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value === "" ? null : Number(value) }));
  };

  const handleAvailabilityChange = (val) => {
    setLocalFilters(prev => ({ ...prev, inStock: val }));
  };

  const clearAll = () => {
    const empty = { origin: [], roast: [], process: [], priceFrom: null, priceTo: null, inStock: null };
    setLocalFilters(empty);
    onFiltersChange(empty);
  };

  const applyAndClose = () => {
    onFiltersChange(localFilters);
    closePanel();
  };

  return (
    <div className="fixed inset-0 z-40">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closePanel}
      />

      {/* panel (stopPropagation prevents backdrop clicks) */}
      <aside
        className="fixed top-0 right-0 w-full sm:w-1/3 h-full bg-gray-100 z-50 shadow-2xl p-5 text-chocolate/80 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-2xl text-chocolate/80">Filter & Sort</h3>
          <Svg svgId="close" onClick={closePanel} className="cursor-pointer w-6 h-6" />
        </div>

        <p className="mt-4 border-b pb-6 border-b-chocolate/30 text-chocolate/80 text-lg font-medium">Products</p>

        {/* Sort */}
        <div className="border-b border-b-chocolate/30 pb-4">
          <div className="mt-4 mx-2 flex flex-col gap-4">
            <p className="font-bold text-xl">Sort By</p>

            <div
              onClick={() => setOpen((s) => !s)}
              className="flex justify-between items-center border border-chocolate/30 p-3 rounded-sm cursor-pointer"
            >
              <span>Featured</span>
              <Svg svgId="chevron-down" className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </div>

            <div className={`mx-2 mt-2 transition-all overflow-hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="flex flex-col gap-2 border-l border-b border-r border-chocolate/30 p-2">
                <button className="text-left" onClick={() => { onSortChange(null); closePanel(); }}>Featured</button>
                <button className="text-left" onClick={() => { onSortChange("best-selling"); closePanel(); }}>Best Selling</button>
                <button className="text-left" onClick={() => { onSortChange("name-asc"); closePanel(); }}>Alphabetically A-Z</button>
                <button className="text-left" onClick={() => { onSortChange("name-desc"); closePanel(); }}>Alphabetically Z-A</button>
                <button className="text-left" onClick={() => { onSortChange("price-asc"); closePanel(); }}>Price: Low to High</button>
                <button className="text-left" onClick={() => { onSortChange("price-desc"); closePanel(); }}>Price: High to Low</button>
              </div>
            </div>
          </div>
        </div>

        {/* Availability (placeholder) */}
     <FilterPanelRow title="Availability">
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="availability" checked={localFilters.inStock === null} onChange={() => handleAvailabilityChange(null)} />
              <span>Any</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="availability" checked={localFilters.inStock === true} onChange={() => handleAvailabilityChange(true)} />
              <span>In Stock</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="availability" checked={localFilters.inStock === false} onChange={() => handleAvailabilityChange(false)} />
              <span>Out of Stock</span>
            </label>
          </div>
        </FilterPanelRow>

        {/* Price */}
           <FilterPanelRow title="Price">
          <div className="flex items-center gap-2">
            <label>From £</label>
            <input type="number" value={localFilters.priceFrom ?? ""} onChange={(e) => handlePriceChange("priceFrom", e.target.value)} className="w-24 px-2 py-1 border rounded" />
            <label>To £</label>
            <input type="number" value={localFilters.priceTo ?? ""} onChange={(e) => handlePriceChange("priceTo", e.target.value)} className="w-24 px-2 py-1 border rounded" />
          </div>
        </FilterPanelRow>

        {/* Origin */}
            <FilterPanelRow title="Origin">
          <div className="flex flex-col gap-2">
            {["Colombia","Ethiopia","Brazil","Kenya","Indonesia","Guatemala"].map(o => (
              <label key={o} className="flex items-center gap-2">
                <input type="checkbox" checked={localFilters.origin.includes(o)} onChange={() => toggleFilter("origin", o)} />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </FilterPanelRow>

           {/* Roast */}
        <FilterPanelRow title="Roast Level">
          <div className="flex flex-col gap-2">
            {["Light","Medium","Medium‑Dark","Dark"].map(r => (
              <label key={r} className="flex items-center gap-2">
                <input type="checkbox" checked={localFilters.roast.includes(r)} onChange={() => toggleFilter("roast", r)} />
                <span>{r}</span>
              </label>
            ))}
          </div>
        </FilterPanelRow>

        {/* Process */}
        <FilterPanelRow title="Process">
          <div className="flex flex-col gap-2">
            {["Washed","Natural","Wet‑hulled","Blend","Swiss Water"].map(p => (
              <label key={p} className="flex items-center gap-2">
                <input type="checkbox" checked={localFilters.process.includes(p)} onChange={() => toggleFilter("process", p)} />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </FilterPanelRow>
        
        <div className="mt-4">
          <button
            onClick={applyAndClose}
            className="w-full py-3 bg-chocolate text-white rounded-full font-semibold"
          >
            Apply Filters
          </button>

          <button
            onClick={clearAll}
            className="w-full mt-2 py-2 text-chocolate underline"
          >
            Remove All Filters
          </button>
        </div>
      </aside>
    </div>
  );
};

export default FilterPanel;
