import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavLink({ href, children, scrolled, isHome }) {
  const router = useRouter();
  const isActive = router.pathname === href;
  const baseClasses =
    "font-bold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95";
  // ACTIVE LINK (always red)
  if (isActive) {
    return (
      <Link
        href={href}
        className={`${baseClasses} text-orange-800 dark:text-orange-300 font-extrabold`}
      >
        {children}
      </Link>
    );
  }
  // INACTIVE LINKS
  const inactiveColor = isHome
    ? scrolled
      ? "text-amber-900 dark:text-orange-200 hover:text-orange-400 dark:hover:text-orange-300" // home + scrolled
      : "text-orange-100 hover:text-orange-300" // home + not scrolled (transparent navbar, light text fine)
    : "text-amber-900 dark:text-orange-200 hover:text-orange-400 dark:hover:text-orange-300"; // other pages
  return (
    <Link href={href} className={`${baseClasses} ${inactiveColor}`}>
      {children}
    </Link>
  );
}
