import { Bars3Icon} from '@heroicons/react/24/solid'
import { useState } from 'react'
import candle from "/Assets/logo/candle.png"



export default function Header(){
   const [toggleMenu,settoggleMenu]= useState(false);
    return <>
    
    <div className=" absolute top-0 left-0 w-full z-50 px-3 py-3  cursor-default  ">    
    <header className="flex justify-between px-10 py-3.5  rounded-2xl border-2  border-[#fcf5f5] shadow-2xl bg-[#f1cc94]">
        
        <img src={candle} alt="logo" className='border-r-4 border-[#fcfaf7] h-14 w-18  pr-4  ' />
        <p className=" text-[#4E3D28] text-4xl mt-2 font-extrabold "> Candlex </p>
        <div className=''>
        <nav className="hidden  md:block ">
        <ul className=" flex gap-9  mt-2 text-gray-600 font-mono text-2xl  text-left">
           <li> <a href="#products" className='pb-1 border-b-4  border-[#8a673d] hover:border-white  transition-all duration-300'>Products</a></li>
            <li><a href="#project" className='pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300'>Cart</a></li>
            <li><a href="#Faq" className='pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300'>Faq</a></li>
            <li><a href="#About" className='pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300'>About</a></li>
            <li><a href="#contact" className='pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300'>Contact</a></li>
        </ul>
        </nav> 
        </div>
      
     
       
        {toggleMenu && (
  <nav className="fixed inset-0 top-20 z-40 bg-[#4E3D28] md:hidden">
    <ul onClick={() => settoggleMenu(false)} className="flex flex-col items-center justify-center h-full space-y-6 text-white text-2xl">
      <li> <a href="#products" className='pb-1 border-b-4  border-[#8a673d] hover:border-white  transition-all duration-300'>Products</a></li>
            <li><a href="#project" className='pb-4 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300'>Cart</a></li>
            <li><a href="#project" className='pb-4 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300'>Faq</a></li>
            <li><a href="#resume" className='pb-4 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300'>About</a></li>
            <li><a href="#contact" className='pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300'>Contact</a></li>
    </ul>
  </nav>
)}
        
        <button onClick={()=>settoggleMenu(!toggleMenu)} className='block md:hidden'> <Bars3Icon className=' text-black h-10 pb-2 '/></button>
        
    </header>
    </div>
   
    </>
}