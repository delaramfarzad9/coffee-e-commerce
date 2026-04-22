import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import getProducts from "../../data/products";
import Quantity from "@/components/features/cart/Quantity";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import Svg from "@/components/ui/Svg";
import ContentLayout from "@/components/layout/ContentLayout";
import { findProductBySlugOrId, getProductSlug } from "@/utils/productSlug";

export default function ProductDetail({ product: productProp }) {
  const router = useRouter();
  const rawId = router.query?.id;
  const idFromRouter = Array.isArray(rawId) ? rawId[0] : rawId;

  const { cart, addToCart, increaseQty, decreaseQty } = useCart();
  const { isLiked, toggleLike } = useCart();
  const [showNotify, setShowNotify] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyDone, setNotifyDone] = useState(false);
  const [notifyError, setNotifyError] = useState("");
  const [isMobileNotifyInput, setIsMobileNotifyInput] = useState(false);
  const notifyRef = useRef(null);

  const products = getProducts();
  const product =
    productProp ??
    (idFromRouter ? findProductBySlugOrId(products, idFromRouter) : null);

  const effectiveId = product?.id ?? idFromRouter;
  const itemInCart = cart.find((item) => item.id === effectiveId);
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

  if (!product) {
    return (
      <ContentLayout>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p>Loading...</p>
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image Section */}
            <div className="relative">
              <div className="sticky top-8">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-100">
                  <img
                    className={`h-full w-full object-cover transition-transform duration-500 hover:scale-105 ${
                      !product.inStock ? "opacity-75 grayscale-[25%]" : ""
                    }`}
                    src={product.image}
                    alt={product.title}
                  />
                  {!product.inStock && (
                    <span className="absolute bottom-3 left-3 z-10 rounded-full bg-red-600 px-4 py-2 text-sm font-bold uppercase tracking-wider text-white shadow-lg">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col space-y-8">
              {/* Header Section */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h1 className="text-3xl font-bold text-chocolate sm:text-3xl lg:text-4xl">
                    {product.title}
                  </h1>
                  <div
                    className="group flex cursor-pointer items-center gap-2 rounded-full bg-white p-3 shadow-md ring-1 ring-gray-100 transition-all hover:shadow-lg hover:ring-chocolate/20"
                    onClick={() => toggleLike(product.id)}
                  >
                    <Svg
                      svgId={isLiked(product.id) ? "heart-filled" : "heart"}
                      className={`h-6 w-6 transition-all duration-200 ${
                        isLiked(product.id)
                          ? "text-red-500 heart-pop"
                          : "text-gray-400 group-hover:text-red-400"
                      }`}
                    />
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-gray-600 sm:text-xl">
                  {product.description}
                </p>

                <div className="flex items-end gap-4">
                  <span className="text-4xl font-bold text-chocolate">
                    £{product.price.toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-500">250g</span>
                </div>
              </div>

              {/* Product Information Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
                  <h3 className="mb-3 font-semibold text-chocolate">Origin</h3>
                  <p className="text-gray-700">{product.moreInfo.origin}</p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
                  <h3 className="mb-3 font-semibold text-chocolate">
                    Roast Level
                  </h3>
                  <p className="text-gray-700">{product.moreInfo.roast}</p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100 sm:col-span-2">
                  <h3 className="mb-3 font-semibold text-chocolate">
                    Tasting Notes
                  </h3>
                  <p className="text-gray-700">
                    {product.moreInfo.tastingNotes}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
                  <h3 className="mb-3 font-semibold text-chocolate">Process</h3>
                  <p className="text-gray-700">{product.moreInfo.process}</p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
                  <h3 className="mb-3 font-semibold text-chocolate">Weight</h3>
                  <p className="text-gray-700">250g</p>
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="space-y-6">
                {!product.inStock ? (
                  <div ref={notifyRef} className="space-y-4">
                    {notifyDone ? (
                      <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800">
                        <svg
                          className="h-6 w-6 shrink-0 text-emerald-600"
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
                        <div>
                          <p className="font-semibold">
                            Perfect! We'll notify you
                          </p>
                          <p className="text-sm text-emerald-700">
                            You'll receive an email when this coffee is back in
                            stock.
                          </p>
                        </div>
                      </div>
                    ) : showNotify ? (
                      <div className="rounded-xl bg-amber-50 border border-amber-200 p-6">
                        <h3 className="mb-4 text-lg font-semibold text-amber-900">
                          Get notified when available
                        </h3>
                        <form
                          onSubmit={handleNotifySubmit}
                          noValidate
                          className="space-y-3"
                        >
                          <div className="flex gap-3">
                            <input
                              autoFocus
                              type="email"
                              placeholder="Enter your email address"
                              value={notifyEmail}
                              onChange={(e) => {
                                setNotifyEmail(e.target.value);
                                if (notifyError) setNotifyError("");
                              }}
                              className="flex-1 rounded-lg border border-amber-300 bg-white px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                            />
                            <button
                              type="submit"
                              className="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-200"
                            >
                              Notify Me
                            </button>
                          </div>
                          {notifyError && (
                            <p className="flex items-center gap-2 text-sm font-medium text-red-600">
                              <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {notifyError}
                            </p>
                          )}
                        </form>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="rounded-xl bg-gray-50 border border-gray-200 p-6 text-center">
                          <div className="mb-4">
                            <div className="mx-auto h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                              <Svg
                                svgId="close"
                                className="h-8 w-8 text-gray-400"
                              />
                            </div>
                          </div>
                          <h3 className="mb-2 text-lg font-semibold text-chocolate/90">
                            Currently Unavailable
                          </h3>
                          <p className="mb-4 text-chocolate/70">
                            This coffee is temporarily out of stock, but we'll
                            have it back soon!
                          </p>
                          <Button
                            onClick={() => {
                              setNotifyDone(false);
                              setNotifyError("");
                              setShowNotify(true);
                            }}
                            btnTask="Get Notified"
                            className="bg-amber-600 hover:bg-amber-700 text-white border-0 px-8 py-3 rounded-lg font-semibold transition-colors"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-600">
                          Quantity
                        </span>
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                          ✓ In Stock
                        </span>
                      </div>

                      {quantityInCart > 0 ? (
                        <div className="space-y-4">
                          <Quantity
                            quantity={quantityInCart}
                            onIncrease={() => increaseQty(id)}
                            onDecrease={() => decreaseQty(id)}
                            onRemove={() => decreaseQty(id)}
                            className="mx-auto"
                          />
                          <p className="text-center text-sm text-gray-600">
                            {quantityInCart} item{quantityInCart > 1 ? "s" : ""}{" "}
                            in your cart
                          </p>
                        </div>
                      ) : (
                        <Button
                          onClick={() => addToCart(id, product)}
                          btnTask="Add to Cart"
                          className="w-full bg-chocolate hover:bg-chocolate/90 text-white border-0 py-4 text-lg font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
                        />
                      )}
                    </div>

                    {/* Favorites Button */}
                    <button
                      className="group flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-white p-4 text-gray-700 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      onClick={() => toggleLike(product.id)}
                    >
                      <Svg
                        svgId={isLiked(product.id) ? "heart-filled" : "heart"}
                        className={`h-5 w-5 transition-all duration-200 ${
                          isLiked(product.id)
                            ? "text-red-500 heart-pop"
                            : "text-gray-400 group-hover:text-red-500"
                        }`}
                      />
                      <span className="font-medium">
                        {isLiked(product.id)
                          ? "Saved to Favorites"
                          : "Save to Favorites"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Product Information */}
          <div className="mt-16 space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-chocolate/90">
                Why You'll Love This Coffee
              </h2>
              <p className="mt-2 text-lg text-chocolate/70">
                Crafted with care, delivered with passion
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
                  <Svg svgId="star" className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-chocolate/90">
                  Premium Quality
                </h3>
                <p className="text-chocolate/70">
                  Sourced from the finest coffee farms with sustainable
                  practices
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Svg svgId="fire" className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-chocolate/90">
                  Freshly Roasted
                </h3>
                <p className="text-chocolate/70">
                  Roasted to perfection and shipped within days of roasting
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Svg svgId="check" className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-chocolate/90">
                  Fast Delivery
                </h3>
                <p className="text-chocolate/70">
                  Free shipping on orders over £25 with next-day delivery
                  available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}

export async function getStaticPaths() {
  const products = getProducts();

  const paths = products
    .map((p) => {
      const slug = getProductSlug(p);
      const id = p.id != null ? String(p.id) : "";
      // Prefer slug, but fallback to id if slug is missing
      const param =
        typeof slug === "string" && slug.trim()
          ? slug.trim()
          : typeof id === "string" && id.trim()
            ? id.trim()
            : null;
      if (!param) return null; // skip if both are missing/empty
      return { params: { id: param } };
    })
    .filter(Boolean);

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const raw = params?.id;
  const id = Array.isArray(raw) ? raw[0] : raw;

  if (!id || typeof id !== "string" || id.trim() === "") {
    return { notFound: true };
  }

  const products = getProducts();
  const product = findProductBySlugOrId(products, id);

  if (!product) return { notFound: true };

  return {
    props: { product },
    revalidate: 60,
  };
}
