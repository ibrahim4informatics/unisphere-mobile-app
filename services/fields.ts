import { GetFieldsParams, GetFieldsResponse } from "@/types/fields.types";
import api from "@/utils/axios";
import { AxiosResponse } from "axios";


const getFields = async (params: GetFieldsParams) => {
    const response:AxiosResponse<GetFieldsResponse> = await api.get("/api/fields", { params });
    return response.data;
}

export { getFields };
