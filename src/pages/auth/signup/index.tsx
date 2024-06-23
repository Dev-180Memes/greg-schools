import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup: React.FC = () => {
    const [role, setRole] = useState<'staff'| 'student' | ''>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="hidden md:block md:w-1/2">
        <Image 
          src={"/images/signup.png"}
          alt="Signup"
          width={350}
          height={350}
          className='h-[100%] w-auto object-cover'
        />
      </div>
      <div className="relative w-full min-h-screen md:w-1/2 bg-black md:bg-transparent flex items-center justify-start p-8">
        <div className="absolute inset-0 md:hidden">
          <Image 
            src={"/images/signup.png"}
            alt="Signup"
            fill
            objectFit="cover"
            className="opacity-30 md:hidden"
          />
        </div>
        <div className="relative bg-white p-8 rounded-lg w-full max-w-md">
          <h2 className="text-center text-2xl font-bold text-blue-500 mb-6">Create Account</h2>
          <div className="flex items-center justify-center mb-4 space-x-1">
            <span className="bg-blue-500 h-1 w-1/2 rounded-full"></span>
            <span className="bg-gray-300 h-1 w-1/2 rounded-full"></span>
            {/* <span className="text-gray-500 ml-2">1 of 2</span> */}
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <div className="mt-1 flex space-x-4">
                <button
                  type="button"
                  className={`py-2 px-4 border ${
                    role === 'staff' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                  } border-gray-300 rounded-md shadow-sm focus:outline-none`}
                  onClick={() => setRole('staff')}
                >
                  Staff
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 border ${
                    role === 'student' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                  } border-gray-300 rounded-md shadow-sm focus:outline-none`}
                  onClick={() => setRole('student')}
                >
                  Student
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;
