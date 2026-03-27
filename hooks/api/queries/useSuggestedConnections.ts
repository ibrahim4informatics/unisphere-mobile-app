import { getUserConnectionSuggestions } from "@/services/connections";
import { useInfiniteQuery } from "@tanstack/react-query";


export default function useSuggestedConnections() {
    return useInfiniteQuery(
        {
            queryKey: ["connections-suggested"],
            queryFn: (params) => getUserConnectionSuggestions({ page: params.pageParam }),
            getNextPageParam: (lastPage) => {
                if (!lastPage.has_more) return undefined;
                return lastPage.page + 1
            },
            initialPageParam: 1,
            staleTime: 0
        }
    )
}