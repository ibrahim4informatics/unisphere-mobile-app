export type TeacherPrfile = {
    university_id: string,
    academic_title: string,
    phone_number?: string,
    id: number,
    university_of_study: string,
    field_of_study: string,
    specialization: string,
    leading_department_id?: number,
    univeristy_id: string,
    user_id: string,
    updated_at: string,
    created_at: string

}


export type CreateTeacherProfileData = Omit<TeacherPrfile, "id" | "leading_department_id" | "created_at" | "updated_at" | "univeristy_id">