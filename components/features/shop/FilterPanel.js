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
const FilterPanel = ({
  closePanel,
  onSortChange,
  onFiltersChange,
  currentFilters,
  productCount,
}) => {
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
    const handleEsc = (e) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closePanel]);

  const toggleFilter = (key, value) => {
    setLocalFilters((prev) => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handlePriceChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value === "" ? null : Number(value),
    }));
  };

  const handleAvailabilityChange = (val) => {
    setLocalFilters((prev) => ({ ...prev, inStock: val }));
  };

  const clearAll = () => {
    const empty = {
      origin: [],
      roast: [],
      process: [],
      priceFrom: null,
      priceTo: null,
      inStock: null,
    };
    setLocalFilters(empty);
    onFiltersChange(empty);
  };

  const applyAndClose = () => {
    onFiltersChange(localFilters);
    closePanel();
  };

  const handleEnterApply = (e) => {
    if (e.key !== "Enter") return;

    const tagName = e.target.tagName;
    const inputType = e.target.type;
    const isTextLikeInput =
      tagName === "INPUT" &&
      !["checkbox", "radio", "button", "submit"].includes(inputType);

    if (!isTextLikeInput) return;

    e.preventDefault();
    applyAndClose();
  };

  return (
    <div className="fixed inset-0 z-40 ">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/10 backdrop-blur-xs"
        onClick={closePanel}
      />

      {/* panel (stopPropagation prevents backdrop clicks) */}
      <aside
        className="fixed top-16 right-0 w-full sm:w-1/3 h-full bg-gray-100 z-50 shadow-2xl px-5 pt-6 text-chocolate/80 overflow-y-auto pb-24 "
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleEnterApply}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-2xl text-chocolate/80">
            Filter & Sort
          </h3>
          <Svg
            svgId="close"
            onClick={closePanel}
            className="cursor-pointer w-8 h-8"
          />
        </div>

        <p className="mt-2  border-b pb-2 border-b-chocolate/30 text-chocolate/80 text-lg font-medium">
          {productCount} Products{" "}
        </p>

        {/* Sort */}
        <div className="border-b border-b-chocolate/30 ">
          <div className="mt-4 mx-2 flex flex-col gap-4">
            <p className="font-bold text-xl">Sort By</p>
            {/* sorting menu  */}
            <div
              onClick={() => setOpen((s) => !s)}
              className="flex justify-between items-center border-2 border-chocolate/30 p-3 rounded-sm cursor-pointer"
            >
              <span className="font-semibold">Featured</span>
              <Svg
                svgId="chevron-down"
                className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </div>
            {/* opened menu sorting */}
            <div
              className={` transition-all overflow-hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="flex flex-col  border-l border-b border-r border-chocolate/30 *:hover:bg-chocolate/10 *:text-left *:p-2">
                <button
                  onClick={() => {
                    onSortChange(null);
                    closePanel();
                  }}
                >
                  Featured
                </button>
                <button
                  onClick={() => {
                    onSortChange("best-selling");
                    closePanel();
                  }}
                >
                  Best Selling
                </button>
                <button
                  onClick={() => {
                    onSortChange("name-asc");
                    closePanel();
                  }}
                >
                  Alphabetically A-Z
                </button>
                <button
                  onClick={() => {
                    onSortChange("name-desc");
                    closePanel();
                  }}
                >
                  Alphabetically Z-A
                </button>
                <button
                  onClick={() => {
                    onSortChange("price-asc");
                    closePanel();
                  }}
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => {
                    onSortChange("price-desc");
                    closePanel();
                  }}
                >
                  Price: High to Low
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Availability (placeholder) */}
        <FilterPanelRow title="Availability">
          <div className="flex flex-col gap-2 pb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="availability"
                checked={localFilters.inStock === null}
                onChange={() => handleAvailabilityChange(null)}
              />
              <span>Any</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="availability"
                checked={localFilters.inStock === true}
                onChange={() => handleAvailabilityChange(true)}
              />
              <span>In Stock</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="availability"
                checked={localFilters.inStock === false}
                onChange={() => handleAvailabilityChange(false)}
              />
              <span>Out of Stock</span>
            </label>
          </div>
        </FilterPanelRow>

        {/* Price */}
        <FilterPanelRow title="Price">
          <div className="flex items-center gap-2 pb-4">
            <label>From £</label>
            <input
              type="number"
              value={localFilters.priceFrom ?? ""}
              onChange={(e) => handlePriceChange("priceFrom", e.target.value)}
              className="w-24 px-2 py-1 border rounded"
            />
            <label>To £</label>
            <input
              type="number"
              value={localFilters.priceTo ?? ""}
              onChange={(e) => handlePriceChange("priceTo", e.target.value)}
              className="w-24 px-2 py-1 border rounded"
            />
          </div>
        </FilterPanelRow>

        {/* Origin */}
        <FilterPanelRow title="Origin">
          <div className="flex flex-col gap-2 pb-4">
            {[
              "Colombia",
              "Ethiopia",
              "Brazil",
              "Kenya",
              "Indonesia",
              "Guatemala",
            ].map((o) => (
              <label key={o} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={localFilters.origin.includes(o)}
                  onChange={() => toggleFilter("origin", o)}
                />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </FilterPanelRow>

        {/* Roast */}
        <FilterPanelRow title="Roast Level">
          <div className="flex flex-col gap-2 pb-4">
            {["Light", "Medium", "Medium‑Dark", "Dark"].map((r) => (
              <label key={r} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={localFilters.roast.includes(r)}
                  onChange={() => toggleFilter("roast", r)}
                />
                <span>{r}</span>
              </label>
            ))}
          </div>
        </FilterPanelRow>

        {/* Process */}
        <FilterPanelRow title="Process">
          <div className="flex flex-col gap-2 pb-4">
            {["Washed", "Natural", "Wet‑hulled", "Blend", "Swiss Water"].map(
              (p) => (
                <label key={p} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={localFilters.process.includes(p)}
                    onChange={() => toggleFilter("process", p)}
                  />
                  <span>{p}</span>
                </label>
              ),
            )}
          </div>
        </FilterPanelRow>

        <div className="mt-4">
          <button
            onClick={applyAndClose}
            className="w-full py-3 bg-chocolate text-gray-50 rounded-full font-semibold text-lg"
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
