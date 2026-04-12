import React from "react";
import Svg from "../../../ui/Svg";
import CategoryCard from "@/components/ui/CategoryCard";
import { useRouter } from "next/router";

export default function SearchBar({
  isOpen,
  className,
  title,
  onClose,
  searchQuery,
  setSearchQuery,
}) {
  const router = useRouter();
  const handleSearch = () => {
    // mark that we came here from a search
    if (typeof window !== "undefined") {
      sessionStorage.setItem("scrollToCatalog", "true");
    }

    onClose();
    router.push("/shop");
  };

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-50  bg-gray-100 
        transform transition-transform duration-300 ease-out shadow-lg
        ${isOpen ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="flex flex-col gap-2 mt-10 p-5">
        {/* search bar  */}
        <div
          className={`flex flex-row gap-6 w-full justify-center items-center  ${className}`}
        >
          <div className="md:text-xl lg:text-2xl hidden md:block font-black tracking-wider text-chocolate">
            {title}
          </div>

          <div className="w-2/5 h-14 bg-white rounded-full flex flex-row justify-center items-center gap-3 px-5">
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What is it you're looking for?"
              value={searchQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
                if (e.key === "Escape") {
                  onClose();
                  setSearchQuery("");
                }
              }}
              className="w-full h-full bg-transparent outline-none text-gray-800 font-medium text-lg"
            />
            <Svg
              svgId="search"
              onClick={handleSearch}
              className="w-8 h-8 text-gray-400 hover:text-gray-500 transition"
            />
          </div>
        </div>
        {/* cartegory cards */}
        <div className="flex flex-row justify-center items-center gap-6 mt-10 mb-5">
          <CategoryCard
            text="Best Sellers"
            image="/images/sorting/bestsellers.png"
          />
          <CategoryCard text="Espresso" image="/images/sorting/espresso.png" />
          <CategoryCard text="Decaf Coffee" image="/images/sorting/decaf.png" />
          <CategoryCard
            text="Filter Coffee"
            image="/images/sorting/filter.png"
          />
        </div>
      </div>
      {/* close btn  */}
      <Svg
        svgId="close"
        onClick={onClose}
        className="absolute top-5 right-5 w-8 h-8 text-chocolate cursor-pointer hover:scale-105 hover:text-red-400 duration-300 ease-in-out"
      />
    </div>
  );
}
