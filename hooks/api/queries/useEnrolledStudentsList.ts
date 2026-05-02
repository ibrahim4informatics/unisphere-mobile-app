import { getStudentListEnrolledInCourse } from "@/services/courses";
import { useInfiniteQuery } from "@tanstack/react-query";


export default function useEnrolledStudentsList(course_id: string) {
    return useInfiniteQuery({
        queryKey: ["students", course_id],
        queryFn: (params) => getStudentListEnrolledInCourse(course_id, params.pageParam),
        getNextPageParam: (lastPage) => {
            if (!lastPage.has_more) return undefined
            return lastPage.page + 1
        },
        initialPageParam: 1,
        staleTime:0
    })

}