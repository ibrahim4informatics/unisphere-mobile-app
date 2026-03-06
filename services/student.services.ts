import { CreateStudentProfileData } from "@/types/student.types";
import api from "@/utils/axios";
import { AxiosResponse } from "axios";


export const createStudentProfile = async (data: CreateStudentProfileData) => {
    const response: AxiosResponse = await api.post("/api/student/profile", data);
    return response;
}


