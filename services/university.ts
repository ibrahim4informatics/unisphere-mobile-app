import { GetUniveristiesParams, GetUniversitiesResponse } from "@/types/universities.type";
import api from "@/utils/axios";
import { AxiosResponse } from "axios";

export const getUniversities = async (params: GetUniveristiesParams) =>{
    const response:AxiosResponse<GetUniversitiesResponse> = await api.get("/api/university", { params });
    return response.data;
}