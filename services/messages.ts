import api from "@/utils/axios";

export const getChatMessages = async (chat_id: number, page: number) => {
    const response = await api.get(`/api/messages/chat/${chat_id}`, {
        params: {
            page
        }
    });
    return response.data;
}