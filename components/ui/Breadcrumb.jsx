"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import blogPosts from "@/data/blogPosts";
import getProducts from "@/data/products";
import { findProductBySlugOrId } from "@/utils/productSlug";

export default function Breadcrumb() {
  const router = useRouter();
  const pathname = router.asPath.split("?")[0];
  const segments = pathname.split("/").filter(Boolean);
  const products = getProducts();
  const isProductDetail = segments[0] === "products" && segments.length === 2;
  const isBlogDetail = segments[0] === "blog" && segments.length === 2;
  const isDetailPage = isProductDetail || isBlogDetail;
  const rawFrom = Array.isArray(router.query.from)
    ? router.query.from[0]
    : router.query.from;
  const fromHref =
    typeof rawFrom === "string" && rawFrom.startsWith("/")
      ? rawFrom.split("#")[0]
      : null;
  const fromPath = fromHref ? fromHref.split("?")[0] : null;
  const fromSegments = fromPath ? fromPath.split("/").filter(Boolean) : [];
  const fallbackBackHref = isProductDetail
    ? "/shop"
    : isBlogDetail
      ? "/blog"
      : null;
  const backHref =
    isDetailPage && fromHref && fromPath !== pathname
      ? fromHref
      : fallbackBackHref;
  const backTargetSegment =
    fromSegments.length > 0
      ? fromSegments[fromSegments.length - 1]
      : segments[0];

  const formatCrumbLabel = (segment) => {
    if (segment === "products") return "shop";
    return segment.replace(/-/g, " ");
  };

  const backLabel = backHref
    ? `Back to ${formatCrumbLabel(backTargetSegment)}`
    : null;

  const crumbSegments =
    isDetailPage && fromHref
      ? (() => {
          if (
            fromSegments.length === 0 ||
            (isProductDetail && fromSegments[0] === "products") ||
            (isBlogDetail && fromSegments[0] === "blog")
          ) {
            return segments.map((segment, index) => ({
              segment,
              href: "/" + segments.slice(0, index + 1).join("/"),
            }));
          }

          return [
            ...fromSegments.map((segment, index) => ({
              segment,
              href:
                index === fromSegments.length - 1
                  ? fromPath
                  : "/" + fromSegments.slice(0, index + 1).join("/"),
            })),
            {
              segment: segments[segments.length - 1],
              href: pathname,
            },
          ];
        })()
      : segments.map((segment, index) => ({
          segment,
          href: "/" + segments.slice(0, index + 1).join("/"),
        }));

  const crumbs = crumbSegments.map(({ segment, href }, index) => {
    let label = formatCrumbLabel(segment);

    const isCurrentProduct =
      isProductDetail && index === crumbSegments.length - 1;
    if (isCurrentProduct) {
      const matchedProduct = findProductBySlugOrId(products, segment);
      if (matchedProduct) {
        label = matchedProduct.title;
      }
    }

    const isCurrentBlogPost =
      isBlogDetail && index === crumbSegments.length - 1;
    if (isCurrentBlogPost) {
      const matchedPost = blogPosts.find((post) => post.id === segment);
      if (matchedPost) {
        label = matchedPost.title;
      }
    }

    if (segment === "products") {
      href = "/shop";
    }

    return { href, label };
  });

  return (
    <div className="mb-6 space-y-3 text-sm text-gray-500 dark:text-orange-200/70">
      {backHref && backLabel ? (
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:border-chocolate/30 hover:text-chocolate dark:border-orange-200/15 dark:bg-white/5 dark:text-orange-200/85 dark:hover:border-orange-200/30 dark:hover:text-orange-100"
        >
          <span aria-hidden="true">&lt;</span>
          <span className="capitalize">{backLabel}</span>
        </Link>
      ) : null}

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href="/"
              className="hover:underline dark:hover:text-orange-300 transition-colors duration-200"
            >
              Home
            </Link>
          </li>

          {crumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-2">
              <span>/</span>

              {index === crumbs.length - 1 ? (
                <span className="text-gray-800 dark:text-orange-200 font-medium capitalize">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:underline capitalize dark:hover:text-orange-300 transition-colors duration-200"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
