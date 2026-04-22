import Svg from "../../ui/Svg";
import Quantity from "./Quantity";
import { useState, useEffect } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useCart } from "../../../context/CartContext";

export default function ShoppingCart({ isOpen, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { cart, clearCart, removeFromCart, increaseQty, decreaseQty } =
    useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
        onClick={onClose}
      />

      {/* PANEL */}
      <div className="fixed left-0 top-0 h-screen w-full sm:w-[480px] md:w-[520px] lg:w-[560px] xl:w-[600px] bg-gray-900 z-60 flex flex-col shadow-2xl">
        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Svg svgId="cart" className="w-6 h-6 text-amber-400" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-gray-100 tracking-wide">
              My Cart
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="sm:hidden w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
          >
            <Svg svgId="close" className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        {/* ── ITEM LIST ── */}
        <div className="flex-1 overflow-y-auto cart-scroll px-4 py-3 space-y-3">
          {cart.length ? (
            cart.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 bg-gray-800 rounded-xl p-3 hover:bg-gray-750 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-lg overflow-hidden ring-1 ring-gray-700">
                  <img
                    className="w-full h-full object-cover"
                    src={product.image}
                    alt={product.title}
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <h3 className="text-gray-100 font-semibold text-sm sm:text-base leading-tight truncate">
                    {product.title}
                  </h3>
                  <span className="text-amber-400 font-bold text-sm">
                    ${product.price}
                  </span>
                  <Quantity
                    quantity={product.quantity}
                    onIncrease={() => increaseQty(product.id)}
                    onDecrease={() => decreaseQty(product.id)}
                    onRemove={() => removeFromCart(product.id)}
                    className="text-gray-100 border-gray-600 scale-75 origin-left"
                  />
                </div>

                {/* Line total */}
                <div className="shrink-0 text-right">
                  <span className="text-gray-300 text-sm font-medium">
                    ${(product.price * product.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-500">
              <Svg svgId="bag" className="w-14 h-14 opacity-40" />
              <p className="text-base italic">Your cart is empty</p>
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        {cart.length > 0 && (
          <div className="shrink-0 border-t border-gray-700 px-5 py-4 bg-gray-900 space-y-4">
            {/* Summary rows */}
            <div className="space-y-1.5 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Items ({totalItems})</span>
                <span className="text-gray-300">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-400 font-medium">Free</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-700 text-gray-100 font-bold text-base sm:text-lg">
              <span>Total</span>
              <span className="text-amber-400 text-xl">
                ${totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-1">
              <Button
                btnTask="Proceed to Checkout"
                className="w-full justify-center !mx-0 !my-0 py-3 text-base"
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2.5 rounded-xl border border-rose-500/60 text-rose-400 text-sm font-semibold
                           hover:bg-rose-500/10 transition-colors duration-200"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}

        {/* Outside close button for sm+ */}
        <div
          onClick={onClose}
          className="hidden sm:flex absolute top-5 -right-11 w-9 h-9 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors shadow-lg"
        >
          <Svg svgId="close" className="text-gray-100 w-4 h-4" />
        </div>
      </div>

      {/* CLEAR CONFIRMATION MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={clearCart}
        text="Are you sure you want to clear the whole shopping cart?"
        btnTask="Yes, Clear"
      />
    </>
  );
}
