import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/utils/connectDb';
import User from '@/models/user.model';
import Reset from '@/models/reset.model';
import crypto from 'crypto';
import sendResetOtp from '@/utils/sendResetOtp';
import { ApiResponse } from '@/types/types';
import handleError from '@/utils/handleError';

connectDb();

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    if (req.method === 'POST') {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            const token = crypto.randomInt(100000, 999999).toString();
            const expires = new Date(Date.now() + 10 * 60 * 1000);

            // Check if there is an existing reset
            const existingReset = await Reset.findOne({ email });
            if (existingReset) {
                await Reset.deleteOne({ email });
            }

            const reset = new Reset({
                email,
                token,
                expires,
            });

            await reset.save();

            await sendResetOtp(email, token);

            return res.status(200).json({ success: true, message: 'OTP sent' });
        } catch (error) {
            handleError(req, res, error);
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
    }
}

export default handler;