import React from 'react'
import Svg from '@/components/ui/Svg'
import FilterPanelRow from './FilterPanelRow'
import { useState,useEffect } from 'react'



const FilterPanel = ({ closePanel, onSortChange, onFiltersChange }) => {
    const [open,setOpen]=useState(false)
 const [localFilters, setLocalFilters] = useState({
  origin: [],
  roast: [],
  process: [],
  priceFrom: null,
  priceTo: null,
});


  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        closePanel();
      }
    }

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closePanel]);
  return (
    <div className='className="fixed inset-0 z-40"'>
       
        {/* filter panel */}
        <div className=' fixed overflow-y-scroll flex flex-col top-0 right-0 w-1/3 h-full bg-gray-100 z-50 shadow-2xl p-5 text-chocolate/80'>
        {/* title and close btn */}
        <div className="flex flex-row justify-between items-center">
            <span className='font-bold text-2xl text-chocolate/80 '>Filter & Sort</span>
<Svg svgId="close" onClick={closePanel} className="text-chocolate/80 cursor-pointer w-6 h-6" />
        </div>
        {/* products count  */}
<p className='mt-4 border-b pb-6 border-b-chocolate/30 text-chocolate/80 text-lg font-medium'>14 products</p>
        {/* content  */}
        <div className='flex flex-col gap-4  pb-2'>
        {/* first filter row */}
<div  className='  border-b border-b-chocolate/30 pb-4 '>
 <div className='mt-4 mx-2 flex flex-col gap-4 '>
       <p className='font-bold text-xl'>Sort By</p>
<div onClick={()=>setOpen(!open)} className='flex flex-row justify-between border border-chocolate/30 p-3 cursor-pointer rounded-sm'>
<span>Featured</span>
<Svg svgId="chevron-down" className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />

</div>

 </div>
 {/* options */}

<div className={`flex flex-col gap-2 mx-2  *:w-full
    *:px-2
    *:py-1 *:cursor-pointer  border-l border-b border-r border-chocolate/30 ${open ? 'max-h-96 opacity-100  *:hover:bg-chocolate/30  ' : 'max-h-0 opacity-0'} transition-all duration-300 overflow-hidden`}>
<span onClick={() => { onSortChange(null); closePanel(); }}>Featured</span>
<span onClick={() => { onSortChange("best-selling"); closePanel(); }}>Best Selling</span>
<span onClick={() => { onSortChange("name-asc"); closePanel(); }}>Alphabetically A-Z</span>
<span onClick={() => { onSortChange("name-desc"); closePanel(); }}>Alphabetically Z-A</span>
<span onClick={() => { onSortChange("price-asc"); closePanel(); }}>Price: Low to High</span>
<span onClick={() => { onSortChange("price-desc"); closePanel(); }}>Price: High to Low</span>

</div>

</div>
{/* second filter row */}
<FilterPanelRow title="Availability">
    <div className="flex flex-col gap-2">
        <label><input type="checkbox" /> In Stock</label>
    <label><input type="checkbox" /> Out of Stock</label>
    </div>
    
</FilterPanelRow>
{/* third filter row */}
<FilterPanelRow title="Price">
<div>
    <span>From £
 </span>
    <input type="number" placeholder='0' className='w-24 px-3 py-2 m-2 rounded-md border border-chocolate/30 
               focus:border-chocolate focus:ring-1 focus:ring-chocolate/40
               text-chocolate bg-gray-50 outline-none transition' />
    <span>To £
</span>
    <input type="number" placeholder='20' className='  w-24 px-3 py-2 m-2 rounded-md border border-chocolate/30 
               focus:border-chocolate focus:ring-1 focus:ring-chocolate/40
               text-chocolate bg-gray-50 outline-none transition' />
</div>
</FilterPanelRow>
{/* fourth filter row */}
<FilterPanelRow title="Origin">
  <div className="flex flex-col gap-2">
    <label><input type="checkbox" /> Colombia</label>
    <label><input type="checkbox" /> Ethiopia</label>
    <label><input type="checkbox" /> Brazil</label>
    <label><input type="checkbox" /> Kenya</label>
    <label><input type="checkbox" /> Indonesia</label>
    <label><input type="checkbox" /> Guatemala</label>
  </div>
</FilterPanelRow>
{/* fifth filter row */}
<FilterPanelRow title="Roast Level">
  <div className="flex flex-col gap-2">
    <label><input type="checkbox" /> Light</label>
    <label><input type="checkbox" /> Medium</label>
    <label><input type="checkbox" /> Dark</label>
    <label><input type="checkbox" /> Medium‑Dark</label>
  </div>
</FilterPanelRow>
{/* sixth filter row */}
<FilterPanelRow title="process">
      <div className="flex flex-col gap-2">
    <label><input type="checkbox" /> Washed</label>
    <label><input type="checkbox" /> Natural</label>
    <label><input type="checkbox" /> Wet‑hulled</label>
    <label><input type="checkbox" /> Blend</label>
    <label><input type="checkbox" /> Swiss Water</label>
  </div>
</FilterPanelRow>

     <button
            type="submit"
            onClick={() => {
    onFiltersChange(localFilters);
    closePanel();
  }}
            className="w-full cursor-pointer mt-2 py-2 lg:py-4 bg-chocolate text-white  rounded-full font-semibold hover:bg-amber-800 transition"
          >
            Apply Filters
          </button>
<span className='underline text-center cursor-pointer  '>Remove All Filters</span>
        </div>
    </div>
    </div>
  )
}

export default FilterPanel