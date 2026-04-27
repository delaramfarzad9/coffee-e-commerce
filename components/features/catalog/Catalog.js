import Cart from "../cart/Cart";
import Button from "../../ui/Button";
import Svg from "../../ui/Svg";
import { motion } from "framer-motion";

export default function Catalog({
  products,
  cart,
  addToCart,
  increaseQty,
  decreaseQty,
  title,
  btnTask,
  svgId,
  btnTaskLabel,
  mobileBtnLabel,
  className = "",
})
 {
  const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 }
  })
};
  return (
    <div className={`flex flex-col gap-14  ${className}`}>
      {/* title  */}
      <div className="flex items-center justify-between gap-3 px-2 sm:px-4 md:px-5">
        <div className="min-w-0">
          <h2 className="inline-block max-w-full font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-chocolate border-b-2 border-chocolate/30 pb-1 sm:pb-2 leading-tight">
            {title}
          </h2>
        </div>
        <Button
          className="shrink-0 mx-0 ml-auto mr-0 gap-2 tracking-wide px-3 sm:px-6 py-2 text-xs sm:text-sm whitespace-nowrap"
          onClick={btnTask}
        >
          <div className="sm:hidden">{mobileBtnLabel || btnTaskLabel}</div>
          <div className="hidden sm:flex items-center gap-2">
            {btnTaskLabel}
          </div>
          {svgId && <Svg svgId={svgId} />}
        </Button>
      </div>
      {/* catalog  */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 mx-2 sm:mx-4 md:mx-5 my-6 sm:my-10">
        {products.map((p,i) => {
          const cartItem = cart.find((item) => item.id === p.id);
          const quantity = cartItem?.quantity || 0;

          return (
          <motion.div
            key={p.id}
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount:0 }} 
      variants={cardVariants}>
              <Cart
              key={p.id}
              {...p}
              quantity={quantity}
              addToCart={addToCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
            />
          </motion.div>
          );
        })}
      </div>
      
    </div>
  );
}
