import Svg from "../../ui/Svg";
import { useState, useRef, useEffect, useMemo } from "react";
import Quantity from "./Quantity";
import Link from "next/link";
import Button from "../../ui/Button";
import { useCart } from "@/context/CartContext";
import { getBestSellerIds } from "@/utils/bestSellers";
import { getProductSlug } from "@/utils/productSlug";

// onClick={() => navigate(`/product/${id}`)}
export default function Cart({
  id,
  image = defaultProductImg,
  title,
  price,
  description,
  inStock = true,
  confirmUnlike = false,
  onRemove = () => {},
}) {
  const { isLiked, toggleLike } = useCart();

  const { cart, addToCart, increaseQty, decreaseQty } = useCart();
  const itemInCart = cart.find((item) => item.id === id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  // Compute once per render; Set lookup is O(1)
  const isBestSeller = useMemo(() => getBestSellerIds().has(id), [id]);

  const [showNotify, setShowNotify] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [isMobileNotifyInput, setIsMobileNotifyInput] = useState(false);
  const [notifyError, setNotifyError] = useState("");

  const [notifyDone, setNotifyDone] = useState(false);
  const notifyRef = useRef(null);

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const trimmedEmail = notifyEmail.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setNotifyError("Please enter your email first.");
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setNotifyError("Please enter a valid email address.");
      return;
    }

    setNotifyError("");
    setNotifyDone(true);
  };

  // close form when clicking outside
  useEffect(() => {
    if (!showNotify) return;
    const handleClickOutside = (e) => {
      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setShowNotify(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotify]);

  // auto-reset success banner after 4 seconds
  useEffect(() => {
    if (!notifyDone) return;
    const timer = setTimeout(() => {
      setNotifyDone(false);
      setShowNotify(false);
      setNotifyEmail("");
      setNotifyError("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [notifyDone]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const handleMediaChange = (event) => {
      setIsMobileNotifyInput(event.matches);
    };

    setIsMobileNotifyInput(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
      return () => mediaQuery.removeEventListener("change", handleMediaChange);
    }

    mediaQuery.addListener(handleMediaChange);
    return () => mediaQuery.removeListener(handleMediaChange);
  }, []);

  return (
    <Link
      onClick={() => {
        sessionStorage.setItem("scrollPosition", window.scrollY);
      }}
      href={`/products/${getProductSlug(title)}`}
      className="no-underline"
    >
      <div
        className={`relative flex flex-col w-full shadow-lg rounded-2xl h-[400px] sm:h-[460px] transition-all duration-300 ${
          !inStock ? "shadow-md ring-1 ring-gray-200/50" : ""
        }`}
      >
        <div className="absolute top-0 right-0 p-2 sm:p-4 z-10">
          {/* heart Icon */}
          <Svg
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              if (confirmUnlike && isLiked(id)) {
                //  On favorites page → open modal instead of removing instantly
                onRemove();
              } else {
                //  Normal behavior → toggle instantly
                toggleLike(id);
              }
            }}
            svgId={isLiked(id) ? "heart-filled" : "heart"}
            className="w-6 h-6 sm:w-7 sm:h-7 text-amber-900 cursor-pointer duration-300 hover:scale-110 hover:text-[#D4AF37]/80 transition-all ease-in-out"
          />
        </div>
        {/* ── image wrapper: holds overlay + badge ── */}
        <div className="relative">
          <img
            className={`w-full h-48 sm:h-60 object-cover rounded-t-2xl transition-all duration-300 ${
              !inStock ? "opacity-75 grayscale-[25%]" : ""
            }`}
            src={image}
          />

          {/* Remove the dark overlay for out of stock */}

          {/* ── Best Seller pill ── */}
          {isBestSeller && (
            <span
              className="
                absolute top-2 left-2 z-10
                inline-flex items-center gap-1 sm:gap-1.5
                px-2 py-1 sm:px-3 sm:py-1
                rounded-full
                text-[9px] sm:text-[11px] font-extrabold tracking-wide sm:tracking-widest uppercase
                text-amber-900
                bg-linear-to-r from-[#FFD700] via-[#FFC200] to-[#D4AF37]
                shadow-[0_2px_8px_rgba(212,175,55,0.4)] sm:shadow-[0_2px_12px_rgba(212,175,55,0.55)]
                border border-[#D4AF37]/60
                backdrop-blur-sm
                select-none
                pointer-events-none
                max-w-[calc(100%-5rem)]
              "
            >
              {/* Crown SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 shrink-0"
              >
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.907c.969 0 1.372 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.97-2.884a1 1 0 00-1.176 0l-3.97 2.884c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.084 10.1c-.784-.57-.38-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.52-4.674z" />
              </svg>
              <span className="hidden sm:inline">Best Seller</span>
              <span className="sm:hidden">Best</span>
            </span>
          )}

          {/* Out of Stock badge */}
          {!inStock && (
            <span className="absolute bottom-2 left-2 bg-gray-900/80 text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-widest uppercase backdrop-blur-sm">
              Out of Stock
            </span>
          )}
        </div>
        <div
          className={`flex flex-col flex-1 gap-2 px-3 py-3 transition-all duration-300 ${
            !inStock
              ? "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-500 rounded-b-2xl border-t border-gray-200/60"
              : ""
          }`}
        >
          <h2 className="font-bold text-sm sm:text-base">{title}</h2>
          <span className="font-semibold text-sm sm:text-base">
            £ {price.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </span>
          <p className="line-clamp-2 text-xs sm:text-sm mb-auto">
            {description}
          </p>

          {!inStock ? (
            <div
              className="mt-auto"
              ref={notifyRef}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {notifyDone ? (
                // success banner
                <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-green-600 text-white text-sm font-semibold shadow-md">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span>Thanks! We will email you when it is available.</span>
                </div>
              ) : showNotify ? (
                // email input state
                <form
                  onSubmit={handleNotifySubmit}
                  noValidate
                  className="flex flex-col gap-1.5"
                >
                  <div className="flex gap-1">
                    <input
                      autoFocus
                      type="email"
                      placeholder={
                        isMobileNotifyInput
                          ? "your Email.."
                          : "Enter your email..."
                      }
                      value={notifyEmail}
                      onChange={(e) => {
                        setNotifyEmail(e.target.value);
                        if (notifyError) setNotifyError("");
                      }}
                      className="flex-1 min-w-0 text-xs border border-amber-300 rounded-lg px-2 py-2 outline-none focus:border-amber-600 bg-white text-gray-700"
                    />
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="px-3 py-2 rounded-lg bg-amber-900 text-xs font-bold text-white hover:bg-amber-700 transition-colors"
                    >
                      Notify
                    </button>
                  </div>
                  {notifyError && (
                    <p className="text-[11px] font-medium text-red-600 px-1">
                      {notifyError}
                    </p>
                  )}
                </form>
              ) : (
                // initial button
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setNotifyDone(false);
                    setNotifyError("");
                    setShowNotify(true);
                  }}
                  btnTask="Notify me"
                  className="bg-transparent! text-amber-900! border-2 border-amber-900 hover:bg-amber-900 hover:text-white mt-2 text-sm sm:text-base"
                />
              )}
            </div>
          ) : quantity > 0 ? (
            <Quantity
              quantity={quantity}
              onIncrease={(e) => {
                e.preventDefault();
                e.stopPropagation();
                increaseQty(id);
              }}
              onDecrease={(e) => {
                e.preventDefault();
                e.stopPropagation();
                decreaseQty(id);
              }}
              onRemove={(e) => {
                e.preventDefault();
                e.stopPropagation();
                decreaseQty(id);
              }}
              className="mt-2"
            />
          ) : (
            // add to cart button
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(id, { id, image, title, price, description });
              }}
              btnTask="Add to Cart"
              className="mt-2 text-sm sm:text-base"
            />
          )}
        </div>
      </div>
    </Link>
  );
}
