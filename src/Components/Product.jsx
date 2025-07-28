
import { Card } from '@mui/material';
import { useState } from 'react'



export default function Header(){
   const [toggleMenu,settoggleMenu]= useState(false);
    return <>
    <section className=" " id="products"  >   
    <div className='px-8 bg-gradient-to-l from-[#ffba52] to-white border-2 border-white w-full h-auto rounded-2xl'>
        <h1 className='text-center mt-5 text-4xl font-bold text-[#4E3D28] pb-6'>Our products</h1>
 <div className='mx-auto w-80 h-95 p-3 border-2 border-white  my-6 rounded-2xl bg-gradient-to-t from-[#ffba52] to-white shadow-2xl '>
    <img src="Assets/seperate/candle1.png" className=' pb-4 rounded-[30px] '/>
    <button className='mx-24 z-10  font-bold p-2  rounded-2xl text-[#4E3D28] bg-gradient-to-l from-[#ffba52] to-white border-2 border-white hover:bg-gradient-to-t from-[#ffba52] to-white'>
        Tap to buy
    </button>
    {/* <button className=' font-bold ml-24 p-2 rounded-2xl text-[#4E3D28] bg-[#ffff] '>
        view more
    </button> */}
 </div>
    </div>
    </section>
    </>
}