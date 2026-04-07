import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/router"


export default function NavLink({ href, children, scrolled,isHome }) {
  const router = useRouter()
  const isActive = router.pathname === href
  const baseClasses = "font-bold transition-all duration-200 ease-in-out hover:scale-105"
  // ACTIVE LINK (always red)
  if (isActive) {
    return (
      <Link href={href} className={`${baseClasses} text-orange-800 font-extrabold`}>
        {children}
      </Link>
    )
    
  }
   // INACTIVE LINKS
  const inactiveColor = isHome
    ? scrolled
      ? "text-amber-900 hover:text-orange-400"   // home + scrolled
      : "text-orange-100 hover:text-orange-300"  // home + not scrolled
    : "text-amber-900 hover:text-orange-400"      // other pages
  return (
   <Link href={href} className={`${baseClasses} ${inactiveColor}`}>
      {children}
    </Link>
  )
}


