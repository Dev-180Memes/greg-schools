import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import Material from "@/models/material.model";
import { MaterialApiResponse } from "@/types/types";
import handleError from "@/utils/handleError";
import { updateCourseCounts, updateSchoolCounts } from "@/utils/updateCounts";

const handler = async (req: NextApiRequest, res: NextApiResponse<MaterialApiResponse>) => {
    await connectDb();

    if (req.method === "POST") {
        try {
            const { name, course, category, fileUrl } = req.body;

            if (!name || !course || !fileUrl) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            if (category !== "pq" && category !== "notes") {
                return res.status(400).json({ success: false, message: "Invalid category" });
            }

            let filename: string;

            if (category === "pq") {
                filename = `Past Questions - ${name}`;
            } else {
                filename = `Notes - ${name}`;
            }

            const material = new Material({
                name: filename,
                category,
                course,
                fileUrl,
            });

            await material.save();

            // update course counts
            await updateCourseCounts(course, 1);

            return res.status(201).json({ success: true });
        } catch (error) {
            handleError(req, res, error);
        }
    } else if (req.method === "GET") {
        try {
            const materials = await Material.find()
            if (!materials) {
                return res.status(404).json({ success: false, message: "No materials found" });
            }

            return res.status(200).json({ success: true, data: materials });
        } catch (error) {
            handleError(req, res, error);
        }
    
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}

export default handler;