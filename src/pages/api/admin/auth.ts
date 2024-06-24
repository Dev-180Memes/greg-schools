import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import Admin from "@/models/admin.model";
import jwt from "jsonwebtoken";
import { AdminLoginResponse } from "@/types/admin.types";
import handleError from "@/utils/handleError";

connectDb();

const handler = async (req: NextApiRequest, res: NextApiResponse<AdminLoginResponse>) => {
    if (req.method !== "POST")  {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and Password are required" });
    }

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        const isMatch = await admin.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET as string, { expiresIn: "24h" });

        return res.status(200).json({ success: true, token });
    } catch (error) {
        handleError(req, res, error);
    }
};

export default handler;