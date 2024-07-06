import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { SignupPageOneProps } from '@/types/types'
import { toast } from 'react-hot-toast'

const SignupPageOne = ({ 
    showPassword, 
    showConfirmPassword, 
    setShowPassword, 
    setShowConfirmPassword,
    role,
    setRole,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setPage
}: SignupPageOneProps) => {

    const handlePageChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name === '' || email === '' || password === '' || confirmPassword === '' || role === '') {
            return toast.error('All fields are required');
        }

        if (password !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        setPage(2);
    }

  return (
    <form className="space-y-6" onSubmit={handlePageChange}>
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
            </label>
            <div className="mt-1">
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
            {name === '' || email === '' || password === '' || confirmPassword === '' || role === '' ? (
                <button
                    type="submit"
                    disabled
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Next
                </button>
            ) : (
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Next
                </button>
            )}
        </div>
    </form>
  )
}

export default SignupPageOne
