import { ISchool } from "@/models/school.model";

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