import { CreateTeacherProfileData } from "@/types/teacher.types";
import api from "@/utils/axios";

export const createTacherProfile = async (data: CreateTeacherProfileData) => {
    const response = await api.post("/api/teacher", data);
    return response;
}