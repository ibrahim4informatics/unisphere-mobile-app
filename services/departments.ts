import { GetDepartmentsParams, GetDepartmentsResponse } from "@/types/departments.types";
import api from "@/utils/axios";
import { AxiosResponse } from "axios";

export const getDepartments = async (params: GetDepartmentsParams) => {
    const response:AxiosResponse<GetDepartmentsResponse> = await api.get("/api/departments", { params });
    return response.data;
}