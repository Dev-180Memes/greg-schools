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
  <Link href={`/dashboard/departments/${faculty._id}`} className='bg-gray-200 p-5 w-full rounded-lg'>
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

  const fetchFaculty = async () => {
    const res = await fetch(`/api/collegeFaculty/${id}`)
    const data = await res.json()

    if (data.success) {
      setFaculty(data.data)
    } else {
      toast.error(data.message)
    }
  }

  useEffect(() => {
    fetchFaculty()
  }, [])

  return (
    <Layout>
      <div className="flex flex-col space-y-3">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-2xl font-semibold text-blue-500">Colleges/Faculties</h1>
          {/* seach bar */}
          <input 
            type="text" 
            placeholder="Search for colleges/faculties"
            className="px-2 py-1 w-1/2 md:w-1/4 border border-gray-400 rounded-md focus:outline-none"
            onChange={(e) => {
              if (e.target.value === '') {
                fetchFaculty()
              } else {
                const filterFaculty = faculty.filter((faculty) => faculty.name.toLowerCase().includes(e.target.value.toLowerCase()))
                setFaculty(filterFaculty)
              }
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
