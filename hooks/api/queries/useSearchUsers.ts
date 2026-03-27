import { searchUsers } from "@/services/user";
import { useInfiniteQuery } from "@tanstack/react-query";


export default function useSearchUsers(enabled: boolean, filters?: { role?: string, keyword?: string }) {
    return useInfiniteQuery({
        queryKey: ["search-users", JSON.stringify(filters)],
        queryFn: (params) => searchUsers({ page: params.pageParam, name: filters?.keyword, role: filters?.role }),
        getNextPageParam: (lastPage) => {
            if (!lastPage.has_more) return undefined
            return lastPage.page + 1
        },
        initialPageParam: 1,
        enabled
    })

}