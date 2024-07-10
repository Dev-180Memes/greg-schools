import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import Level from "@/models/level.model";
import { LevelApiResponse } from "@/types/types";
import handleError from "@/utils/handleError";
import { updateDepartmentCounts } from "@/utils/updateCounts";

const handler = async (req: NextApiRequest, res: NextApiResponse<LevelApiResponse>) => {
    await connectDb();

    if (req.method === "POST") {
        try {
            const { name, department } = req.body;

            if (!name || !department) {
                return res.status(400).json({ success: false, message: "Name and department are required" });
            }

            const level = new Level({
                name,
                department,
            });

            await level.save();

            // update department counts
            await updateDepartmentCounts(department, 1);

            return res.status(201).json({ success: true, data: [level] });
        } catch (error) {
            handleError(req, res, error);
        }
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}

export default handler;