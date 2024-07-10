import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/types/types";
import handleError from "@/utils/handleError";
import sendUniRegister from "@/utils/sendUniRegister";
import Admin from "@/models/admin.model";
import connectDb from "@/utils/connectDb";

connectDb();

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    if (req.method === "POST") {
        try {
            const { university } = req.body;
            if (!university) {
                return res.status(400).json({ success: false, message: "University is required" });
            }

            // Get all admin emails
            const admins = await Admin.find({}).select("email");

            // Send email to all admins
            admins.forEach(async (admin) => {
                await sendUniRegister(admin.email, university);
            });

            // After sending email to all admins, send success response
            return res.status(200).json({ success: true, message: "University registration request sent" });
        } catch (error) {
            handleError(req, res, error);
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
    }
}

export default handler;