import { useCart } from "@/context/CartContext";
import getProducts from "@/data/products";
import Cart from "../../components/features/cart/Cart";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import Link from "next/link";

export default function FavoritesPage() {
  const { liked, toggleLike } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const products = getProducts();
  const favoriteProducts = products.filter(product =>
    liked.includes(product.id)
  );

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-4xl font-bold text-chocolate mb-10 mt-20 border-b-2 pb-3">
        My Favorites
      </h1>

      {favoriteProducts.length === 0 ? (
        <p className="text-lg text-gray-600">
          You haven’t added any favorites yet. Explore our{" "}
          <Link href="/products" className="text-chocolate font-semibold underline">
            products
          </Link>{" "}
          and tap the heart icon to save your favourites.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {favoriteProducts.map(product => (
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
