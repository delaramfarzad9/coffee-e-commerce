"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function BlogSlider({ posts }) {
  const autoplay = Autoplay({ delay: 4500, stopOnInteraction: true });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true, skipSnaps: false },
    [autoplay],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    autoplay.reset?.();
  }, [emblaApi, autoplay]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    autoplay.reset?.();
  }, [emblaApi, autoplay]);

  const scrollTo = useCallback(
    (index) => {
      emblaApi?.scrollTo(index);
      autoplay.reset?.();
    },
    [emblaApi, autoplay],
  );

  // Sync selected dot
  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <div className="relative mb-20">
      {/* Edge fades removed to avoid white cloudy edges on mobile */}

      {/* ── Viewport ── */}
      <div className="overflow-hidden px-5" ref={emblaRef}>
        <div className="flex gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="min-w-[85%] sm:min-w-[46%] lg:min-w-[31%] pr-3 no-underline group"
            >
              <div
                className="
                  relative flex flex-col h-full rounded-2xl overflow-hidden
                  bg-white border border-gray-100
                  shadow
                  transition-all duration-500 ease-out
                  group-hover:-translate-y-2 group-hover:shadow-md
                "
              >
                {/* Image with zoom on hover */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Dark gradient overlay that slides up on hover */}
                  <div
                    className="
                      absolute inset-0
                      bg-linear-to-t from-black/60 via-black/10 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                      flex items-end p-4
                    "
                  ></div>

                  {/* Date pill */}
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-chocolate text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col grow gap-2">
                  <h2 className="text-base font-bold text-chocolate leading-snug group-hover:text-amber-800 transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Animated bottom bar */}
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <span className="text-xs font-semibold text-amber-800 tracking-wider uppercase flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      Read article
                      <svg
                        className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        onClick={scrollPrev}
        aria-label="Previous post"
        className="
          absolute left-1 top-1/2 -translate-y-1/2 z-20
          w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100
          flex items-center justify-center
          text-chocolate hover:bg-chocolate hover:text-white
          transition-all duration-300 hover:scale-110
        "
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={scrollNext}
        aria-label="Next post"
        className="
          absolute right-1 top-1/2 -translate-y-1/2 z-20
          w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100
          flex items-center justify-center
          text-chocolate hover:bg-chocolate hover:text-white
          transition-all duration-300 hover:scale-110
        "
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ── Dot pagination ── */}
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`
                rounded-full transition-all duration-300 ease-out
                ${
                  i === selectedIndex
                    ? "w-6 h-2.5 bg-chocolate"
                    : "w-2.5 h-2.5 bg-chocolate/30 hover:bg-chocolate/60"
                }
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
}
