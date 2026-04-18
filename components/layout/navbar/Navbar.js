import React, { useState, useEffect } from 'react'
import NavLink from './Navlink'
import Svg from '../../ui/Svg'
import Logo from '../../ui/Logo'


import Link from 'next/link'
import { useRouter } from "next/router"
import { useCart } from "../../../context/CartContext";







export default function Navbar({onCartClick, onSearchToggle}) {
  const [scrolled, setScrolled] = useState(false)
  
  const router = useRouter()
  const isHome = router.pathname === "/"
  const { cart } = useCart();
const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
const { liked } = useCart();
const [mobileOpen, setMobileOpen] = useState(false);

const toggleMobileMenu = () => setMobileOpen(prev => !prev);
const closeMobileMenu = () => setMobileOpen(false);

// Close on ESC
useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === "Escape") closeMobileMenu();
  };
  window.addEventListener("keydown", handleEsc);
  return () => window.removeEventListener("keydown", handleEsc);
}, []);




  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50) // threshold for background
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
const handleSearchToggle = () => {
  onSearchToggle();
};
// close mobile menu tapping out side 
useEffect(() => {
  const handleClickOutside = (e) => {
    if (!mobileOpen) return;
    const menu = document.getElementById("mobile-menu-panel");
    const button = document.getElementById("mobile-menu-button");

    if (menu && !menu.contains(e.target) && !button.contains(e.target)) {
      closeMobileMenu();
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, [mobileOpen]);

const getNavbarThemeClass = () => {
  if (isHome) {
    return scrolled
      ? "bg-gray-100/50 text-amber-900 backdrop-blur-md shadow-md"
      : "text-orange-100 backdrop-blur-sm";
  }

  return "bg-gray-100/70 text-amber-900 backdrop-blur-md shadow-md";
};


  return (
<>
    <div
      className={`
    fixed z-50 top-0 left-0 right-0 px-4 sm:px-6 md:px-7 lg:px-8 xl:px-40
    w-full h-16 flex flex-row md:justify-center justify-between items-center
    transition-colors duration-300
  ${getNavbarThemeClass()}
  `}
    >
      {/* ---logo --- */}
 
<Logo className="md:scale-100 scale-90"/>
  {/* Mobile Menu Button */}
   <button
  onClick={toggleMobileMenu}
  id="mobile-menu-button"
  className="sm:hidden text-amber-800 text-2xl"
>
  <Svg svgId={mobileOpen ? "x-mark" : "bars-3"} className="w-8 h-8" />
</button>

      {/* Desktop Menu */}
      <nav
    
        className="hidden sm:flex  flex-1 justify-center space-x-3 lg:space-x-4 items-center text-base md:text-lg lg:text-xl"
      >
        <NavLink href="/" scrolled={scrolled} isHome={isHome} >Home</NavLink>
        <NavLink href="/shop" scrolled={scrolled} isHome={isHome} >Shop</NavLink>
        <NavLink href="/blog/" scrolled={scrolled} isHome={isHome} >Blog</NavLink>
        <NavLink href="/contact" scrolled={scrolled} isHome={isHome} >Contact</NavLink>
        <NavLink href="/about" scrolled={scrolled} isHome={isHome} >About</NavLink>
       
        
     
        
      </nav>
      {/* ---cart & like & lOGIN & search--- */}
<div className='flex flex-row   justify-center items-center md:gap-2 lg:gap-4 gap-1  '>
        {/* Cart Icon */}
        <div onClick={onCartClick} className='relative ml-5 md:ml-0 group cursor-pointer'>
<Svg svgId="cart" className="md:w-7 md:h-7 text-amber-900  cursor-pointer   duration-300
        font-semibold  group-hover:scale-110 group-hover:text-orange-400
                  transition-all  ease-in-out
        " />
            <div className='absolute  cursor-pointer md:w-5 md:h-5 w-3 h-3 rounded-full bg-amber-900 group-hover:bg-orange-400 flex items-center justify-center -top-2 md:right-7 right-5  group-hover:scale-110 '>
<span className='font-bold text-gray-100 md:text-sm text-[10px] '>{cartCount}</span>
    </div>
        </div>
        
        {/* heart Icon */}
      <Link href="/favorites" className="relative">
  <Svg
    svgId="heart"
    className="md:w-7 md:h-7 text-amber-900 cursor-pointer duration-300
               font-semibold hover:scale-110 hover:text-orange-400
               transition-all ease-in-out"
  />

  {liked.length > 0 && (
    <div className="absolute -top-2 -right-2 bg-amber-900 text-white 
                    md:w-5 md:h-5 w-3 h-3 rounded-full flex items-center 
                    justify-center text-[10px] md:text-sm font-bold">
      {liked.length}
    </div>
  )}
</Link>

        {/* --- login icon--- */}
        
        <Link href="/login">
        <Svg svgId="login" className="md:w-7 md:h-7 text-amber-900  cursor-pointer   duration-300
        font-semibold  hover:scale-110 hover:text-orange-400
                  transition-all  ease-in-out
        " /></Link>
        {/* search icon */}
      <div onClick={handleSearchToggle} className=''>
          <Svg svgId="search" className=" md:w-7 md:h-7 text-amber-900  cursor-pointer   duration-300
        font-semibold  hover:scale-110 hover:text-orange-400
                  transition-all  ease-in-out
        "/>
       
      </div>
</div>
    
     
        
    </div>
    {/* Mobile Menu Panel */}
<div
id="mobile-menu-panel"
  className={`
    sm:hidden fixed top-16 left-0 right-0 z-40
    bg-gray-100/95 backdrop-blur-md shadow-md
    transition-all duration-300 overflow-hidden
    ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
  `}
>
  <nav className="flex flex-col items-start *:px-6 *:py-3  text-lg text-amber-900 bg-chocolate/30 *:hover:bg-gray-100/50 *:w-full *:transition-all *:duration-200 *:font-bold *:hover:text-chocolate ">
    <Link href="/" onClick={closeMobileMenu}>Home</Link>
    <Link href="/shop" onClick={closeMobileMenu}>Shop</Link>
    <Link href="/blog" onClick={closeMobileMenu}>Blog</Link>
    <Link href="/contact" onClick={closeMobileMenu}>Contact</Link>
    <Link href="/about" onClick={closeMobileMenu}>About</Link>
  </nav>
</div>

    </>
    
  );
}
