import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './Components/Navber.jsx'
// import Hero from './Components/Hero.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-white'>
    <Navbar />
    {/* <Hero/> */}
    </div>
  </StrictMode>,
)
