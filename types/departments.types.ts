export type GetDepartmentsParams = {
    university_id?: string ;
    name?: string;
    faculty_id?: string ;
}

export type Department = {
    id:number,
    name: string,
    code: string,
    faculty_id: number,
    university_id: string,
    created_at: string,
    updated_at: string
}

export type GetDepartmentsResponse = {
    departments: Department[]
}
