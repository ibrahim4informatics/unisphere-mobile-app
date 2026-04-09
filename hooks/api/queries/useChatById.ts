import { getChatById } from "@/services/chats";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useChatById(chat_id: number) {
    return useQuery<any, AxiosError>({
        queryKey: ["chat", chat_id],
        queryFn: () => getChatById(chat_id),
        staleTime: 0
    })
} 