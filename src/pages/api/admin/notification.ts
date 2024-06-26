import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/utils/connectDb";
import Notification, { INotification } from "@/models/notification.model";
import handleError from "@/utils/handleError";
import { ApiResponse } from "@/types/types";

connectDb();

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    if (req.method !== "POST")  {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({ success: false, message: "Title and Body are required" });
    }

    try {
        const notification: INotification = new Notification({
            title,
            body,
        });

        await notification.save();

        return res.status(201).json({ success: true });
    } catch (error) {
        handleError(req, res, error);
    }
};

export default handler;