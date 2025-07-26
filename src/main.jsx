import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './Components/Navber.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-white'>
    <Navbar />
    </div>
  </StrictMode>,
)
