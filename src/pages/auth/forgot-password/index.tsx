import React, { useState } from 'react'
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        localStorage.setItem('email', email);

        const data = {
            email,
        };

        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const res = await response.json();

        if (res.success) {
            toast.success(res.message);
            router.push('/auth/reset-password');
        } else {
            toast.error(res.message);
        }
    };

  return (
    <div className='min-h-screen flex'>
      <div className="relative w-full min-h-screen">
        <Image 
            src="/images/student.png"
            alt="Student"
            width={500}
            height={500}
            className='w-full h-full object-cover'
        />
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col ietms-center md:w-1/3">
            <h2 className="text-center text-2xl font-bold text-blue-500 mb-6">Forgot Password</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                </div>
                <div>
                    {email === "" ? (
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 cursor-not-allowed"
                            disabled
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;