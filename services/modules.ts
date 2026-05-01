import api from "@/utils/axios";

export const getModules = async (params: { field_id?: number, level_id?: string, code?: string, name?: string }) => {

    const response = await api.get("/api/modules", { params });
    return response.data;
}