import api from "@/utils/axios";
import { AxiosResponse } from "axios";

export const uploadUserAvatar = async (formData: FormData) => {
    const response: AxiosResponse = await api.post("/api/user/avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response;
}

export const getCurrentUserProfile = async () => {
    const response: AxiosResponse<any> = await api.get("/api/user/me");
    return response;
}


export const updateEmail = async (new_email: string) => {
    const response = await api.patch("/api/user/email", { new_email });
    return response.data
}

export const updatePassword = async (data: { current_password: string, new_password: string }) => {

    const response = await api.patch("/api/user/password", data);
    return response.data;
}

export const updateUserAvatar = async (data: FormData) => {

    const response = await api.patch("/api/user/avatar", data, { headers: { "Content-Type": "multipart/form-data" } });
    return response.status
}

export const updateUserInformations = async (data: { first_name?: string, last_name?: string, bio?: string }) => {
    const response = await api.patch("/api/user", data);
    return response.status;
}


export const deleteAccount = async () => {
    const response = await api.delete("/api/user");
    return response.status;
}


export const searchUsers = async (params: { page?: number, role?: string, name?: string }) => {
    const response = await api.get("/api/user", { params: { page: params.page, name: params.name, role: params.role === "ALL" ? undefined : params.role } });
    return response.data;
}