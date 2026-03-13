import { getPostById } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";


export const usePostById = (id: number) => {
    return useQuery
        ({
            queryKey: ["post", id],
            queryFn: () => getPostById(id),
            staleTime: 0, // always stale
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            refetchOnMount:true
        }
        )
}