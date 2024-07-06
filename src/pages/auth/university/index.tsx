import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

const RegisterUniversity: React.FC = () => {
    const [university, setUniversity] = useState<string>("");
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();

      if (university === "") {
        return toast.error("University is required");
      }

      const response = await fetch("/api/auth/registerUniversity", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ university }),
      });

      const res = await response.json();

      if (res.success) {
        setShowConfirmDialog(true);
      } else {
        toast.error(res.message);
      }
    }

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
          <h2 className="text-center text-2xl font-bold text-blue-500 mb-6">Register New University</h2>
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                University
              </label>
              <div className="mt-1">
                <input
                  id="university"
                  name="university"
                  type="university"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
                {university === "" ? (
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-300 cursor-not-allowed"
                        disabled
                    >
                        Register
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                )}
            </div>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-blue-500 hover:underline">Login</Link>
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

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center md:w-1/3">
                <h2 className="text-2xl font-bold text-yellow-500 mb-4">Pending</h2>
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-32 text-yellow-500">
                        <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
                    </svg>
                </div>
                <p className="text-center mt-4">The site admins have received your request and your university will be added within 12 to 24 hours.</p>
                <button 
                  className="mt-4 bg-blue-500 w-full py-4 rounded-full text-white font-bold"
                  onClick={() => {
                    setShowConfirmDialog(false)
                    router.push("/")
                  }}
                >Proceed</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default RegisterUniversity;
