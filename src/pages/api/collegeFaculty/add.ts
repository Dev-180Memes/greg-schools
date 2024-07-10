import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import CollegeFaculty from "@/models/collegeFaculty.model";
import { CollegeFacultyApiResponse } from "@/types/types";
import handleError from "@/utils/handleError";
import { updateSchoolCounts } from "@/utils/updateCounts";

const handler = async (req: NextApiRequest, res: NextApiResponse<CollegeFacultyApiResponse>) => {
    await connectDb();

    if (req.method === "POST") {
        try {
            const { name, university } = req.body;

            if (!name || !university) {
                return res.status(400).json({ success: false, message: "Name and university are required" });
            }

            const collegeFaculty = new CollegeFaculty({
                name,
                university,
            });

            await collegeFaculty.save();

            // update school counts
            await updateSchoolCounts(university, "collegeFaculty", 1);

            return res.status(201).json({ success: true, data: [collegeFaculty] });
        } catch (error) {
            handleError(req, res, error);
        }
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}

export default handler;