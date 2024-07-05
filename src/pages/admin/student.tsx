import React from "react";
import Layout from "@/components/Dashboard/Admin/Layout";

const Students: React.FC = () => {
    return (
        <Layout>
            <div className="flex flex-col space-y-2">
                <div className="flex flex-row justify-between">
                    <h1 className="text-2xl font-semibold text-blue-500">Students</h1>
                </div>
            </div>
        </Layout>
    )
};

export default Students;