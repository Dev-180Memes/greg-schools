import React, { useState, useEffect, Key } from 'react';
import Layout from '@/components/Dashboard/User/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { ILevel } from '@/models/level.model';
import { Toaster, toast } from 'react-hot-toast';

interface UniversityProps {
    level: ILevel
}

const Cards: React.FC<UniversityProps> = ({ level }) => (
  <Link href={`/dashboard/courses/${level._id}`} className='bg-gray-200 p-5 w-full md:w-1/2 rounded-lg'>
    <div className="w-full flex justify-center items-center">
      <div className="mb-4 bg-red-500 p-4 text-white rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      </div>
    </div>
    <div className="mt-3 flex justify-center items-center">
      <h2 className="text-xl text-black text-center">{level.name}</h2>
    </div>
  </Link>
)

const University: React.FC = () => {
    const [levels, setLevels] = useState<ILevel[]>([]);

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchLevels = async () => {
      const res = await fetch(`/api/levels/${id}`)
      const data = await res.json()

      if (data.success) {
        setLevels(data.data)
      } else {
        toast.error(data.message)
      }
    }

    fetchLevels()
  }, [id])

  return (
    <Layout>
      <div className="flex flex-col space-y-3">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-2xl font-semibold text-blue-500">Levels</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:w-full gap-3">
          {levels.map((level) => (
              <Cards key={level._id as Key} level={level} />
          ))}
        </div>
      </div>
      <Toaster />
    </Layout>
  )
}

export default University
