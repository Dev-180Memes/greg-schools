export interface Material {
    id: number;
    name: string;
    collegeFaculty: number;
    departments: number;
    materials: number;
    dateRegistered: string;
}

export interface School {
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