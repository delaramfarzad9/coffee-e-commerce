import Link from "next/link";

export default function Button({
  onClick,
  className = "",
  children,
  btnTask,
  href,
  type = "button",
}) {
  if (href) {
    return (
      <Link
        href={href}
        className={`mx-auto mt-auto px-3 sm:px-6 py-2 rounded-xl bg-chocolate dark:bg-amber-700 text-gray-50 dark:text-orange-50 font-semibold text-sm sm:text-base hover:scale-105 active:scale-95 hover:bg-[#D4AF37]/80 dark:hover:bg-amber-600 hover:shadow-xl transition-all duration-200 ease-in-out flex items-center justify-center my-2 sm:my-3 cursor-pointer ${className}`}
      >
        {btnTask}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`mx-auto mt-auto px-3 sm:px-6 py-2 rounded-xl bg-chocolate dark:bg-amber-700 text-gray-50 dark:text-orange-50 font-semibold text-sm sm:text-base hover:scale-105 active:scale-95 hover:bg-[#D4AF37]/80 dark:hover:bg-amber-600 hover:shadow-xl transition-all duration-200 ease-in-out flex items-center justify-center my-2 sm:my-3 cursor-pointer ${className}`}
    >
      {btnTask}
      {children}
    </button>
  );
}
