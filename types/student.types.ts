export type StudentProfile = {
    id: number;
    user_id: number;
    university_id: string;
    level_id: number;
    department_id: number;
    faculty_id: number;
    field_id: number;
    created_at: string;
    updated_at: string;
}

export type CreateStudentProfileData = {
    university_id: string;
    level_id: number;
    department_id: number;
    faculty_id: number;
    field_id: number;
    user_id: string;
}
