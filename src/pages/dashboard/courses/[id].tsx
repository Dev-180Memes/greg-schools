import React, { useState, useEffect, Key } from 'react';
import Layout from '@/components/Dashboard/User/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { ICourse } from '@/models/course.model';
import { Toaster, toast } from 'react-hot-toast';

interface UniversityProps {
    course: ICourse
}

const Cards: React.FC<UniversityProps> = ({ course }) => (
  <Link href={`/dashboard/materials/${course._id}`} className='bg-gray-200 p-5 w-full md:w-1/3 rounded-lg'>
    <div className="w-full flex justify-center items-center">
      <div className="mb-4 bg-green-500 p-4 text-white rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-16">
            <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
        </svg>
      </div>
    </div>
    <div className="mt-3 flex justify-center items-center">
      <h2 className="text-xl text-black text-center">{course.name}</h2>
    </div>
  </Link>
)

const University: React.FC = () => {
    const [courses, setCourses] = useState<ICourse[]>([]);

  const router = useRouter()
  const { id } = router.query

  const fetchCourses = async () => {
      if (!id) return
    const res = await fetch(`/api/courses/${id}`)
    const data = await res.json()

    if (data.success) {
      setCourses(data.data)
    } else {
      toast.error(data.message)
    }
  }
  
  useEffect(() => {

    fetchCourses()
  }, [id])

  return (
    <Layout>
      <div className="flex flex-col space-y-3">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-2xl font-semibold text-blue-500">Courses</h1>
          <input 
            type="text" 
            placeholder="Search for Courses"
            className="px-2 py-1 w-1/2 md:w-1/4 border border-gray-400 rounded-md focus:outline-none"
            onChange={(e) => {
              if (e.target.value === '') {
                fetchCourses()
              } else {
                const filterFaculty = courses.filter((course) => course.name.toLowerCase().includes(e.target.value.toLowerCase()))
                setCourses(filterFaculty)
              }
            }}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between md:w-full gap-3">
            {courses.map((course) => (
              <Cards key={course._id as Key} course={course} />
            ))}
        </div>
      </div>
      <Toaster />
    </Layout>
  )
}

export default University
