import { GetLevelParams, GetLevelsResponse } from "@/types/levels.types";
import api from "@/utils/axios";
import { AxiosResponse } from "axios";


export const getLevels = async (params: GetLevelParams) => {
    const response: AxiosResponse<GetLevelsResponse> = await api.get("/api/levels", { params });
    return response.data;
}