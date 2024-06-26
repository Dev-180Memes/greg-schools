import React from "react";
import Layout from "@/components/Dashboard/Admin/Layout";

const Schools: React.FC = () => {
    return (
        <Layout>
            <div className="flex flex-col space-y-2">
                <div>
                    <h1 className="text-2xl font-semibold text-blue-500">Schools</h1>
                </div>
            </div>
        </Layout>
    )
};

export default Schools;