import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import { UserApiResponse } from "@/types/types";
import handleError from "@/utils/handleError";

connectDb();

const handler = async (req: NextApiRequest, res: NextApiResponse<UserApiResponse>) => {
    if (req.method === "POST") {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        try {
            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const isMatch = user.password === password;

            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Invalid credentials" });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
                expiresIn: "24h",
            });

            return res.status(200).json({ success: true, token });
        } catch (error) {
            return handleError(req, res, error);
        }
    } else if (req.method === "GET") {
        // Get all users
        const users = await User.find().populate("university");
        if (!users) {
            return res.status(404).json({ success: false, message: "No users found" });
        }

        return res.status(200).json({ success: true, users: users });
    }

    return res.status(405).json({ success: false, message: "Method not allowed" });
};

export default handler;