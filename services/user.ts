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
    const response:AxiosResponse<any> = await api.get("/api/user/me");
    return response;
}
