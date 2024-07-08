import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/utils/connectDb';
import User from '@/models/user.model';
import Reset from '@/models/reset.model';
import { ApiResponse } from '@/types/types';
import handleError from '@/utils/handleError';

connectDb();

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    if (req.method === 'POST') {
        const { otp, newPassword } = req.body;

        try {
            const reset = await Reset.findOne({ token: otp });

            if (!reset) {
                return res.status(404).json({ success: false, message: 'Invalid OTP' });
            }

            if (new Date() > reset.expires) {
                return res.status(400).json({ success: false, message: 'OTP expired' });
            }

            const user = await User.findOne({ email: reset.email });

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            user.password = newPassword;
            await user.save();

            await Reset.deleteOne({ token: otp });

            return res.status(200).json({ success: true, message: 'Password reset successfully' });
        } catch (error) {
            handleError(req, res, error);
        }
    }
};

export default handler;