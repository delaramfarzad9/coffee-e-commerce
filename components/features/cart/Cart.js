import Svg from "../../ui/Svg";
import { useState, useRef, useEffect, useMemo } from "react";
import Quantity from "./Quantity";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../ui/Button";
import { useCart } from "@/context/CartContext";
import { getBestSellerIds } from "@/utils/bestSellers";
import { getProductSlug } from "@/utils/productSlug";
import { motion } from "framer-motion";
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
  const router = useRouter();
  const { isLiked, toggleLike } = useCart();

  const { cart, addToCart, increaseQty, decreaseQty } = useCart();
  const itemInCart = cart.find((item) => item.id === id);
  const quantity = itemInCart ? itemInCart.quantity : 0;
  const productSlug = getProductSlug(title);
  const productHref = {
    pathname: "/products/[id]",
    query: {
      id: productSlug,
      ...(router.asPath && !router.asPath.startsWith("/products/")
        ? { from: router.asPath }
        : {}),
    },
  };

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

  // Track if viewport is mobile size (<= 639px) and store it in state
  // Sync isMobileNotifyInput with a CSS media query (max-width: 639px)

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
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Link
        onClick={() => {
          // Save scroll position before navigating to product page

          sessionStorage.setItem("scrollPosition", window.scrollY);
        }}
        href={productHref}
        className="no-underline"
      >
        <div className="relative flex flex-col w-full shadow-lg rounded-2xl h-[400px] sm:h-[460px] transition-all duration-300 text-chocolate dark:text-orange-200">
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
              className="w-6 h-6 sm:w-7 sm:h-7 text-amber-900 dark:text-orange-300 cursor-pointer duration-300 hover:scale-110 active:scale-95 hover:text-[#D4AF37]/80 dark:hover:text-orange-200 transition-all ease-in-out"
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
                {/* star-filled SVG icon */}
                <Svg
                  svgId="star-filled"
                  className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 shrink-0"
                />
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
            className={`flex flex-col flex-1 gap-2 px-3 py-3 transition-all duration-300 ${!inStock ? "text-chocolate/50 dark:text-orange-200/45" : ""}`}
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
                    <Svg svgId="check" className="w-4 h-4 shrink-0" />
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
                        className="flex-1 min-w-0 text-xs border border-amber-300 dark:border-amber-700/50 rounded-lg px-2 py-2 outline-none focus:border-amber-600 dark:focus:border-amber-400 bg-white dark:bg-gray-800/80 text-gray-700 dark:text-orange-200"
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
                      <p className="text-[11px] font-medium text-red-600 dark:text-red-400 px-1">
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
                    className="bg-transparent! text-amber-800! dark:text-amber-400! border-2 border-amber-800 dark:border-amber-400 hover:bg-amber-800 dark:hover:bg-amber-400 hover:text-white dark:hover:text-gray-900 mt-2 text-sm sm:text-base"
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
                  addToCart(id, {
                    id,
                    image,
                    title,
                    price,
                    description,
                    inStock,
                  });
                }}
                btnTask="Add to Cart"
                className="mt-2 text-sm sm:text-base"
              />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
