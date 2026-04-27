import { useCart } from "@/context/CartContext";
import getProducts from "@/data/products";
import Cart from "../../components/features/cart/Cart";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";


export default function FavoritesPage() {
  const { liked, toggleLike } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const products = getProducts();
  const favoriteProducts = products.filter(product =>
    liked.includes(product.id)
  );
  const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: i * 0.1,
      ease: "easeOut",
    },
  }),
};


  return (
    <div className="max-w-6xl mx-auto p-10">
      <motion.h1 
      initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      className="text-4xl font-bold text-chocolate mb-10 mt-20 border-b-2 pb-3">
        My Favorites
      </motion.h1>

      {favoriteProducts.length === 0 ? (
        <motion.p 
        initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        className="text-lg text-gray-600">
          You haven’t added any favorites yet. Explore our{" "}
          <Link href="/products" className="text-chocolate font-semibold underline">
            products
          </Link>{" "}
          and tap the heart icon to save your favourites.
        </motion.p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {favoriteProducts.map((product, i) => (
<motion.div
  key={product.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
>
             <Cart
  key={product.id}
  id={product.id}
  image={product.image}
  title={product.title}
  price={product.price}
  description={product.description}
  confirmUnlike={true}   //  Ask before removing
  onRemove={() => {
    setSelectedId(product.id);
    setIsModalOpen(true);
  }}
/>

</motion.div>
          ))}
        </div>
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
