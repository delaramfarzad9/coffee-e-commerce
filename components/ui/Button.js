

export default function Button({onClick,className,children,btnTask})  {
  return (
    <button onClick={onClick}  className={`mx-auto mt-auto px-5 py-2 rounded-xl bg-chocolate text-gray-50 font-semibold  hover:scale-105 hover:bg-[#D4AF37]/80 
                 hover:shadow-xl transition-all duration-300 ease-in-out
                 flex items-center gap-2  my-3 ${className}`}>{btnTask} {children}</button>
  )
}
