import React from 'react'
import Svg from '../../../ui/Svg'
import { useState } from 'react'

export default function SearchBar({className,title,onClose}) {

 

  return (
    <div className={`z-100 flex flex-col justify-end  w-screen md:w-[400px] h-[120px] bg-chocolate/40 backdrop-blur-md border border-white/30 shadow-lg rounded-lg p-2 ${className}`}>
        {/* close icon  */}
       <div className='flex justify-end'>
         <Svg onClick={onClose} svgId="close" className="w-6 h-6 text-chocolate cursor-pointer hover:text-red-400 transition"/>
       </div>
{/* title & input  */}
<div className='flex flex-col justify-center  '>
        <span className='text-left text-gray-100 font-light tracking-widest'>{title}</span>
<div className='relative flex '>
    <input type="text" className='h-14  w-full rounded  backdrop-blur-sm text-chocolate tracking-wider placeholder-chocolate px-3 outline-none' />
    <button className='absolute top-1/4 right-4'>
        <Svg svgId="search" className="w-8 h-8 text-gray-100"/>
    </button>
</div>

</div>
    </div>
  )
}
