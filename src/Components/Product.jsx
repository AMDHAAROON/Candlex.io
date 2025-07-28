
import { Card } from '@mui/material';
import { useState } from 'react'



export default function Header(){
   const [toggleMenu,settoggleMenu]= useState(false);
    return <>
    <section className="bg-gray-300 ">    
    <div className='p-8 bg-gradient-to-l from-[#ffba52] to-white border-2 border-white w-full h-auto rounded-2xl'>
        <h1 className='text-center mt-10 text-4xl font-bold text-[#4E3D28] pb-6'>Our products</h1>
 <div className='mx-auto w-80 h-100 border-2 border-white  pt-10 rounded-2xl bg-gradient-to-t from-[#ffba52] to-white shadow-2xl '>
 </div>
    </div>
    </section>
    </>
}