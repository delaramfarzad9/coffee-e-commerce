import getProducts from "@/data/products";

/**
 * Returns a Set of the top-N best-seller product IDs,
 * ranked by the `sales` field (highest first).
 *
 * @param {number} top  How many IDs to include (default: 5)
 * @returns {Set<string>}
 */
export function getBestSellerIds(top = 5) {
  const sorted = [...getProducts()].sort((a, b) => b.sales - a.sales);
  const topN = sorted.slice(0, top);
  return new Set(topN.map((p) => p.id));
}
