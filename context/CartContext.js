import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [liked, setLiked] = useState([]); //	liked:Array of product IDs the user liked

  function addToCart(id, product) {
    if (!product?.inStock) {
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }
  function toggleLike(id) {
    //toggleLike(id): adds/removes product ID from liked array
    setLiked(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // remove if already liked
          : [...prev, id], // add if not liked
    );
  }

  function isLiked(id) {
    //isLiked(id): checks if product ID is in liked array
    //Heart icon reads from isLiked(product.id)
    return liked.includes(id);
  }

  function increaseQty(id) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decreaseQty(id) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }
  // Load likes from localStorage on first render
  useEffect(() => {
    const storedLikes = localStorage.getItem("liked");
    if (storedLikes) {
      setLiked(JSON.parse(storedLikes));
    }
  }, []);

  // Save likes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("liked", JSON.stringify(liked));
  }, [liked]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        liked,
        toggleLike,
        isLiked,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
