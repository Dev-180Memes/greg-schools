import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import Level from "@/models/level.model";
import { LevelApiResponse } from "@/types/types";
import handleError from "@/utils/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse<LevelApiResponse>) => {
    await connectDb();

    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const level = await Level.find({ department: id });

            if (!level) {
                return res.status(404).json({ success: false, message: "Level not found" });
            }

            return res.status(200).json({ success: true, data: level });
        } catch (error) {
            handleError(req, res, error);
        }
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}

export default handler;