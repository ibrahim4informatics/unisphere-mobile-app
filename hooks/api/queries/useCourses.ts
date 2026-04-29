import { getCourses } from "@/services/courses";
import { useInfiniteQuery } from "@tanstack/react-query";


export default function useCourses(search: string) {
    return useInfiniteQuery({
        queryKey: ["courses", search],
        queryFn: ({ pageParam }) => getCourses({ name: search, page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.has_more) return undefined;
            return lastPage.page + 1;
        }
    })
}