import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import CollegeFaculty from "@/models/collegeFaculty.model";
import { CollegeFacultyApiResponse } from "@/types/types";
import handleError from "@/utils/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse<CollegeFacultyApiResponse>) => {
    await connectDb();

    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const collegeFaculty = await CollegeFaculty.find({ university: id });

            if (!collegeFaculty) {
                return res.status(404).json({ success: false, message: "College Faculty not found" });
            }

            return res.status(200).json({ success: true, data: collegeFaculty });
        } catch (error) {
            handleError(req, res, error);
        }
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}

export default handler;