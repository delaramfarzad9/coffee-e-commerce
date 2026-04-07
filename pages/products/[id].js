import { useRouter } from "next/router";
import getProducts from "../../data/products";
import Quantity from "@/components/features/cart/Quantity";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import Svg from "@/components/ui/Svg";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { cart, addToCart, increaseQty, decreaseQty } = useCart();
const { isLiked, toggleLike } = useCart();

  const products = getProducts();
  const product = products.find(p => p.id === id);

  if (!product) return <p>Loading...</p>;

  const itemInCart = cart.find(item => item.id === id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;

  return (
    <div className="flex lg:flex-row gap-5 flex-col items-center justify-start py-10 pl-10 mt-14 ">

      {/* left side picture */}
      <img className="w-96 m-10" src={product.image} alt={product.title} />
{/* right side /title/description/price/add to cart button/favorite button */}
      <div className="flex flex-col gap-4 justify-between items-start mt-10">
        {/* title */}
        <h1 className="text-3xl font-bold mb-5 border-b-2 border-chocolate text-chocolate pb-2">
          {product.title}
        </h1>
{/* description */}
        <p className="text-xl font-semibold">{product.description}</p>
         

     
         {/* more information  */}
<div className="grid grid-cols-2 grid-rows-6 gap-y-2 mt-5 ">
<p className="text-lg font-bold text-chocolate">Origin</p>
<p className="font-semibold ">{product.moreInfo.origin}</p>
<p className="text-lg font-bold text-chocolate">Roast</p>
<p className="font-semibold ">{product.moreInfo.roast}</p>
<p className="text-lg font-bold text-chocolate">Tasting Notes</p>
<p className="font-semibold ">{product.moreInfo.tastingNotes}</p> 
<p className="text-lg font-bold text-chocolate">Weight</p>
<p className="font-semibold ">250 g</p>
<p className="text-lg font-black text-chocolate">Price</p>
<p className="font-bold ">£ {product.price.toFixed(2)}</p>

        </div>
{/* more information finishes */}



     
{/* add to card & favorite button container */}
        <div className="w-full flex flex-row justify-start items-center gap-x-60">
          {quantityInCart > 0 ? (
          <Quantity
            quantity={quantityInCart}
            onIncrease={() => increaseQty(id)}
            onDecrease={() => decreaseQty(id)}
            onRemove={() => decreaseQty(id)}
            className="mt-5"
          />
        ) : (
          <Button
            onClick={() => addToCart(id, product)}
            btnTask="Add to Cart"
            className=""
          />
        )}
        {/* favorite button */}
   <div
  className="flex items-center gap-3  cursor-pointer select-none px-6 py-2   my-3"
  onClick={() => toggleLike(product.id)}
>
  <Svg
    svgId={isLiked(product.id) ? "heart-filled" : "heart"}
      className={`w-6 h-6 cursor-pointer transition-all duration-200 ${
    isLiked(product.id) ? "text-red-600 heart-pop" : "text-chocolate"
  }`}
  />

  <span className="text-lg font-semibold">
    {isLiked(product.id) ? "Remove from favorites" : "Add to favorites"}
  </span>
</div>
{/* favorite button finishes */}
        </div>
      </div>
      {/* right side /title/description/price/add to cart button/favorite button */}
   
    </div>
  );
}
