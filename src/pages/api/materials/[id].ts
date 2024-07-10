import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import Material from "@/models/material.model";
import { MaterialApiResponse } from "@/types/types";
import handleError from "@/utils/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse<MaterialApiResponse>) => {
    await connectDb();

    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const material = await Material.find({ course: id });

            if (!material) {
                return res.status(404).json({ success: false, message: "Material not found" });
            }

            return res.status(200).json({ success: true, data: material });
        } catch (error) {
            handleError(req, res, error);
        }
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}

export default handler;