import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import Department from "@/models/department.model";
import { DepartmentApiResponse } from "@/types/types";
import handleError from "@/utils/handleError";
import { updateCollegeFacultyCounts, updateSchoolCounts } from "@/utils/updateCounts";

const handler = async (req: NextApiRequest, res: NextApiResponse<DepartmentApiResponse>) => {
    await connectDb();

    if (req.method === "POST") {
        try {
            const { name, collegeFaculty } = req.body;

            if (!name || !collegeFaculty) {
                return res.status(400).json({ success: false, message: "Name and collegeFaculty are required" });
            }

            const department = new Department({
                name,
                collegeFaculty,
            });

            await department.save();

            // update collegeFaculty counts
            await updateCollegeFacultyCounts(collegeFaculty, 1);

            return res.status(201).json({ success: true, data: [department] });
        } catch (error) {
            handleError(req, res, error);
        }
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}

export default handler;