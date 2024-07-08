import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SignupPageOne from '@/components/Signup/PageOne';
import SignupPageTwo from '@/components/Signup/PageTwo';
import { Toaster, toast } from 'react-hot-toast';
import { ISchool } from '@/models/school.model';
import { useRouter } from 'next/router';

const Signup: React.FC = () => {
  const [role, setRole] = useState<'staff'| 'student' | ''>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [page, setPage] = useState< 1 | 2>(2);
  const [schools, setSchools] = useState<ISchool[]>([]);
  const [university, setUniversity] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [faculty, setFaculty] = useState<string>('');
  const [level, setLevel] = useState<string>('');
  const [otp, setOtp] = useState<string>(''); 
  const [showOtpDialog, setShowOtpDialog] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60)

  const router = useRouter();

  useEffect(() => {
    const fetchSchools = async () => {
      const response = await fetch('/api/admin/schools');
      const data = await response.json();
      if (data.success) {
        setSchools(data.data);
      } else {
        toast(data.message);
      }
    }

    fetchSchools();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showOtpDialog && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000)
    }
    return () => clearInterval(interval);
  }, [showOtpDialog, timer]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name === '' || email === '' || password === '' || confirmPassword === '' || role === '') {
      return toast.error('All fields are required');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    if (page === 2 && (university === '' || department === '' || faculty === '' || level === '')) {
      return toast.error('All fields are required');
    }

    const data = {
      name,
      email,
      password,
      role,
      university,
      department,
      faculty,
      level,
      step: 'sendOtp'
    }

    // console.log(data)
    
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const res = await response.json();

    if (res.success) {
      setOtp('');
      setShowOtpDialog(true);
      setTimer(60);
    } else {
      toast.error(res.message);
    }
  }

  const handleVerifyOtp = async () => {
    if (otp === '') {
      return toast.error('OTP is required');
    }

    const data = {
      email,
      otp,
      step: 'verifyOtp',
    };

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (res.success) {
      const { token } = res;
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } else {
      toast.error(res.message);
    }
  };

  const handleResendOtp = async () => {
    const data = {
      email,
      step: 'resendOtp',
    };

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (res.success) {
      toast.success('OTP sent');
      setTimer(60);
    } else {
      toast.error(res.message);
    }
  }

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
            {page === 1 ? (
              <>
                <span className="bg-blue-500 h-1 w-1/2 rounded-full"></span>
                <span className="bg-gray-300 h-1 w-1/2 rounded-full"></span>
              </>
            ) : (
              <>
                <span className="bg-gray-300 h-1 w-1/2 rounded-full"></span>
                <span className="bg-blue-500 h-1 w-1/2 rounded-full"></span>
              </>
            )}
            {/* <span className="text-gray-500 ml-2">1 of 2</span> */}
          </div>
          {page === 1 && (
            <SignupPageOne 
              role={role}
              setRole={setRole}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              setShowPassword={setShowPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              setPage={setPage}
            />
          )}
          {page === 2 && (
            <SignupPageTwo 
              schools={schools}
              university={university}
              setUniversity={setUniversity}
              department={department}
              setDepartment={setDepartment}
              faculty={faculty}
              setFaculty={setFaculty}
              level={level}
              setLevel={setLevel}
              handleSignup={handleSignup}
            />
          )}
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

      {showOtpDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center md:w-1/3">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">OTP Verification</h2>
            <p className="text-center mb-4">Please enter the 6-digit code sent to your email</p>
            <div className="flex justify-center space-x-2 mb-4">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otp[index] || ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/, '');
                    if (value) {
                      const newOtp = otp.split('');
                      newOtp[index] = value;
                      setOtp(newOtp.join(''));
                      if (index < 5) {
                        (e.target.nextSibling as HTMLElement)?.focus();
                      }
                    }
                  }}
                  className="w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Verify
            </button>
            <div className="mt-4 text-sm">
              Didn&apos;t receive code?{' '}
              {timer > 0 ? (
                <span className="text-gray-500">Resend Code in {`00:${timer.toString().padStart(2, '0')}`}</span>
              ) : (
                <button onClick={handleResendOtp} className="text-blue-500 hover:underline">
                  Resend Code
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  )
}

export default Signup;
