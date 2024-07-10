import React, { useState, useEffect, Key } from 'react';
import Layout from '@/components/Dashboard/User/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { ICollegeFaculty } from '@/models/collegeFaculty.model';
import { Toaster, toast } from 'react-hot-toast';

interface UniversityProps {
  faculty: ICollegeFaculty;
}

const Cards: React.FC<UniversityProps> = ({ faculty }) => (
  <Link href={`/dashboard/departments/${faculty._id}`} className='bg-gray-200 p-5 w-full md:w-1/3 rounded-lg'>
    <div className="px-2 py-2 w-full flex justify-center items-center rounded-full">
      <Image 
        src={"/images/funaab.png"}
        alt="funaab logo"
        width={120}
        height={120}
      />
    </div>
    <div className="mt-3 flex justify-center items-center">
      <h2 className="text-xl text-black text-center">{faculty.name}</h2>
    </div>
  </Link>
)

const University: React.FC = () => {
  const [faculty, setFaculty] = useState<ICollegeFaculty[]>([]);

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchFaculty = async () => {
      const res = await fetch(`/api/collegeFaculty/${id}`)
      const data = await res.json()

      if (data.success) {
        setFaculty(data.data)
      } else {
        toast.error(data.message)
      }
    }

    fetchFaculty()
  }, [id])

  return (
    <Layout>
      <div className="flex flex-col space-y-3">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-2xl font-semibold text-blue-500">Colleges/Faculties</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:w-full gap-3">
          {faculty.map((faculty) => (
            <Cards key={faculty._id as Key} faculty={faculty} />
          ))}
        </div>
      </div>
      <Toaster />
    </Layout>
  )
}

export default University
