import React from "react";
import Layout from "@/components/Dashboard/Admin/Layout";
import { Material } from "@/types/types";
import { FaEllipsisV } from 'react-icons/fa';

const PAGE_SIZE = 10;

const materialsData: Material[] = [
    {
        id: 1,
        name: 'Federal University of Agriculture, Abeokuta',
        collegeFaculty: 20,
        departments: 100,
        materials: 100,
        dateRegistered: '2021-10-10',
    },
    {
        id: 2,
        name: 'Federal University of Technology, Akure',
        collegeFaculty: 10,
        departments: 50,
        materials: 50,
        dateRegistered: '2021-10-10',
    },
    {
        id: 3,
        name: 'University of Ibadan',
        collegeFaculty: 15,
        departments: 70,
        materials: 70,
        dateRegistered: '2021-10-10',
    },
    {
        id: 4,
        name: 'Ladoke Akintola University of Technology',
        collegeFaculty: 5,
        departments: 30,
        materials: 30,
        dateRegistered: '2021-10-10',
    },
    {
        id: 5,
        name: 'Obafemi Awolowo University',
        collegeFaculty: 12,
        departments: 60,
        materials: 60,
        dateRegistered: '2021-10-10',
    },
    {
        id: 6,
        name: 'University of Lagos',
        collegeFaculty: 18,
        departments: 80,
        materials: 80,
        dateRegistered: '2021-10-10',
    },
    {
        id: 7,
        name: 'University of Ilorin',
        collegeFaculty: 8,
        departments: 40,
        materials: 40,
        dateRegistered: '2021-10-10',
    },
    {
        id: 8,
        name: 'University of Benin',
        collegeFaculty: 9,
        departments: 45,
        materials: 45,
        dateRegistered: '2021-10-10',
    },
    {
        id: 9,
        name: 'University of Abuja',
        collegeFaculty: 7,
        departments: 35,
        materials: 35,
        dateRegistered: '2021-10-10',
    },
    {
        id: 10,
        name: 'University of Port Harcourt',
        collegeFaculty: 6,
        departments: 30,
        materials: 30,
        dateRegistered: '2021-10-10',
    },
    {
        id: 11,
        name: 'University of Nigeria, Nsukka',
        collegeFaculty: 11,
        departments: 55,
        materials: 55,
        dateRegistered: '2021-10-10',
    },
    {
        id: 12,
        name: 'University of Uyo',
        collegeFaculty: 4,
        departments: 20,
        materials: 20,
        dateRegistered: '2021-10-10',
    },
    {
        id: 13,
        name: 'University of Calabar',
        collegeFaculty: 3,
        departments: 15,
        materials: 15,
        dateRegistered: '2021-10-10',
    },
    {
        id: 14,
        name: 'University of Jos',
        collegeFaculty: 2,
        departments: 10,
        materials: 10,
        dateRegistered: '2021-10-10',
    },
    {
        id: 15,
        name: 'University of Maiduguri',
        collegeFaculty: 1,
        departments: 5,
        materials: 5,
        dateRegistered: '2021-10-10',
    }
];

const Materials: React.FC = () => {
    const [materials, setMaterials] = React.useState<Material[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);

    React.useEffect(() => {
        setMaterials(materialsData);
        setTotalPages(Math.ceil(materialsData.length / PAGE_SIZE));
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const paginatedMaterials = materials.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
      <Layout>
        <div className="flex flex-col space-y-2 w-full">
          <h1 className="text-2xl font-semibold text-blue-500">Materials</h1>
          <div className="border border-gray-400 rounded-xl md:rounded-lg p-3 md:p-7 w-full">
            <div className="relative overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                    <th className="px-6 py-3 bg-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        S/N
                    </th>
                    <th className="px-6 py-3 bg-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th className="px-6 py-3 bg-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        College/Faculty
                    </th>
                    <th className="px-6 py-3 bg-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Departments
                    </th>
                    <th className="px-6 py-3 bg-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Materials
                    </th>
                    <th className="px-6 py-3 bg-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Registered
                    </th>
                    <th className="px-6 py-3 bg-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedMaterials.map((material, index) => (
                        <tr key={material.id}>
                            <td className="px-6 py-4">{index + 1 + (currentPage - 1) * PAGE_SIZE}</td>
                            <td className="px-6 py-4">{material.name}</td>
                            <td className="px-6 py-4">{material.collegeFaculty}</td>
                            <td className="px-6 py-4">{material.departments}</td>
                            <td className="px-6 py-4">{material.materials}</td>
                            <td className="px-6 py-4">{material.dateRegistered}</td>
                            <td className="px-6 py-4">
                                <button className="text-gray-600 hover:text-gray-900">
                                    <FaEllipsisV />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </Layout>
    );
};

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button 
                key={i}
                className={`px-4 py-2 border ${currentPage === i ? 'bg-blue-500 text-white' : 'text-gray-700 bg-white'} rounded-mb mx-1`}
                onClick={() => onPageChange(i)}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="flex justify-center space-x-2 mt-4">
            {pages}
        </div>
    );
};

export default Materials;