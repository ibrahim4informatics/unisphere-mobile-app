import { getCourseSections } from "@/services/courses";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useCourseSections(course_id: string) {

    return useInfiniteQuery({
        queryKey: ["courses", course_id, "sections"],
        queryFn: ({ pageParam }) => getCourseSections(course_id, pageParam),
        initialPageParam: 1,
        getNextPageParam: (last_page) => {
            if (!last_page.has_more) return undefined;
            return last_page.page + 1
        }
    })

}