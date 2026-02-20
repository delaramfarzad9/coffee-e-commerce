import Svg from "../../ui/Svg";
import { useState } from "react";
import Quantity from "./Quantity";

import Button from "../../ui/Button";

// onClick={() => navigate(`/product/${id}`)}
export default function Cart({
  id,
  image = defaultProductImg,
  title = "title",
  price = "100",
  description = "description",
  addToCart,
}) {
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };
  const [showQuantity, setShowQuantity] = useState(false);
  const handleShowQuantity = () => {
    setShowQuantity(!showQuantity);
  };
  const handleQuantityRemoved = () => {
    setShowQuantity(false); // This will hide Quantity and show button
  };

  return (
    <div className="relative flex flex-col w-full shadow-lg rounded-2xl h-[460px] ">
      <div className="absolute top-0 right-0 p-4">
        {/* heart Icon */}
        <Svg
          onClick={handleLike}
          svgId={like ? "heart-filled" : "heart"}
          className="w-7 h-7 text-amber-900  cursor-pointer   duration-300
                font-semibold  hover:scale-110 hover:text-[#D4AF37]/80 
                          transition-all  ease-in-out
                "
        />
      </div>
      <img className="w-full h-60 object-cover rounded-t-2xl" src={image} />
      <div className="flex flex-col flex-1 gap-2 px-2 py-2 ">
        <h2 className="font-bold">{title}</h2>
        <span className="font-semibold">{price.toLocaleString()}$</span>
        <p className="line-clamp-2">{description}</p>
        {showQuantity ? (
          <Quantity
            onRemove={handleQuantityRemoved}
            className="mx-auto mt-auto"
          />
        ) : (
          <Button
            onClick={() => {
              handleShowQuantity();
              addToCart(id);
            }}
            btnTask="Add to Cart"
          />
        )}
      </div>
    </div>
  );
}
