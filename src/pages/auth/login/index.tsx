import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="relative w-full min-h-screen md:w-1/2 bg-black md:bg-transparent flex items-center justify-center p-8">
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/student.png"
            alt="Student"
            fill
            objectFit="cover"
            className="opacity-30 md:hidden"
          />
        </div>
        <div className="relative bg-white p-8 rounded-lg w-full max-w-md">
          <h2 className="text-center text-2xl font-bold text-blue-500 mb-6">Sign In</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
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
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <button
                        type="button"
                        onClick={handleShowPassword}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </span>
              </div>
            </div>
            <div className="text-right">
                <Link href={"#"} className="text-sm text-blue-500 hover:underline">Forgot password?</Link>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/auth/signup" className="text-blue-500 hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2">
        <Image
          src="/images/student.png"
          alt="Student"
          width={500}
            height={500}
          className="h-[100%] w-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
