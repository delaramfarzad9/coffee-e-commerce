import Svg from "../../ui/Svg";
import { useState } from "react";
import Quantity from "./Quantity";
import Link from "next/link";
import Button from "../../ui/Button";
import { useCart } from "@/context/CartContext";

// onClick={() => navigate(`/product/${id}`)}
export default function Cart({
  id,
  image = defaultProductImg,
  title,
  price,
  description,
   confirmUnlike = false,   
  onRemove = () => {},
 
 
}) {
  const { isLiked, toggleLike } = useCart();

  const { cart, addToCart, increaseQty, decreaseQty } = useCart();
   const itemInCart = cart.find(item => item.id === id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

 
  return (
   <Link onClick={() => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
  }}
    href={`/products/${id}`}  className="no-underline">
    <div className="relative flex flex-col w-full shadow-lg rounded-2xl h-[460px] ">
      <div className="absolute top-0 right-0 p-4">
        {/* heart Icon */}
     <Svg
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirmUnlike && isLiked(id)) {
      //  On favorites page → open modal instead of removing instantly
      onRemove();
    } else {
      //  Normal behavior → toggle instantly
      toggleLike(id);
    }
  }}
  svgId={isLiked(id) ? "heart-filled" : "heart"}
  className="w-7 h-7 text-amber-900 cursor-pointer duration-300 hover:scale-110 hover:text-[#D4AF37]/80 transition-all ease-in-out"
/>

      </div>
      <img className="w-full h-60 object-cover rounded-t-2xl" src={image} />
      <div className="flex flex-col flex-1 gap-2 px-2 py-2 ">
        <h2 className="font-bold">{title}</h2>
        <span className="font-semibold">£ {price.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</span>
        <p className="line-clamp-2">{description}</p>
        
       {quantity > 0 ? (
 <Quantity
  quantity={quantity}
  onIncrease={(e) => {
    e.preventDefault();
    e.stopPropagation();
    increaseQty(id);
  }}
  onDecrease={(e) => {
    e.preventDefault();
    e.stopPropagation();
    decreaseQty(id);
  }}
  onRemove={(e) => {
    e.preventDefault();
    e.stopPropagation();
    decreaseQty(id);
  }}
  className="mt-auto"
/>

) : (
  // add to card button
  <Button
  onClick={(e) => {
    e.preventDefault();     // stop the link navigation
    e.stopPropagation();    // stop bubbling
    addToCart(id, { id, image, title, price, description });
  }}
  btnTask="Add to Cart"
  className="mt-auto"
/>

)}


      </div>
    </div>
   </Link>
  );
}
