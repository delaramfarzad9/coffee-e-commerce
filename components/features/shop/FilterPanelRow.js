import React from 'react'
import Svg from '@/components/ui/Svg'
import { useState } from 'react'
const FilterPanelRow = ({title,children}) => {
    const [open,setOpen]=useState(false)
  return (
    <>
    <div onClick={()=>setOpen(!open)} className='  border-b  border-b-chocolate/30  '>
    <div className='flex flex-row mx-2 my-2 pb-2 justify-between items-center cursor-pointer    '>
        <div className='font-bold text-xl'>{title}</div>
       
        <Svg svgId="chevron-down" className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
    </div>
       {/* options */}
    <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-2 pt-2">{children}</div>
      </div>
    </div>

    </>
  )
}

export default FilterPanelRow