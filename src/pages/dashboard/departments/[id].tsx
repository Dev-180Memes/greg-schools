import React, { useState, useEffect, Key } from 'react';
import Layout from '@/components/Dashboard/User/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { IDepartment } from '@/models/department.model';
import { Toaster, toast } from 'react-hot-toast';

interface UniversityProps {
    department: IDepartment;
}

const Cards: React.FC<UniversityProps> = ({ department }) => (
  <Link href={`/dashboard/levels/${department._id}`} className='bg-gray-200 p-5 w-full rounded-lg'>
    <div className="px-2 py-2 w-full flex justify-center items-center rounded-full">
      <Image 
        src={"/images/funaab.png"}
        alt="funaab logo"
        width={120}
        height={120}
      />
    </div>
    <div className="mt-3 flex justify-center items-center">
      <h2 className="text-xl text-black text-center">{department.name}</h2>
    </div>
  </Link>
)

const University: React.FC = () => {
    const [department, setDepartment] = useState<IDepartment[]>([]);

  const router = useRouter()
  const { id } = router.query

  const fetchDepartment = async () => {
    const res = await fetch(`/api/departments/${id}`)
    const data = await res.json()

    if (data.success) {
      setDepartment(data.data)
    } else {
      toast.error(data.message)
    }
  }

  useEffect(() => {
    fetchDepartment()
  }, [])

  return (
    <Layout>
      <div className="flex flex-col space-y-3">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-2xl font-semibold text-blue-500">Departments</h1>
          <input 
            type="text" 
            placeholder="Search for departments"
            className="px-2 py-1 w-1/2 md:w-1/4 border border-gray-400 rounded-md focus:outline-none"
            onChange={(e) => {
              if (e.target.value === '') {
                fetchDepartment()
              } else {
                const filterFaculty = department.filter((department) => department.name.toLowerCase().includes(e.target.value.toLowerCase()))
                setDepartment(filterFaculty)
              }
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {department.map((department) => (
                <Cards key={department._id as Key} department={department} />
            ))}
        </div>
      </div>
      <Toaster />
    </Layout>
  )
}

export default University
