import api from "@/utils/axios";


export const getUserChats = async (page: number) => {
    const response = await api.get("/api/chats", { params: { page } });
    return response.data;
}