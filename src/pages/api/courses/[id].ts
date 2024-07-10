import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import Course from "@/models/course.model";
import { CourseApiResponse } from "@/types/types";
import handleError from "@/utils/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse<CourseApiResponse>) => {
    await connectDb();

    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const course = await Course.find({ level: id });

            if (!course) {
                return res.status(404).json({ success: false, message: "Course not found" });
            }

            return res.status(200).json({ success: true, data: course });
        } catch (error) {
            handleError(req, res, error);
        }
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}

export default handler;