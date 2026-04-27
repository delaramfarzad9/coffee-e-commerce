import React from "react";

const CategoryCard = ({ text, image, onClick }) => {
  
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-center items-center gap-2 sm:gap-3 bg-white/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 cursor-pointer hover:bg-white/60 active:bg-white/70 transition-all duration-300 border border-chocolate/20 hover:border-chocolate/40 hover:scale-105 hover:shadow-xl hover:shadow-chocolate/10 group min-h-[140px] sm:min-h-[180px] md:min-h-[200px]"
    >
      <div className="overflow-hidden rounded-md sm:rounded-lg flex-1 w-full flex items-center justify-center">
        <img
          src={image}
          alt={text}
          className="w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 lg:w-36 lg:h-48 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <p className="text-sm sm:text-base md:text-lg font-semibold text-chocolate tracking-wide text-center px-1 group-hover:text-chocolate/90 transition-colors">
        {text}
      </p>
    </div>
  );
};

export default CategoryCard;
