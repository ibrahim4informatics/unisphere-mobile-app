import { getTeacherPublishedCourses } from "@/services/courses";
import { useInfiniteQuery } from "@tanstack/react-query";
export default function useTeacherPublishedCourses(filters: { status?: string, name?: string }) {
    return useInfiniteQuery({
        queryKey: ["courses", "teacher", "my-courses", JSON.stringify(filters)],
        queryFn: ({ pageParam }) => getTeacherPublishedCourses({ page: pageParam, ...filters }),
        initialPageParam: 1,
        getNextPageParam: (last_page: any) => {
            if (!last_page.has_more) return undefined;
            return last_page.page + 1
        },

        staleTime: 0
    })
}