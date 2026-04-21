import React from "react";
import Svg from "../../../ui/Svg";
import CategoryCard from "@/components/ui/CategoryCard";
import { useRouter } from "next/router";
import categoryCard from "@/data/categoryCard";

export default function SearchBar({
  isOpen,
  className,
  title,
  onClose,
  searchQuery,
  setSearchQuery,
}) {
  const router = useRouter();

  const dismissSearch = () => {
    setSearchQuery("");
    onClose();
  };

  const navigateToShop = (query = {}) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("scrollToCatalog", "true");
    }

    onClose();
    router.push({ pathname: "/shop", query });
  };

  const handleSearch = () => {
    navigateToShop();
  };

  const handleCategoryClick = (card) => {
    setSearchQuery("");

    if (card.type === "sort") {
      navigateToShop({ sort: card.value });
      return;
    }

    if (card.type === "category") {
      navigateToShop({ category: card.value });
    }
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
          className={`flex flex-row gap-4 sm:gap-6 w-full justify-center items-center ${className}`}
        >
          <div className="md:text-xl lg:text-2xl hidden md:block font-black tracking-wider text-chocolate">
            {title}
          </div>

          <div className="w-full max-w-3xl h-14 sm:h-15 bg-white rounded-full flex flex-row justify-center items-center gap-3 px-4 sm:px-5 shadow-sm">
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What is it you're looking for?"
              value={searchQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
                if (e.key === "Escape") {
                  dismissSearch();
                }
              }}
              className="w-full h-full bg-transparent outline-none text-gray-800 font-medium text-sm sm:text-base md:text-lg"
            />
            <Svg
              svgId="search"
              onClick={handleSearch}
              className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 hover:text-gray-500 transition shrink-0"
            />
          </div>
        </div>
        {/* cartegory cards */}
        <div className="w-full mt-8 mb-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 max-w-6xl mx-auto px-2">
            {categoryCard
              .filter((card) => card.type !== "reset")
              .map((card) => (
                <CategoryCard
                  key={card.id}
                  text={card.text}
                  image={card.image}
                  onClick={() => handleCategoryClick(card)}
                />
              ))}
          </div>
        </div>
      </div>
      {/* close btn  */}
      <Svg
        svgId="close"
        onClick={dismissSearch}
        className="absolute top-5 right-5 w-8 h-8 text-chocolate cursor-pointer hover:scale-105 hover:text-red-400 duration-300 ease-in-out"
      />
    </div>
  );
}
