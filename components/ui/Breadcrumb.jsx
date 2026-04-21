"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import getProducts from "@/data/products";
import { findProductBySlugOrId } from "@/utils/productSlug";

export default function Breadcrumb() {
  const pathname = usePathname(); // e.g. "/blog/espresso-basics"
  const segments = pathname.split("/").filter(Boolean);
  const products = getProducts();

  const crumbs = segments.map((segment, index) => {
    let href = "/" + segments.slice(0, index + 1).join("/");
    let label = segment.replace(/-/g, " ");

    if (segment === "products") {
      href = "/shop";
      label = "shop";
    }

    const isProductDetail = segments[index - 1] === "products";
    if (isProductDetail) {
      const matchedProduct = findProductBySlugOrId(products, segment);
      if (matchedProduct) {
        label = matchedProduct.title;
      }
    }

    return { href, label };
  });

  return (
    <nav className="text-sm text-gray-500 mb-6">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>

        {crumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-2">
            <span>/</span>

            {index === crumbs.length - 1 ? (
              <span className="text-gray-800 font-medium capitalize">
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="hover:underline capitalize">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
