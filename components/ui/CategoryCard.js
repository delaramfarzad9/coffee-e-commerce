import React from 'react'


const CategoryCard = ({text,image,onClick}) => {
  return (
    <div onClick={onClick} className='flex flex-col justify-center items-center gap-2 bg-white/30 backdrop-blur-sm rounded-md p-3 cursor-pointer hover:bg-white/50 transition-all border  border-chocolate/30 hover:scale-105 duration-200 ease-in-out hover:shadow-lg'>
<img src={image} alt={text} className='w-36 h-48 object-contain' />
<p className='text-slg font-medium text-chocolate tracking-wide'>{text}</p>
    </div>
  )
}

export default CategoryCard