import { NextApiRequest, NextApiResponse } from "next";

const handleError = ( req: NextApiRequest, res: NextApiResponse, error: any ) => {
    console.error('Error handling request', error);
    res.status(500).json({ message: 'An unexpected error occurred' });
}

export default handleError;