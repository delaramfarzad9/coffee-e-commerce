import React, { useState } from "react";
import Svg from "@/components/ui/Svg";

const FilterPanelRow = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-b-chocolate/30 dark:border-orange-200/20">
      <div className="mx-2 my-2 py-2">
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          className="w-full flex items-center justify-between cursor-pointer rounded-md px-2 -mx-2 py-1 transition-colors duration-150 hover:bg-chocolate/5 dark:hover:bg-white/5 active:bg-chocolate/10 dark:active:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70"
        >
          <div className="font-bold text-lg tracking-wider text-left dark:text-orange-200">
            {title}
          </div>
          <Svg
            svgId="chevron-down"
            className={`w-4 h-4 dark:text-orange-200 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/*  stop propagation so internal clicks don't bubble to header */}
      <div
        className={`overflow-hidden transition-all duration-300 motion-reduce:transition-none ${open ? "visible max-h-96 opacity-100" : "invisible max-h-0 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
        role="region"
        aria-label={`${title} options`}
      >
        <div className="pl-2 pt-2">{children}</div>
      </div>
    </div>
  );
};

export default FilterPanelRow;
