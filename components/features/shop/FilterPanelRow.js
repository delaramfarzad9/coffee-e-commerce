import React, { useState } from "react";
import Svg from "@/components/ui/Svg";

const FilterPanelRow = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-b-chocolate/30">
      
      <div className="mx-2 my-2 pb-2">
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          className="w-full flex items-center justify-between cursor-pointer"
        >
          <div className="font-bold text-xl text-left">{title}</div>
          <Svg svgId="chevron-down" className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/*  stop propagation so internal clicks don't bubble to header */}
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
        role="region"
        aria-label={`${title} options`}
      >
        <div className="pl-2 pt-2">
        
          {children}
        </div>
      </div>
    </div>
  );
};

export default FilterPanelRow;
