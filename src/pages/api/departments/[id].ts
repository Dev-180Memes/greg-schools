import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import Department from "@/models/department.model";
import { DepartmentApiResponse } from "@/types/types";
import handleError from "@/utils/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse<DepartmentApiResponse>) => {
    await connectDb();

    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const department = await Department.find({ collegeFaculty: id });

            if (!department) {
                return res.status(404).json({ success: false, message: "Department not found" });
            }

            return res.status(200).json({ success: true, data: department });
        } catch (error) {
            handleError(req, res, error);
        }
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}

export default handler;