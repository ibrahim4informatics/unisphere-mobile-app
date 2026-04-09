import { getChatMessages } from "@/services/messages";
import { useInfiniteQuery } from "@tanstack/react-query";


export function useChatMessages(chat_id: number) {
    return useInfiniteQuery({
        queryKey: ["chat-messages", chat_id],
        queryFn: ({ pageParam }) => getChatMessages(chat_id, pageParam),
        initialPageParam: 1,
        getNextPageParam: (last_page) => {
            if (!last_page.has_more) return undefined;
            return last_page.page + 1;
        },
        staleTime: 0
    })
}