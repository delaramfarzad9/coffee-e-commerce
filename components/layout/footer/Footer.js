import React from 'react'
import Logo from '../../ui/Logo'
import CopyRight from './CopyRight'
import Svg from '../../ui/Svg'
import PostItem from './PostItem'
import LinkItem from './LinkItem'

export default function Footer() {
  return (
   <footer className='w-full  pt-10  text-amber-900 bg-orange-100'>
    {/* main Footer wrapper  */}
     <div className='flex flex-col gap-7 justify-between items-start md:flex-row py-12 px-4 md:px-10'>
        {/* wrapper1/logo/address/contact */}
        <div className='flex flex-col max-w-md gap-y-3 text-balance text-left'>
            {/* logo */}
        <Logo className='mb-4'/>
        {/* description */}
         
        <h3 className='flex '>Cascade Cup Company – SetCoffee Online Store</h3>
      
        {/* ---location--- */}
        <address className='flex flex-row space-x-1  text-balance not-italic items-start '>  
            <Svg svgId="location" className="shrink-0"/>
            <p className="">42 Brew Lane, Shoreditch, London, E2 7RG, United Kingdom</p>
        </address>
        {/* Order Tracking */}
        <p className='flex flex-row gap-1 items-start' >
             <Svg svgId="mobile" className="shrink-0"/>
            <span>Order Tracking</span>
            <a href="tel:00442079460821" className="hover:text-amber-700">(+44 20 7946 0821)</a>
        </p> 
          {/* email */}
           <p className='flex flex-row gap-1 items-start' >
             <Svg svgId="email" className="shrink-0"/>
            <a href="mailto:support@setcoffee.co.uk" className="hover:text-amber-700">support@setcoffee.co.uk</a>
        </p>
        </div>
      {/*wrapper2/ Latest Posts */}
       <div className='flex flex-col gap-2 items-start text-balance text-left font-bold'>
        <p className='font-extrabold text-yellow-600'>Latest Posts</p>
         <PostItem title="How to Brew the Perfect Espresso" href="/blog/brew-perfect-espresso" />
         <PostItem title="Top 5 Coffee Beans for Winter" href="/blog/top-5-winter-beans"/>
         <PostItem title="The Science Behind Cold Brew" href="/blog/science-of-cold-brew"/>
       <PostItem title="Important Tips and Best Practices for Storing Coffee at Home" href="/blog/coffee-storage-tips"/>
         <PostItem title="Optimal Time for Drinking Brewed Coffee" href="/blog/optimal-coffee-time"/>
         

        
       </div>
       {/*wrapper3/ Quick Links */}
        <nav aria-label="Quick links" className='flex flex-col gap-2 items-start text-left'>
<h4 className="font-extrabold text-yellow-600 ">Quick Links</h4>
<ul  className="space-y-1 ">
    <li><LinkItem href="/terms">Terms & Conditions</LinkItem></li>
    <li><LinkItem href="/delivery">Shipping & Delivery</LinkItem></li>
    <li><LinkItem href="/support">Customer Support</LinkItem></li>
    <li><LinkItem href="/privacy">Privacy Policy</LinkItem></li>
    <li><LinkItem href="/dictionary">Coffee Dictionary</LinkItem></li>
</ul>


</nav>
{/* Certifications & Seals */}
      
        
        

    </div>
    <CopyRight/>
   </footer>
  )
}
