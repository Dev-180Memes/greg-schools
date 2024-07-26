import React, { useState, useEffect, Key } from 'react';
import Layout from '@/components/Dashboard/User/Layout';
import { FaX } from 'react-icons/fa6';
import { UploadDropzone } from '@/utils/uploadthing';
import { Toaster, toast } from 'react-hot-toast';
import { ISchool } from '@/models/school.model';
import Image from 'next/image';
import Link from 'next/link';
import { decodeJWT } from '@/utils/decodeToken';
import { useRouter } from 'next/router';
import { ICollegeFaculty } from '@/models/collegeFaculty.model';
import { IDepartment } from '@/models/department.model';
import { ILevel } from '@/models/level.model';
import { ICourse } from '@/models/course.model';

interface CardProps {
  university: ISchool;
}

const Cards: React.FC<CardProps> = ({ university }) => (
  <Link href={`/dashboard/university/${university._id}`} className='bg-gray-200 p-5 w-full md:w-1/3 rounded-lg'>
    <div className="px-2 py-2 w-full flex justify-center items-center rounded-full">
      <Image 
        src={"/images/funaab.png"}
        alt="Funaab Logo"
        width={120}
        height={120}
      />
    </div>
    <div className="mt-3 flex justify-center items-center">
      <h2 className="text-xl text-black text-center">{university.name}</h2>
    </div>
  </Link>
);

const UserDashboard: React.FC = () => {
  const [showAddMaterial, setShowAddMaterial] = useState<boolean>(false);
  const [universities, setUniversities] = useState<ISchool[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<string>("");
  const [collegeFaculty, setCollegeFaculty] = useState<ICollegeFaculty[]>([]);
  const [facultyName, setFacultyName] = useState<string>("");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [showAddFaculty, setShowAddFaculty] = useState<boolean>(false);
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [showAddDepartment, setShowAddDepartment] = useState<boolean>(false);
  const [departmentName, setDepartmentName] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [levels, setLevels] = useState<ILevel[]>([]);
  const [showAddLevel, setShowAddLevel] = useState<boolean>(false);
  const [levelName, setLevelName] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [showAddCourse, setShowAddCourse] = useState<boolean>(false);
  const [courseName, setCourseName] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [materialName, setMaterialName] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [category, setCategory] = useState<'pq' | 'notes'>("notes");

  const router = useRouter();
  
  const fetchUniversities = async () => {
    const res = await fetch('/api/admin/schools');

    const data = await res.json();

    if (data.success) {
      setUniversities(data.data);
    } else {
      toast.error(data.message);
    }
  }

  useEffect(() => {
    fetchUniversities();
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeJWT(token);
      if (!decodedToken) {
        router.push('/auth/login');
      }

      const fetchUser = async () => {
        const res = await fetch(`/api/auth/fetchUser/${decodedToken.userId}`);
        const data = await res.json();

        if (data.success) {
          setSelectedUniversity(data.data.university);
        } else {
          toast.error(data.message);
        }
      }

      fetchUser();
    }
  }, [router]);

  // When selectedUniversity changes, fetch the colleges/Faculties for the selected university
  useEffect(() => {
    const fetchCollegeFaculty = async () => {
      if (selectedUniversity === "") {
        setCollegeFaculty([]);
        return;
      };
      const res = await fetch(`/api/collegeFaculty/${selectedUniversity}`);
      const data = await res.json();

      if (data.success) {
        setCollegeFaculty(data.data);
      } else {
        toast.error(data.message);
      }
    }

    fetchCollegeFaculty();
  }, [selectedUniversity]);

  // When selectedFaculty changes, fetch the departments for the selected faculty
  useEffect(() => {
    const fetchDepartments = async () => {
      if (selectedFaculty === "") {
        setDepartments([]);
        return;
      }
      const res = await fetch(`/api/departments/${selectedFaculty}`);
      const data = await res.json();

      if (data.success) {
        setDepartments(data.data);
      } else {
        toast.error(data.message);
      }
    }

    fetchDepartments();
  }, [selectedFaculty]);

  // When selectedDepartment changes, fetch the levels for the selected department
  useEffect(() => {
    const fetchLevels = async () => {
      if (selectedDepartment === "") {
        setLevels([]);
        return;
      }
      const res = await fetch(`/api/levels/${selectedDepartment}`);
      const data = await res.json();

      if (data.success) {
        setLevels(data.data);
      } else {
        toast.error(data.message);
      }
    }

    fetchLevels();
  }, [selectedDepartment]);

  // When selectedLevel changes, fetch the courses for the selected level
  useEffect(() => {
    const fetchCourses = async () => {
      if (selectedLevel === "") {
        setCourses([]);
        return;
      }
      const res = await fetch(`/api/courses/${selectedLevel}`);
      const data = await res.json();

      if (data.success) {
        setCourses(data.data);
      } else {
        toast.error(data.message);
      }
    }

    fetchCourses();
  }, [selectedLevel]);

  const handleAddCollegeFaculty = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: facultyName,
      university: selectedUniversity,
    };

    const res = await fetch('/api/collegeFaculty/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (responseData.success) {
      setCollegeFaculty([...collegeFaculty, ...responseData.data]);
      setFacultyName("");
      setSelectedFaculty(responseData.data[0]._id);
      setShowAddFaculty(false);
    } else {
      toast.error(responseData.message);
    }
  }

  const handleAddDepartment = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: departmentName,
      collegeFaculty: selectedFaculty,
    };

    const res = await fetch('/api/departments/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (responseData.success) {
      setDepartments([...departments, ...responseData.data]);
      setDepartmentName("");
      setSelectedDepartment(responseData.data[0]._id);
      setShowAddDepartment(false);
    } else {
      toast.error(responseData.message);
    }
  }

  const handleAddLevel = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: levelName,
      department: selectedDepartment,
    };

    const res = await fetch('/api/levels/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (responseData.success) {
      setLevels([...levels, ...responseData.data]);
      setLevelName("");
      setSelectedLevel(responseData.data[0]._id);
      setShowAddLevel(false);
    } else {
      toast.error(responseData.message);
    }
  }

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: courseName,
      level: selectedLevel,
    };

    const res = await fetch('/api/courses/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (responseData.success) {
      setCourses([...courses, ...responseData.data]);
      setCourseName("");
      setSelectedCourse(responseData.data[0]._id);
      setShowAddCourse(false);
    } else {
      toast.error(responseData.message);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: materialName,
      course: selectedCourse,
      category,
      fileUrl,
    };

    const res = await fetch('/api/materials/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (responseData.success) {
      toast.success("Material added successfully");
      setMaterialName("");
      setFileUrl("");
      setFileName("");
      setShowAddMaterial(false);
    } else {
      toast.error(responseData.message);
    }
  }

  return (
    <Layout>
      <div className="flex flex-col space-y-3">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-2xl font-semibold text-blue-500">Dashboard</h1>
          {/* search bar */}
          <input 
            type="text" 
            placeholder="Search schools" 
            className="border border-gray-300 rounded-lg p-2 w-1/3"
            onChange={(e) => {
              if (e.target.value === "") {
                fetchUniversities();
              } else {
                const filteredUniversities = universities.filter((university) => university.name.toLowerCase().includes(e.target.value.toLowerCase()));
                setUniversities(filteredUniversities);
              }

            }}
          />
          <button 
            onClick={() => setShowAddMaterial(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
          >Add Material</button>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:w-full gap-3">
          {universities.map((university) => (
            <Cards 
              key={university._id}
              university={university}
            />
          ))}
        </div>
      </div>

      {showAddMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center md:w-1/3 mt-[400px]">
            <div className="flex items-end justify-end w-full">
              <FaX className="cursor-pointer bg-gray-400 text-white p-1 rounded-full" onClick={() => setShowAddMaterial(false)} />
            </div>
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Add Material</h2>
            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col w-full space-y-2">
                <label className="text-sm font-medium text-gray-500" htmlFor="university">University</label>
                <select 
                  name="university" 
                  id="university" 
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                >
                  <option value="">Select University</option>
                  {universities.map((university) => (
                    <option key={university?._id as Key} value={university?._id as string}>{university?.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="faculty" className="text-sm font-medium text-gray-500">Category</label>
                <select 
                  name="category" 
                  id="category" 
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as 'pq' | 'notes')}
                >
                  <option value="pq">Past Questions</option>
                  <option value="notes">Notes</option>
                </select>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="faculty" className="text-sm font-medium text-gray-500">College/Faculty</label>
                <select 
                  name="faculty" 
                  id="faculty" 
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                >
                {/* Dropdown to select from existing options or add new option field */}
                  <option value="">Select College/Faculty</option>
                  {collegeFaculty.map((faculty) => (
                    <option key={faculty._id} value={faculty._id}>{faculty.name}</option>
                  ))}
                </select>
                <button 
                  className='text-blue-500 text-sm font-medium cursor-pointer'
                  onClick={() => setShowAddFaculty(true)}
                >Add College/Faculty</button>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="department" className="text-sm font-medium text-gray-500">Department</label>
                <select 
                  name="department" 
                  id="department" 
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                {/* Dropdown to select from existing options or add new option field */}
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department._id} value={department._id}>{department.name}</option>
                  ))}
                </select>
                <button 
                  className='text-blue-500 text-sm font-medium cursor-pointer'
                  onClick={() => setShowAddDepartment(true)}
                >Add Department</button>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="level" className="text-sm font-medium text-gray-500">Level</label>
                <select 
                  name="level" 
                  id="level" 
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                {/* Dropdown to select from existing options or add new option field */}
                  <option value="">Select Level</option>
                  {levels.map((level) => (
                    <option key={level._id} value={level._id}>{level.name}</option>
                  ))}
                </select>
                <button
                  className='text-blue-500 text-sm font-medium cursor-pointer'
                  onClick={() => setShowAddLevel(true)}
                >Add Level</button>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="course" className="text-sm font-medium text-gray-500">Course</label>
                <select 
                  name="course" 
                  id="course" 
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                {/* Dropdown to select from existing options or add new option field */}
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>{course.name}</option>
                  ))}
                </select>
                <button
                  className='text-blue-500 text-sm font-medium cursor-pointer'
                  onClick={() => setShowAddCourse(true)}
                >Add Course</button>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="material" className="text-sm font-medium text-gray-500">Material</label>
                <input 
                  type="text" 
                  id="material" 
                  name="material" 
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={materialName}
                  onChange={(e) => setMaterialName(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label htmlFor="file" className="text-sm font-medium text-gray-500">File</label>
                <UploadDropzone 
                  endpoint='fileUploader'
                  onClientUploadComplete={(res) => {
                    setFileUrl(res[0].url);
                    setFileName(res[0].name);
                  }}
                  onUploadError={() => {
                    toast.error("Error occurred, please try again")
                  }}
                />
                {fileName !== "" && (
                  <p className="text-black-500">{fileName}</p>
                )}
              </div>
              <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 w-full">Add Material</button>
            </form>
          </div>
        </div>
      )}

      {showAddFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center md:w-1/3">
            <div className="flex w-full items-end justify-end">
              <FaX className="cursor-pointer bg-gray-400 text-white p-1 rounded-full" onClick={() => setShowAddFaculty(false)} />
            </div>
            <h2 className="text-xl font-semibold text-blue-500 mb-4">Add College/Faculty</h2>
            <form className="w-full space-y-4" onSubmit={handleAddCollegeFaculty}>
              <div className="flex flex-col w-full space-y-2">
                <label className="text-sm font-medium text-gray-500" htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="border border-gray-300 rounded-lg p-2 w-full" 
                  value={facultyName}
                  onChange={(e) => setFacultyName(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 w-full">Add College/Faculty</button>
            </form>
          </div>
        </div>
      )}

      {showAddDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center md:w-1/3">
            <div className="flex w-full items-end justify-end">
              <FaX className="cursor-pointer bg-gray-400 text-white p-1 rounded-full" onClick={() => setShowAddDepartment(false)} />
            </div>
            <h2 className="text-xl font-semibold text-blue-500 mb-4">Add Department</h2>
            <form className="w-full space-y-4" onSubmit={handleAddDepartment}>
              <div className="flex flex-col w-full space-y-2">
                <label className="text-sm font-medium text-gray-500" htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="border border-gray-300 rounded-lg p-2 w-full" 
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 w-full">Add Department</button>
            </form>
          </div>
        </div>
      )}

      {showAddLevel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center md:w-1/3">
            <div className="flex w-full items-end justify-end">
              <FaX className="cursor-pointer bg-gray-400 text-white p-1 rounded-full" onClick={() => setShowAddLevel(false)} />
            </div>
            <h2 className="text-xl font-semibold text-blue-500 mb-4">Add Level</h2>
            <form className="w-full space-y-4" onSubmit={handleAddLevel}>
              <div className="flex flex-col w-full space-y-2">
                <label className="text-sm font-medium text-gray-500" htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="border border-gray-300 rounded-lg p-2 w-full" 
                  value={levelName}
                  onChange={(e) => setLevelName(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 w-full">Add Level</button>
            </form>
          </div>
        </div>
      )}

      {showAddCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center md:w-1/3">
            <div className="flex w-full items-end justify-end">
              <FaX className="cursor-pointer bg-gray-400 text-white p-1 rounded-full" onClick={() => setShowAddCourse(false)} />
            </div>
            <h2 className="text-xl font-semibold text-blue-500 mb-4">Add Course</h2>
            <form className="w-full space-y-4" onSubmit={handleAddCourse}>
              <div className="flex flex-col w-full space-y-2">
                <label className="text-sm font-medium text-gray-500" htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="border border-gray-300 rounded-lg p-2 w-full" 
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 w-full">Add Course</button>
            </form>
          </div>
        </div>
      )}

      <Toaster />
    </Layout>
  )
}

export default UserDashboard;
