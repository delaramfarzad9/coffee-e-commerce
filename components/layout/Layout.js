import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import ShoppingCart from "../features/cart/ShoppingCart";
import { useState } from "react";
import React from "react";
import SearchBar from "./navbar/SearchBox/SearchBar";
import { useRouter } from "next/router";



export default function Layout({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const clearCart = () => setCart([]);
 
const [searchQuery, setSearchQuery] = useState("");
const [isSearchOpen, setIsSearchOpen] = useState(false);

const router = useRouter();
  const removeProductFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };
  const openSearch = () => {
  setSearchQuery("");   // clear input when opening
  setIsSearchOpen(true);
};


  return (
    <>
 <Navbar
  cartCount={cart.length}
  onCartClick={() => setIsCartOpen(true)}
    onSearchToggle={openSearch}
/>


      {/* FULL PAGE BACKDROP + SEARCH BAR */}
      {isSearchOpen && (
        <>
          <div
              onClick={() => {
  setIsSearchOpen(false);
}}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          />

          <SearchBar
  title="Search"
      isOpen={isSearchOpen}
  onClose={() => setIsSearchOpen(false)}
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  className="z-40     transition-opacity duration-300"
/>

        </>
      )}
      <main>
        {" "}
        {React.cloneElement(children, {
          addToCart,
          increaseQty,
          decreaseQty,
          cart,
           searchQuery,
  setSearchQuery
        })}{" "}
      </main>
      <ShoppingCart
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        clearCart={clearCart}
        onRemove={removeProductFromCart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
      />

      <Footer />
    </>
  );
}
