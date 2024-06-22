export interface Admin {
    _id: string;
    email: string;
    password: string;
}

export interface AdminLoginResponse {
    success: boolean;
    token?: string;
    message?: string;
}