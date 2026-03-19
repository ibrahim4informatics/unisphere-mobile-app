import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse, ResetPasswordPayload, ResetPasswordResponse, UpdatePasswordPayload, UpdatePasswordResponse, VerifyOtpPayload, VerifyOtpResponse } from "@/types/auth.type";
import api from "@/utils/axios";
import { AxiosResponse } from "axios";

export const registerUser = async (payload: RegisterPayload): Promise<AxiosResponse<RegisterResponse>> => {
    const response = await api.post("/api/auth/register", payload);
    return response;
};


export const loginUser = async (data: LoginPayload) => {

    if (data.role === "STUDENT") {
        const response: AxiosResponse<LoginResponse> = await api.post("/api/auth/login", { password: data.password, student_id: data.student_id });
        return { status: response.status, data: response.data }
    }

    else {

        const response: AxiosResponse<LoginResponse> =
            await api.post("/api/auth/login", { password: data.password, email: data.email });
        return { status: response.status, data: response.data }

    }


}

export const sendResetPasswordEmail = async (data: ResetPasswordPayload) => {
    const response: AxiosResponse<ResetPasswordResponse> = await api.post("/api/auth/reset", data);
    return response;
}


export const verifyOtp = async (data: VerifyOtpPayload) => {
    const response: AxiosResponse<VerifyOtpResponse> = await api.post("/api/auth/reset/verify", { otp_code: data.otp_code, user_id: data.user_id });
    return response;
}

export const updatePassword = async (data: UpdatePasswordPayload) => {
    const response: AxiosResponse<UpdatePasswordResponse> = await api.patch("/api/auth/reset", data);
    return response;
}


export const uploadIdentityCard = async (formData: FormData) => {
    const response = await api.post("/api/auth/upload-identity", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response;
}


export const logoutUser = async (refresh_token: string) => {
    const response = await api.post("/api/auth/logout", { refresh_token });
    return response.data;
}
