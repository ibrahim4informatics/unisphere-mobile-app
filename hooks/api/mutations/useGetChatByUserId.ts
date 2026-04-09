import { getChatByUserId } from "@/services/chats";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useGetChatByUserId() {
    return useMutation<any, AxiosError, string>({
        mutationFn: getChatByUserId
    })
}