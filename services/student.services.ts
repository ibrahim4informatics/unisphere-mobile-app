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

export const updateAcademicProfile = async (data: {
    university_id?: string,
    faculty_id?: number,
    department_id?: number,
    field_id?: number,
    level_id?: number
}) => {
    const response = await api.patch("/api/student/profile", data);
    return response.data;
}