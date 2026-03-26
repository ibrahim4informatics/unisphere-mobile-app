import { getUserConnectionsRequests } from "@/services/connections";
import { useInfiniteQuery } from "@tanstack/react-query";


export function useConnectionsRequests() {
    return useInfiniteQuery(
        {
            queryKey: ["connections-requests"],
            queryFn: (params) => getUserConnectionsRequests({ page: params.pageParam }),
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