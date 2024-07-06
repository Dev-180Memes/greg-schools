import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import School, { ISchool } from "@/models/school.model";
import handleError from "@/utils/handleError";
import { SchoolApiRequest, SchoolApiResponse } from "@/types/types";

connectDb();

const handler = async (req: NextApiRequest, res: NextApiResponse<SchoolApiResponse>) => {
    if (req.method === "POST") {
        try {
            const { name, collegeFaculty, departments }: SchoolApiRequest = req.body;
            if (!name || !collegeFaculty || !departments) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }
            const school: ISchool = new School({
                name,
                collegeFaculty,
                departments,
            });

            await school.save();

            return res.status(201).json({ success: true, message: "School created successfully", data: [school]});
        } catch (error) {
            return handleError(req, res, error);
        }
    } else if (req.method === "GET") {
        try {
            const schools: ISchool[] = await School.find();

            return res.status(200).json({ success: true, data: schools });
        } catch (error) {
            return handleError(req, res, error);
        }
    } else {
        return handleError(req, res, "Method not allowed");
    }
}

export default handler;