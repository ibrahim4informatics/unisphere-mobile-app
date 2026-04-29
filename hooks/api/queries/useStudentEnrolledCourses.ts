import { getStudentEnrolledCourses } from "@/services/enrollments";
import { useInfiniteQuery } from "@tanstack/react-query";


export default function useStudentEnrolledCourses() {
    return useInfiniteQuery({
        queryKey: ["enrolled-courses"],
        queryFn: ({ pageParam }) => getStudentEnrolledCourses({ page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.has_more) return undefined;
            return lastPage.page + 1;
        }

        ,
        staleTime: 0
    })
}