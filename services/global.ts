import api from "@/utils/axios";

export const checkApiHealth = async () => {
    const response = await api.get("/api/health");
    return response.status;
}