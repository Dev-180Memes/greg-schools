import React, { useState, useEffect } from 'react'
import Layout from '@/components/Dashboard/User/Layout'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Toaster, toast } from 'react-hot-toast'
import { decodeJWT } from '@/utils/decodeToken'

const Pasword = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    const token: string | null = localStorage.getItem('token');
    if (token) {
      const decodeToken = decodeJWT(token);
      if (decodeToken) {
        const data = {
          id: decodeToken.userId,
          currentPassword,
          newPassword,
        };

        const response = await fetch('/api/auth/update-password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const res = await response.json();

        if (res.success) {
          toast.success(res.message);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          toast.error(res.message);
        }
      }
    }
  }

  return (
    <Layout>
      <div className="flex flex-col space-y-3">
        <h1 className="text-2xl font-semibold text-blue-500 mb-6">Update Password</h1>
        <form className="border border-1 p-5 rounded-lg space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="currentPassword" className='block text-sm font-medium text-gray-700'>
                Current Password
              </label>
              <div className='mt-1 relative'>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
                <span className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="newPassword" className='block text-sm font-medium text-gray-700'>
                New Password
              </label>
              <div className='mt-1 relative'>
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
                <span className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className='block text-sm font-medium text-gray-700'>
                Confirm Password
              </label>
              <div className='mt-1 relative'>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
                <span className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-fit float-right flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Password
              </button>
            </div>
        </form>
      </div>
    </Layout>
  )
}

export default Pasword
