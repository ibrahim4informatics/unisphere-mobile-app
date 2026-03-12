import { getFeedPosts } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";

const useFeedPosts = (params: { page: number }) => {

    return useQuery({
        queryKey: ["posts", JSON.stringify(params)],
        queryFn: () => getFeedPosts(params)
    })
}

export default useFeedPosts;