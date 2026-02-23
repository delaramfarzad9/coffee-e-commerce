
import Cart from '../cart/Cart'
import Button from '../../ui/Button'
import Svg from '../../ui/Svg'

export default function Catalog({ products, cart, addToCart, increaseQty, decreaseQty }) {
  
  
  return (
   <div className='flex flex-col gap-14 md:mt-10'>
    {/* title  */}
 <div className='flex flex-row-reverse justify-between items-center'>

  <Button className='mr-2 md:mr-5 scale-90 md:scale-95 lg:scale-100 pr-2' btnTask='All Products'>
    <Svg  svgId='chevron-right'/>
  </Button>
  <h2 className='ml-5 font-bold  md:text-2xl lg:text-3xl text-chocolate border-b-2  border-chocolate/30 pb-2'>Shop Coffee</h2>

 </div>
 {/* catalog  */}
     <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mx-4'>
 {products.map((p) => {
          const cartItem = cart.find((item) => item.id === p.id);
          const quantity = cartItem?.quantity || 0;

          return (
            <Cart key={p.id} {...p} quantity={quantity} addToCart={addToCart} increaseQty={increaseQty} decreaseQty={decreaseQty} />
          );
        })}
    </div>
   </div>
  )
}
