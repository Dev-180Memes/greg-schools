import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import Course from "@/models/course.model";
import { CourseApiResponse } from "@/types/types";
import handleError from "@/utils/handleError";
import { updateLevelCounts } from "@/utils/updateCounts";

const handler = async (req: NextApiRequest, res: NextApiResponse<CourseApiResponse>) => {
    await connectDb();

    if (req.method === "POST") {
        try {
            const { name, level } = req.body;

            if (!name || !level) {
                return res.status(400).json({ success: false, message: "Name and level are required" });
            }

            const course = new Course({
                name,
                level,
            });

            await course.save();

            // update level counts
            await updateLevelCounts(level, 1);

            return res.status(201).json({ success: true, data: [course] });
        } catch (error) {
            handleError(req, res, error);
        }
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}

export default handler;