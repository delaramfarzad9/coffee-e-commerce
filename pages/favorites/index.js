import { useCart } from "@/context/CartContext";
import Catalog from "@/components/features/catalog/Catalog";
import getProducts from "@/data/products";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function FavoritesPage() {
  const { liked, toggleLike, cart, addToCart, increaseQty, decreaseQty } =
    useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const router = useRouter();

  const products = getProducts();
  const favoriteProducts = products.filter((product) =>
    liked.includes(product.id),
  );

  return (
    <div className="mt-10 lg:mt-20">
      {favoriteProducts.length === 0 ? (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-5 text-lg text-gray-600"
        >
          You haven’t added any favorites yet. Explore our{" "}
          <Link
            href="/products"
            className="text-chocolate font-semibold underline dark:text-orange-200 dark:hover:text-orange-300"
          >
            products
          </Link>{" "}
          and tap the heart icon to save your favourites.
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <Catalog
            className=""
            btnTask={() => router.push("/shop")}
            svgId="chevron-right"
            btnTaskLabel="Back to Shop"
            mobileBtnLabel="Shop"
            title="My Favorites"
            products={favoriteProducts}
            cart={cart}
            addToCart={(id) => {
              const product = products.find((p) => p.id === id);
              addToCart(product);
            }}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            getCartProps={(product) => ({
              confirmUnlike: true,
              onRemove: () => {
                setSelectedId(product.id);
                setIsModalOpen(true);
              },
            })}
          />
        </motion.div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => toggleLike(selectedId)}
        text="Are you sure you want to remove this item from your favorites?"
        btnTask="Yes, remove"
      />
    </div>
  );
}
