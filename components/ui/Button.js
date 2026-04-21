export default function Button({ onClick, className, children, btnTask }) {
  return (
    <button
      onClick={onClick}
      className={`mx-auto mt-auto px-3 sm:px-6 py-2 rounded-xl bg-chocolate text-gray-50 font-semibold text-sm sm:text-base hover:scale-105 hover:bg-[#D4AF37]/80 
                 hover:shadow-xl transition-all duration-300 ease-in-out
                 flex items-center justify-center my-2 sm:my-3 cursor-pointer ${className}`}
    >
      {btnTask} {children}
    </button>
  );
}
