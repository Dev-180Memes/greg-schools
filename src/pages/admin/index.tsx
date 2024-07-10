import React, { useEffect, useState } from 'react';
import Layout from '@/components/Dashboard/Admin/Layout';
import { FaUsers, FaSchool, FaBookOpen } from "react-icons/fa";
import { IUser } from '@/models/user.model';
import toast from 'react-hot-toast';
import { ISchool } from '@/models/school.model';
import { IMaterial } from '@/models/material.model';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}

const Cards: React.FC<CardProps> = ({ icon, title, value }) => {
  return (
    <div className='bg-gray-200 p-5 w-full md:w-1/3 rounded-lg'>
      <div className={`px-2 py-2 bg-green-400 w-fit text-white rounded-full`}>
        {icon}
      </div>
      <div className='flex flex-col space-y-1 mt-3'>
        <p className='text-lg font-normal text-gray-500'>{title}</p>
        <h2 className='text-2xl text-gray-600 font-semibold'>{value}</h2>
      </div>
    </div>
  )
};

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [schools, setSchools] = useState<ISchool[]>([]);
  const [materials, setMaterials] = useState<IMaterial[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/auth/login');
      const data = await res.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    };

    fetchUsers();

    const fetchSchools = async () => {
      const res = await fetch('/api/admin/schools');
      const data = await res.json();

      if (data.success) {
        setSchools(data.data);
      } else {
        toast.error(data.message);
      }
    };

    fetchSchools();

    const fetchMaterials = async () => {
      const res = await fetch('/api/materials/add');
      const data = await res.json();

      if (data.success) {
        setMaterials(data.data);
      } else {
        toast.error(data.message);
      }
    }

    fetchMaterials();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold text-blue-500">Dashboard</h1>
        <div className="flex flex-col md:flex-row justify-between md:w-full gap-3">
          <Cards 
            icon={<FaUsers className='size-6' />}
            title='Total Users'
            value={users.length}
          />
          <Cards 
            icon={<FaSchool className='size-6' />}
            title='Schools'
            value={schools.length}
          />
          <Cards 
            icon={<FaBookOpen className='size-6' />}
            title='Materials'
            value={materials.length}
          />
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
