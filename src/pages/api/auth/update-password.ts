import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import User from "@/models/user.model";
import { ApiResponse } from "@/types/types";
import handleError from "@/utils/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    await connectDb();

    if (req.method === "PUT") {
        const { id, currentPassword, newPassword } = req.body;

        if (!id || !currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        try {
            const user = await User.findById(id).select("+password");

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const isMatch = await user.comparePassword(currentPassword);

            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Current password incorrect" });
            }

            user.password = newPassword;

            await user.save();

            return res.status(200).json({ success: true, message: "Password updated successfully" });
        } catch (error) {
            return handleError(req, res, error);
        }
    }
};

export default handler;