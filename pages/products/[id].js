import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import getProducts from "../../data/products";
import Quantity from "@/components/features/cart/Quantity";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import Svg from "@/components/ui/Svg";
import ContentLayout from "@/components/layout/ContentLayout";
import { findProductBySlugOrId } from "@/utils/productSlug";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { cart, addToCart, increaseQty, decreaseQty } = useCart();
  const { isLiked, toggleLike } = useCart();
  const [showNotify, setShowNotify] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyDone, setNotifyDone] = useState(false);
  const [notifyError, setNotifyError] = useState("");
  const [isMobileNotifyInput, setIsMobileNotifyInput] = useState(false);
  const notifyRef = useRef(null);

  const products = getProducts();
  const product = findProductBySlugOrId(products, id);

  if (!product) return <p>Loading...</p>;

  const itemInCart = cart.find((item) => item.id === id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;

  const handleNotifySubmit = (e) => {
    e.preventDefault();

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

  useEffect(() => {
    if (!showNotify) return;

    const handleClickOutside = (e) => {
      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setShowNotify(false);
        setNotifyError("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotify]);

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
    <ContentLayout>
      <div className="flex lg:flex-row gap-5 flex-col items-center justify-start py-10 pl-6 pr-6 sm:pl-10 sm:pr-10">
        {/* left side picture */}
        <img className="w-96 m-10" src={product.image} alt={product.title} />
        {/* right side /title/description/price/add to cart button/favorite button */}
        <div className="flex flex-col gap-4 justify-between items-start mt-10">
          {/* title */}
          <div className="flex flex-wrap items-center gap-3 mb-5 border-b-2 border-chocolate pb-2">
            <h1 className="text-3xl font-bold text-chocolate">
              {product.title}
            </h1>
            {!product.inStock && (
              <span className="inline-flex items-center rounded-full bg-gray-900/85 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                Out of Stock
              </span>
            )}
          </div>
          {/* description */}
          <p className="text-xl font-semibold">{product.description}</p>

          {/* more information  */}
          <div className="grid grid-cols-2 grid-rows-6 gap-y-2 mt-5 ">
            <p className="text-lg font-bold text-chocolate">Origin</p>
            <p className="font-semibold ">{product.moreInfo.origin}</p>
            <p className="text-lg font-bold text-chocolate">Roast</p>
            <p className="font-semibold ">{product.moreInfo.roast}</p>
            <p className="text-lg font-bold text-chocolate">Tasting Notes</p>
            <p className="font-semibold ">{product.moreInfo.tastingNotes}</p>
            <p className="text-lg font-bold text-chocolate">Weight</p>
            <p className="font-semibold ">250 g</p>
            <p className="text-lg font-black text-chocolate">Price</p>
            <p className="font-bold ">£ {product.price.toFixed(2)}</p>
          </div>
          {/* more information finishes */}

          {/* add to card & favorite button container */}
          <div className="w-full flex flex-wrap justify-start items-center gap-5 lg:gap-x-20">
            {!product.inStock ? (
              <div
                ref={notifyRef}
                className="flex min-w-70 flex-col items-start gap-2"
              >
                {notifyDone ? (
                  <div className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-md">
                    <svg
                      className="h-4 w-4 shrink-0"
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
                  <form
                    onSubmit={handleNotifySubmit}
                    noValidate
                    className="flex w-full max-w-md flex-col gap-2"
                  >
                    <div className="flex w-full gap-2">
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
                        className="min-w-0 flex-1 rounded-lg border border-amber-300 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-amber-600"
                      />
                      <button
                        type="submit"
                        className="rounded-lg bg-amber-900 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-700"
                      >
                        Notify
                      </button>
                    </div>
                    {notifyError && (
                      <p className="px-1 text-sm font-medium text-red-600">
                        {notifyError}
                      </p>
                    )}
                  </form>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setNotifyDone(false);
                        setNotifyError("");
                        setShowNotify(true);
                      }}
                      btnTask="Notify me"
                      className="bg-transparent! text-amber-900! border-2 border-amber-900 hover:bg-amber-900 hover:text-white w-full max-w-xs"
                    />
                    <p className="text-sm font-medium text-gray-500">
                      This coffee is currently unavailable and cannot be added
                      to the cart.
                    </p>
                  </>
                )}
              </div>
            ) : quantityInCart > 0 ? (
              <Quantity
                quantity={quantityInCart}
                onIncrease={() => increaseQty(id)}
                onDecrease={() => decreaseQty(id)}
                onRemove={() => decreaseQty(id)}
                className="mt-5"
              />
            ) : (
              <Button
                onClick={() => addToCart(id, product)}
                btnTask="Add to Cart"
                className=""
              />
            )}
            {/* favorite button */}
            <div
              className="flex items-center gap-3 cursor-pointer select-none px-6 py-2 my-3"
              onClick={() => toggleLike(product.id)}
            >
              <Svg
                svgId={isLiked(product.id) ? "heart-filled" : "heart"}
                className={`w-6 h-6 cursor-pointer transition-all duration-200 ${
                  isLiked(product.id)
                    ? "text-red-600 heart-pop"
                    : "text-chocolate"
                }`}
              />

              <span className="text-lg font-semibold">
                {isLiked(product.id)
                  ? "Remove from favorites"
                  : "Add to favorites"}
              </span>
            </div>
            {/* favorite button finishes */}
          </div>
        </div>
        {/* right side /title/description/price/add to cart button/favorite button */}
      </div>
    </ContentLayout>
  );
}
