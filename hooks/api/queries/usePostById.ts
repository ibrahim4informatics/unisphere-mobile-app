import { getPostById } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";


export const usePostById = (id: number) => {
    return useQuery
        ({
            queryKey: ["post", id],
            queryFn: () => getPostById(id),
        }
        )
}