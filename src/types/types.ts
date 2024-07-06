import { ISchool } from "@/models/school.model";
import { IUser } from "@/models/user.model";

export interface Material {
    id: number;
    name: string;
    collegeFaculty: number;
    departments: number;
    materials: number;
    dateRegistered: string;
}

export interface ApiResponse {
    success: boolean;
    message?: string;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface SchoolApiResponse {
    success: boolean;
    message?: string;
    data?: ISchool[];
}

export interface SchoolApiRequest {
    name: string;
    collegeFaculty: number;
    departments: number;
}

export interface SignupPageOneProps {
    showPassword: boolean;
    showConfirmPassword: boolean;
    setShowPassword: (showPassword: boolean) => void;
    setShowConfirmPassword: (showConfirmPassword: boolean) => void;
    role: 'staff' | 'student' | '';
    setRole: (role: 'staff' | 'student' | '') => void;
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    confirmPassword: string;
    setConfirmPassword: (confirmPassword: string) => void;
    setPage: (page: 1 | 2) => void;
}

export interface SignupPageTwoProps {
    schools: ISchool[];
    university: string;
    setUniversity: (university: string) => void;
    department: string;
    setDepartment: (department: string) => void;
    faculty: string;
    setFaculty: (faculty: string) => void;
    level: string;
    setLevel: (level: string) => void;
    handleSignup: (e: React.FormEvent) => void;
}

export interface UserApiResponse {
    success: boolean;
    message?: string;
    token?: string;
}