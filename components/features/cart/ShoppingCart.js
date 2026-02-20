import Svg from "../../ui/Svg";
import Quantity from "./Quantity";
import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

export default function ShoppingCart({
  cart,
  isOpen,
  onClose,
  clearCart,
  onRemove,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isOpen) return null; // hide when closed
  return (
    <div className=" fixed  bg-gray-800 left-0 top-0 lg:w-1/3 md:w-1/2 w-10/12 h-screen flex flex-col  z-40">
      <div className="overflow-y-scroll  cart-scroll">
        {/* close button */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 absolute top-5 -right-12 cursor-pointer hover:opacity-90">
          <Svg svgId="close" onClick={onClose} className="text-gray-100" />
        </div>
        {/* header  */}
        <div
          className={`flex flex-row justify-center items-center gap-2  border-b  pb-5 my-5 ${cart.length ? "border-b-gray-100" : "border-b-gray-100/50"}`}
        >
          <h3
            className={`md:text-xl text-lg ${cart.length ? "font-bold text-gray-100 " : "italic   text-gray-100/50 "}`}
          >
            Shopping Cart
          </h3>
          <div className="relative">
            <Svg
              svgId="cart"
              className={` md:w-7 md:h-7 ${cart.length ? "text-gray-100" : "text-gray-100/50 italic"}`}
            />
            <div className="absolute w-6 h-6 rounded-full bg-amber-900 flex items-center justify-center -top-2 -right-8">
              <span className="font-bold text-gray-100">{cart.length}</span>
            </div>
          </div>
        </div>
        {/* product  */}
        {cart.length ? (
          cart.map((product) => (
            <div
              key={product.id}
              className="flex flex-row justify-center items-center gap-8 border-b border-b-gray-100 pb-5 my-5 px-5"
            >
              {/* left  */}
              <div className="flex flex-col text-gray-100 gap-5">
                <h2 className="font-bold text-lg">{product.title}</h2>
                <div className="flex flex-row justify-center items-center gap-4">
                  <span>{product.price}$</span>
                  <span>X</span>
                  <Quantity
                    onRemove={() => onRemove(product.id)}
                    className="text-gray-100 border-gray-100 scale-90"
                  />
                </div>
              </div>
              {/* right  */}
              <div className="w-28 h-28 rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={product.image}
                  alt={product.title}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-row gap-2 mt-40 text-gray-100/50 justify-center items-center text-xl">
            <p className=" text-center italic">Your Shopping Cart is Empty</p>
            <Svg className="italic" svgId="bag" />
          </div>
        )}
        {/* product ends here  */}
        {cart.length && (
          <>
            {/* bottom part of the shoppig cart */}
            <div className="flex flex-col mt-auto gap-2">
              {/* total price  */}
              <div className="flex flex-row justify-between items-center border-y border-b-gray-100 py-5 my-5 px-5 text-gray-100 font-bold text-lg">
                <span>Total :</span>
                <span>
                  {cart
                    .reduce((prev, curr) => prev + curr.price, 0)
                    .toLocaleString()}{" "}
                  $
                </span>
              </div>
              {/* end button */}
              <Button
                btnTask="Check Out"
                className=" w-full sm:w-3/4 lg:w-2/3 flex justify-center mb-5"
              />
            </div>
            {/* clear shopping cart  */}
            <Button
              onClick={() => setIsModalOpen(true)}
              className=" w-full sm:w-3/4 lg:w-2/3 flex justify-center mb-5 bg-rose-600 hover:bg-rose-700"
              btnTask="Clear Shopping Cart"
            />
          </>
        )}
      </div>
      {/* delete cofirmation modal  */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={clearCart}
      />
    </div>
  );
}
