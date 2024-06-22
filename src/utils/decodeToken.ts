import jwt from 'jsonwebtoken';
import DecodeToken from '@/types/decodeToken.types';

const decodeToken = (token: string): DecodeToken => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodeToken;
        return decoded;
    } catch (error) {
        console.error('Error decoding token', error);
        return { userId: '', iat: 0, exp: 0 }
    }
}

export default decodeToken;