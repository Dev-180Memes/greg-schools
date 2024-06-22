import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-between p-4 bg-white shadow-md">
      <button onClick={toggleSidebar} className="md:hidden focus:outline-none">
        <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      <div className="hidden md:flex items-center space-x-4">
        <nav className="flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href={router.pathname} className='text-blue-500'>
            Dashboard
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/" className='text-blue-500'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
