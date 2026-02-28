export type User = {

    id: string,
    first_name: string,
    last_name: string,
    bio?: string,
    avatar_url?: string,
    email: string,
    role: "STUDENT" | "TEACHER",
    status: "PENDING" | "CONFIRMED"
    onboarding_completed: boolean,
    student_id?: string,
}
