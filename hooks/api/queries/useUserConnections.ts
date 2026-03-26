import { getUserConnections } from "@/services/connections";
import { useInfiniteQuery } from "@tanstack/react-query";


export function useUserConnections() {
    return useInfiniteQuery(
        {
            queryKey: ["connections"],
            queryFn: (params) => getUserConnections({ page: params.pageParam }),
            initialPageParam: 1,
            getNextPageParam: (lastPage) => {
                if (!lastPage.has_more) {
                    return undefined
                }
                return lastPage.page + 1;
            },
            staleTime: 0
        }
    )
}