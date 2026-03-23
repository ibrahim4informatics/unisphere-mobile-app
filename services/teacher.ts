import { CreateTeacherProfileData } from "@/types/teacher.types";
import api from "@/utils/axios";

export const createTacherProfile = async (data: CreateTeacherProfileData) => {
    const response = await api.post("/api/teacher", data);
    return response;
}

export const updateTeacherProfile = async (data: Partial<CreateTeacherProfileData>) => {
    const response = await api.patch("/api/teacher", data);
    return response;
}

export const getTeacherProfile = async () => {
    const response = await api.get("/api/teacher");
    return response.data;
}