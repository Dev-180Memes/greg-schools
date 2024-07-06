import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import User from "@/models/user.model";
import UserTemp from "@/models/userTemp.model";
import jwt from "jsonwebtoken";
import { UserApiResponse } from "@/types/types";
import handleError from "@/utils/handleError";
import sendOtp from "@/utils/sendOtp";
import crypto from "crypto";

connectDb();

const handler = async (req: NextApiRequest, res: NextApiResponse<UserApiResponse>) => {
    if (req.method === "POST") {
        const { name, email, password, role, university, department, faculty, level, otp, step } = req.body;

        if (!step) {
            return res.status(400).json({ success: false, message: "Step is required" });
        }

        if (step === "sendOtp") {
            if (name === "" || email === "" || password === "" || role === "" || university === "" || department === "" || faculty === "") {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            if (role === "student" && level === "") {
                return res.status(400).json({ success: false, message: "Level is required for students" });
            }

            try {
                // Generate 6 digit OTP
                const otp = crypto.randomInt(100000, 999999).toString();
                const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

                const userTemp = new UserTemp({
                    name,
                    email,
                    password,
                    role,
                    university,
                    department,
                    faculty,
                    level,
                    otp,
                    otpExpires,
                });

                await userTemp.save();

                await sendOtp(email, otp);

                return res.status(200).json({ success: true, message: "OTP sent" });
            } catch (error) {
                return handleError(req, res, error);
            }
        } else if (step === "resendOtp") {
            if (!email) {
                return res.status(400).json({ success: false, message: "Email is required" });
            }

            try {
                const userTemp = await UserTemp.findOne({ email });

                if (!userTemp) {
                    return res.status(404).json({ success: false, message: "User not found" });
                }

                const otp = crypto.randomInt(100000, 999999).toString();
                const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

                userTemp.otp = otp;
                userTemp.otpExpires = otpExpires;

                await userTemp.save();

                await sendOtp(email, otp);

                return res.status(200).json({ success: true, message: "OTP sent" });
            } catch (error) {
                return handleError(req, res, error);
            }
        }else if (step === "verifyOtp") {
            if (!email || !otp) {
                return res.status(400).json({ success: false, message: "Email and OTP are required" });
            }

            try {
                const userTemp = await UserTemp.findOne({ email, otp });

                if (!userTemp || userTemp.otpExpires < new Date()) {
                    return res.status(404).json({ success: false, message: "Invalid OTP" });
                }

                const user = new User({
                    name: userTemp.name,
                    email: userTemp.email,
                    password: userTemp.password,
                    role: userTemp.role,
                    university: userTemp.university,
                    department: userTemp.department,
                    faculty: userTemp.faculty,
                    level: userTemp.level,
                });

                await user.save();
                await UserTemp.deleteOne({ email });

                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "24h" });

                return res.status(200).json({ success: true, token });
            } catch (error) {
                return handleError(req, res, error);
            }
        } else {
            return res.status(400).json({ success: false, message: "Invalid step" });
        }
    } else {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
};

export default handler;