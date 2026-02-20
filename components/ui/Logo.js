import Image from "next/image"
export default function Logo({className='',imgClassName=''}) {
  return (

    <div className={`flex flex-row gap-1 justify-center items-center ${className}`}>
        <div className="text-xl font-pacifico font-bold lg:text-2xl shrink-0 text-amber-900  ">SetCoffee</div>
        <Image   src="/Images/appLogo.png"
        alt="logo"
        width={40}
        height={40}
         className={`lg:h-10 w-auto h-8 ${imgClassName}`}/>
        </div>

  )
}
