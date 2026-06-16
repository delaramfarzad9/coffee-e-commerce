import React from "react";

const CategoryCard = ({ text, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-center items-center gap-2 sm:gap-3 bg-white/30 dark:bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 cursor-pointer hover:bg-white/60 dark:hover:bg-white/10 active:bg-white/70 dark:active:bg-white/15 active:scale-95 transition-all duration-300 border border-chocolate/20 dark:border-orange-200/15 hover:border-chocolate/40 dark:hover:border-orange-200/30 hover:scale-105 hover:shadow-xl hover:shadow-chocolate/10 dark:hover:shadow-orange-200/5 group min-h-[140px] sm:min-h-[180px] md:min-h-[200px]"
    >
      <div className="overflow-hidden rounded-md sm:rounded-lg flex-1 w-full flex items-center justify-center">
        <img
          src={image}
          alt={text}
          className="w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 lg:w-36 lg:h-48 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <p className="text-sm sm:text-base md:text-lg font-semibold text-chocolate dark:text-orange-200 tracking-wide text-center px-1 group-hover:text-chocolate/90 dark:group-hover:text-orange-100 transition-colors">
        {text}
      </p>
    </div>
  );
};

export default CategoryCard;
