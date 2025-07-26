import { Bars3Icon} from '@heroicons/react/24/solid'
import { useState } from 'react'
import candle from '../assets/candle.png'



export default function Header(){
   const [toggleMenu,settoggleMenu]= useState(false);
    return <>
    <section className="  px-3 pt-4 relative cursor-default  ">    
    <header className="flex justify-between px-10 py-5  rounded-2xl border-2  border-[#fcf5f5] shadow-2xl bg-[#f1cc94]">
        
        <img src={candle} alt="logo" className='border-r-4 border-[#fcfaf7] h-14 w-18  pr-4  ' />
        <p className=" text-[#4E3D28] text-4xl mt-2 font-extrabold "> Candlex </p>
        <div className=''>
        <nav className="hidden  md:block ">
        <ul className=" flex gap-9  mt-2 text-gray-600 font-mono text-2xl  text-left">
           <li> <a href="#about" className='pb-1 border-b-4  border-[#8a673d] hover:border-white  transition-all duration-300'>Products</a></li>
            <li><a href="#project" className='pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300'>Cart</a></li>
            <li><a href="#project" className='pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300'>Faq</a></li>
            <li><a href="#resume" className='pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300'>About</a></li>
            <li><a href="#contact" className='pb-1 border-b-4 border-[#8a673d] hover:border-white transition-all duration-300'>Contact</a></li>
        </ul>
        </nav> 
        </div>
      
     
       
        { toggleMenu && <nav className="block md:hidden  ">
           
        <ul onClick={()=>settoggleMenu(!toggleMenu)} className="flex flex-col py-16 mobile-nav animate-slide-down  z-50">
       
           <li> <a href="/" className='text-white pb-3 border-b-2 border-white  '>Home</a></li>
           <li> <a href="#about" className='text-white pb-3 border-b-2 border-white ' >About</a></li>
            <li><a href="#project" className='text-white pb-3 border-b-2 border-white'>Projects</a></li>
            <li><a href="#resume" className='text-white pb-3 border-b-2 border-white'>Resume</a></li>
            <li><a href="#contact" className='text-white pb-3 border-b-2 border-white'>Contact</a></li>
           
        </ul>
       
        </nav>}
        
        <button onClick={()=>settoggleMenu(!toggleMenu)} className='block md:hidden'> <Bars3Icon className=' text-black h-10 pb-2 '/></button>
        
    </header>
    </section>
    </>
}