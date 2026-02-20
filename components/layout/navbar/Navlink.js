import React from 'react'

export default function NavLink({ href, children, active }) {
  return (
  <a
      href={href}
      className={` ${
        active
          ? "text-amber-900 !  font-extrabold cursor-default"
          : "text-amber-800 font-bold hover:scale-105 transition-all duration-300 ease-in-out hover:text-orange-400   "
      }`}
    >
      {children}
    </a>
  )
}


