import React from "react";
import Layout from "@/components/Dashboard/Admin/Layout";
import Pagination from "@/components/Pagination";
import { FaX } from "react-icons/fa6";
import { ISchool } from "@/models/school.model";
import { toast, Toaster } from "react-hot-toast";

const PAGE_SIZE = 10;

const Schools: React.FC = () => {
    const [schools, setSchools] = React.useState<ISchool[]>([]);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [showAddSchoolModal, setShowAddSchoolModal] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>('');
    const [collegeFaculty, setCollegeFaculty] = React.useState<number>(0);
    const [departments, setDepartments] = React.useState<number>(0);

    React.useEffect(() => {
        const fetchSchools = async () => {
            const response = await fetch('/api/admin/schools');
            const responseData = await response.json();

            if (responseData.success) {
                setSchools(responseData.data);
                setTotalPages(Math.ceil(responseData.data.length / PAGE_SIZE));
            }
        }

        fetchSchools();
    }, []);

    const handlePageChange = (page: number) => {
        setPage(page);
    }

    const handleAddSchool = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            name,
            collegeFaculty,
            departments,
        };

        const response = await fetch('/api/admin/schools', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (responseData.success) {
            setShowAddSchoolModal(false);
            setName('');
            setCollegeFaculty(0);
            setDepartments(0);
            setSchools([...schools, ...responseData.data]);
            setTotalPages(Math.ceil((schools.length + 1) / PAGE_SIZE));
        } else {
            toast.error(responseData.message);
        }
    }

    const paginatedSchools = schools.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <Layout>
            <div className="flex flex-col space-y-2">
                <div className="flex flex-row justify-between">
                    <h1 className="text-2xl font-semibold text-blue-500">Schools</h1>
                    <button 
                        className="px-4 py-2 border border-blue-500 rounded-lg text-blue-500"
                        onClick={() => setShowAddSchoolModal(true)}
                    >Add School</button>
                </div>
                {schools.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full"> 
                        <div className="text-center">
                            <div className="mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[8rem] text-gray-400 mx-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                </svg>
                            </div>
                            <p className="text-gray-500 text-xl">No school has been added yet</p>
                        </div>
                    </div>
                ) : (
                    <div className="border border-gray-400 rounded-xl md:rounded-lg p-3 md:p-7 w-full">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-300">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College/Faculty</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departments</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Registered</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedSchools.map((school, index) => (
                                        <tr key={school.id}>
                                            <td className="px-6 py-4">{school?.name}</td>
                                            <td className="px-6 py-4">{school?.collegeFaculty}</td>
                                            <td className="px-6 py-4">{school?.departments}</td>
                                            <td className="px-6 py-4">{school?.dateRegistered.toString().split("T")[0]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                )}
            </div>

            {showAddSchoolModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center md:w-1/3">
                        <div className="flex w-full items-end justify-end">
                            <button
                                className="bg-gray-200 p-2 flex items-end justify-end rounded-full"
                                onClick={() => setShowAddSchoolModal(false)}
                            >
                                <FaX />
                            </button>
                        </div>
                        <h2 className='text-xl font-semibold text-blue-500 mb-4'>Add School</h2>
                        <form className="w-full space-y-4" onSubmit={handleAddSchool}>
                            <div className="flex flex-col w-full space-y-2">
                                <label className="text-sm font-medium text-gray-500" htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    className="border border-gray-300 rounded-lg p-2 w-full" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col w-full space-y-2">
                                <label className="text-sm font-medium text-gray-500" htmlFor="collegeFaculty">College/Faculty</label>
                                <input 
                                    type="number" 
                                    id="collegeFaculty" 
                                    name="collegeFaculty" 
                                    className="border border-gray-300 rounded-lg p-2 w-full" 
                                    value={collegeFaculty}
                                    onChange={(e) => setCollegeFaculty(parseInt(e.target.value))}
                                />
                            </div>
                            <div className="flex flex-col w-full space-y-2">
                                <label className="text-sm font-medium text-gray-500" htmlFor="departments">Departments</label>
                                <input 
                                    type="number" 
                                    id="departments" 
                                    name="departments" 
                                    className="border border-gray-300 rounded-lg p-2 w-full" 
                                    value={departments}
                                    onChange={(e) => setDepartments(parseInt(e.target.value))}
                                />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white rounded-lg p-2 w-full">Add School</button>
                        </form>
                    </div>
                </div>
            )}
            <Toaster />
        </Layout>
    )
};

export default Schools;