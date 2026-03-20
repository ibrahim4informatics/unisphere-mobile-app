import { CreateStudentProfileData } from "@/types/student.types";
import api from "@/utils/axios";
import { AxiosResponse } from "axios";


export const createStudentProfile = async (data: CreateStudentProfileData) => {
    const response: AxiosResponse = await api.post("/api/student/profile", data);
    return response;
}


export const getAcademicStudentProfile = async () => {
    const response: AxiosResponse = await api.get("/api/student/academic-profile")
    return response.data;
}