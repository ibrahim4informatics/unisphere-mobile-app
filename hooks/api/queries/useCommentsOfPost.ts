import { getCommentsByPost } from "@/services/comments";
import { useQuery } from "@tanstack/react-query";

export const useCommentsOfPost = (post_id: number) => {
    return useQuery({
        queryFn: () => getCommentsByPost({ post_id }),
        queryKey: ["comments", post_id]
    })
}