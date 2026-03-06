import { GetFacultiesParams } from "@/types/faculties.types";
import api from "@/utils/axios";

const getFaculties = async (params: GetFacultiesParams) => {
    const response = await api.get("/api/faculty", { params });
    return response.data;
}

export { getFaculties };
