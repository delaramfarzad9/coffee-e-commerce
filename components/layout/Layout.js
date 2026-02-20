import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import ShoppingCart from '../features/cart/ShoppingCart'
import { useState } from 'react'



export default function Layout({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const clearCart = () => setCart([]);
  
  const removeProductFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
   
const addToCart = (product) => {
  setCart((prev) => [...prev, product]);
};

  return (
    <>
      <Navbar cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />
      <main>{children(addToCart)} </main>
      <ShoppingCart
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        clearCart={clearCart}
        onRemove={removeProductFromCart}
      />
      <Footer />
    </>
  )
}
