import { getOwnPosts } from "@/services/posts";
import { useInfiniteQuery } from "@tanstack/react-query";


export default function useMyPosts() {

    return useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["my-posts"],
        getNextPageParam: (lastPage: any) => {
            if (!lastPage.has_more) return undefined;
            return lastPage.page + 1;
        },
        queryFn: (params) => {
            return getOwnPosts({ page: params.pageParam })
        },

        staleTime:0
    })

}