import { getFeedPosts } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";

const useFeedPosts = (params: { page: number }) => {

    return useQuery({
        queryKey: ["posts", JSON.stringify(params)],
        queryFn: () => getFeedPosts(params),
        staleTime: 0, // always stale
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true
    })
}

export default useFeedPosts;