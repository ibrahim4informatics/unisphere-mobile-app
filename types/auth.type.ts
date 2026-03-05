import { User } from "./User";

export interface RegisterPayload {
    email: string;
    password: string;
    first_name?: string | undefined;
    last_name?: string | undefined;
    bio?: string | null
    role?: "STUDENT" | "TEACHER" | undefined;
    student_id?: string | null | undefined;
}
export interface RegisterResponse {
    message: string,
    user: User
}


export interface LoginPayload {
    email?: string,
    student_id?: string,
    role: "STUDENT" | "TEACHER"
    password: string
}

export interface LoginResponse {
    accessToken: string
    refreshToken: string
}


export interface ResetPasswordPayload {
    email: string
}
export interface ResetPasswordResponse {
    user_id: string
}


export interface VerifyOtpPayload {
    otp_code: string,
    user_id: string
}

export interface VerifyOtpResponse {
    verified: boolean,
    reset_token: string
}


export interface UpdatePasswordPayload {
    new_password: string,
    reset_token: string

}

export interface UpdatePasswordResponse {
    password_changed: boolean
}