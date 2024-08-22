import React from 'react'
import { SignupPageTwoProps } from '@/types/types';
import Link from 'next/link';

const SignupPageTwo = ({
    schools,
    university,
    setUniversity,
    department,
    setDepartment,
    faculty,
    setFaculty,
    level,
    setLevel,
    handleSignup
}: SignupPageTwoProps) => {
  return (
    <form onSubmit={handleSignup} className="space-y-6">
        <div>
            <label htmlFor="university" className='block text-sm font-medium text-gray-700'>
                University
            </label>
            <div className="mt-1">
                <select
                    name="university"
                    id="university"
                    value={university}
                    required
                    onChange={(e) => setUniversity(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    <option value="">Select University</option>
                    {schools.map((school) => (
                        <option key={school._id} value={school._id}>{school.name}</option>
                    ))}
                </select>
                <div className="flex flex-end justify-end text-sm text-blue-500">
                    <Link href={"/auth/university"}>Register New University</Link>
                </div>
            </div>
        </div>
        <div>
            <label htmlFor="department" className='block text-sm font-medium text-gray-700'>
                Department
            </label>
            <div className="mt-1">
                <input 
                    id='department'
                    name='department'
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    type='text'
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
            </div>
        </div>
        <div>
            <label htmlFor="faculty" className='block text-sm font-medium text-gray-700'>
                College/Faculty
            </label>
            <div className="mt-1">
                <input 
                    id='faculty'
                    name='faculty'
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    required
                    type='text'
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
            </div>
        </div>
        <div>
            <label htmlFor="level" className='block text-sm font-medium text-gray-700'>
                Academic Level
            </label>
            <div className="mt-1">
                <input 
                    id='level'
                    name='level'
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    type='text'
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
            </div>
        </div>
        <div>
            {university === '' || department === '' || faculty === '' ? (
                <button
                    type='submit'
                    disabled
                    className='w-full bg-gray-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                >
                    Signup
                </button>
            ) : (
                <button
                    type='submit'
                    className='w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                >
                    Signup
                </button>
            )}
        </div>
    </form>
  )
}

export default SignupPageTwo;
