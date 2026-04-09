import api from "@/utils/axios";


export const getUserChats = async (page: number) => {
    const response = await api.get("/api/chats", { params: { page } });
    return response.data;
}


export const getChatByUserId = async (user_id: string) => {
    const response = await api.get(`/api/chats/user/${user_id}`);
    return response.data;
}

export const createChat = async (receiver_id: string) => {
    const response = await api.post("/api/chats", { receiver_id });
    return response.data
}

export const getChatById = async (chat_id: number) => {
    const response = await api.get(`/api/chats/${chat_id}`);
    return response.data;
}