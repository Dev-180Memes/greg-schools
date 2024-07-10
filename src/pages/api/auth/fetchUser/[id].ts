import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/utils/connectDb';
import User from '@/models/user.model';
import { IUser } from '@/models/user.model';
import { FetchUserResponse } from '@/types/types';
import handleError from '@/utils/handleError';

const handler = async (req: NextApiRequest, res: NextApiResponse<FetchUserResponse>) => {
    await connectDb();

    const { id } = req.query;

    if (req.method === 'GET') {

        try {
            const user: IUser | null = await User.findById(id);

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            return res.status(200).json({ success: true, data: user });
        } catch (error) {
            handleError(req, res, error);
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
}

export default handler;