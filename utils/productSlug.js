export function getProductSlug(product) {
  const source = typeof product === "string" ? product : product?.title || "";

  return source
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findProductBySlugOrId(products, value) {
  return products.find(
    (product) => product.id === value || getProductSlug(product) === value,
  );
}
