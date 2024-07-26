import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }
  return (
    <nav className="flex items-center justify-between px-6 py-2 md:px-16 bg-white">
        <Image 
          src={'/images/logo.png'}
          alt="Logo"
          width={100}
          height={100}
        />
        <ul className={`hidden md:flex items-center space-x-5`}>
          <li className="text-center py-2 md:py-0">
            <Link href="#" className="text-[#4A4A4A] font-bold">Home</Link>
          </li>
          <li className="text-center py-2 md:py-0">
            <Link href="#about" className="text-[#4A4A4A] font-bold">About</Link>
          </li>
          <li className="text-center py-2 md:py-0">
            <Link href="#services" className="text-[#4A4A4A] font-bold">Services</Link>
          </li>
          <li className="text-center py-2 md:py-0">
            <Link href="#contact" className="text-[#4A4A4A] font-bold">Contact</Link>
          </li>
        </ul>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/auth/login" className="text-[#55B5DE] border px-4 py-2 rounded-full border-[#55B5DE] font-bold">Login</Link>
          <Link href="/auth/signup" className="bg-[#55B5DE] text-white px-4 py-2 rounded-full">Sign Up</Link>
        </div>
        <div className="flex items-center space-x-4 md:hidden">
            <button onClick={toggleMenu} className='focus:outline-none'>
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
        <ul className={`flex-col absolute z-10 top-16 right-5 w-full bg-white pb-4 rounded-xl md: items-center space-x-5 ${menuOpen ? 'flex' : 'hidden'}`}>
          <li className="text-center py-2 md:py-0">
            <Link href="#" className="text-[#4A4A4A] font-bold">Home</Link>
          </li>
          <li className="text-center py-2 md:py-0">
            <Link href="#" className="text-[#4A4A4A] font-bold">About</Link>
          </li>
          <li className="text-center py-2 md:py-0">
            <Link href="#" className="text-[#4A4A4A] font-bold">Services</Link>
          </li>
          <li className="text-center py-2 md:py-0">
            <Link href="#" className="text-[#4A4A4A] font-bold">Contact</Link>
          </li>
          <li>
            <Link href={"/auth/login"} className='text-[#55B5DE] border px-4 py-2 rounded-full border-[#55B5DE]'>Login</Link>
          </li>
        </ul>
    </nav>
  )
}

export default Navbar
