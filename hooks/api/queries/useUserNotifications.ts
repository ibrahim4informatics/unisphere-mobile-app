import { getUserNotifications } from "@/services/notifications";
import { useInfiniteQuery } from "@tanstack/react-query";
export default function useUserNotifications() {
    return useInfiniteQuery({
        queryFn: ({ pageParam }) => getUserNotifications(pageParam),
        queryKey: ["user-notifications"],
        getNextPageParam: (lastPage) => {
            if (!lastPage.has_more) return undefined;
            return lastPage.page + 1
        },
        initialPageParam: 1,
        staleTime: 0
    })
}