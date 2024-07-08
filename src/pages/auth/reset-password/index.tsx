import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Toaster, toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/router';

const ResetPassword = () => {
    const [otp, setOtp] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(60);

    const router = useRouter();

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000)
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleResendOtp = async () => {
        const email = localStorage.getItem('email');
        console.log(email);

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
            setTimer(60);
        } else {
            toast.error(res.message);
        }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (otp === '' || newPassword === '' || confirmPassword === '') {
            return toast.error('All fields are required');
        }

        if (newPassword !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        const data = {
            otp,
            newPassword,
        };

        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const res = await response.json();

        if (res.success) {
            toast.success(res.message);
            router.push('/auth/login');
        } else {
            toast.error(res.message);
        }
    }

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
            <h2 className="text-center text-2xl font-bold text-blue-500 mb-6">Reset Password</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                        Input OTP
                    </label>
                    <div className="mt-1">
                        <input
                            id="otp"
                            name="otp"
                            type="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className={`text-sm ${timer === 0 ? 'text-blue-500 cursor-pointer' : 'text-gray-500'}`} onClick={handleResendOtp}>
                        Resend OTP
                    </span>
                    <span className="text-sm text-gray-500">
                        {`00:${timer.toString().padStart(2, '0')}`}
                    </span>
                </div>
                <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <div className="mt-1 relative">
                        <input 
                            id='new-password'
                            name='new-password'
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <button
                                type="button"
                                onClick={handleShowPassword}
                                className="text-gray-400 cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </span>
                    </div>
                </div>
                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <div className="mt-1 relative">
                        <input 
                            id='confirm-password'
                            name='confirm-password'
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <button
                                type="button"
                                onClick={handleShowConfirmPassword}
                                className="text-gray-400 cursor-pointer"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </span>
                    </div>
                </div>
                <div>
                    {otp === '' || newPassword === '' || confirmPassword === '' ? (
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gray-500 cursor-not-allowed"
                            disabled
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
      </div>
        <Toaster />
    </div>
  )
}

export default ResetPassword
