import { getUserChats } from "@/services/chats";
import { useInfiniteQuery } from "@tanstack/react-query";


export default function useUserChats() {
    return useInfiniteQuery({
        queryKey: ["chats"],
        queryFn: ({ pageParam }) => getUserChats(pageParam),
        getNextPageParam: (lastPage) => {
            if (!lastPage.has_more) return undefined
            return lastPage.page + 1
        },
        initialPageParam: 1,
        staleTime: 0
    })
}