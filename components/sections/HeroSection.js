import React from 'react'
import Button from '../ui/Button'
import { useRouter } from "next/navigation";


export default function HeroSection() {
  const router = useRouter();
  return (
    <section className='hero w-full'>
        <div className='flex items-center w-full justify-start      aspect-4/3  md:h-dvh  bg-no-repeat bg-contain  md:bg-cover md:bg-bottom  bg-chatgpt '>
<div className='flex flex-col gap-5 '>
  <h1 className=' text-[#F6F5F5] text-left text-xl sm:text-2xl md:text-5xl xl:text-6xl font-black   md:leading-snug xl:max-w-3xl max-w-1/2  md:ml-20 ml-5 md:mb-0  drop-shadow-xl ' >Fresh Beans From <span className='text-orange-600'>Colombia’s</span> Finest Estates</h1>
<Button onClick={() => router.push("/shop")} btnTask="Shop Now" className='self-start md:ml-20 ml-5  text-xl md:text-2xl px-14! py-3!  tracking-widest' >

</Button>
</div>
        </div>
        </section>
  )
}
