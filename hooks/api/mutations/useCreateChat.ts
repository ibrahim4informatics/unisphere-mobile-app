import { createChat } from "@/services/chats";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useCreateChat() {
    return useMutation<any, AxiosError, string>({
        mutationFn: createChat
    })
}