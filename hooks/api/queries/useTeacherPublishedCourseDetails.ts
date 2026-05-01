import { getTeacherPublishedCourseDetails } from "@/services/courses";
import { useQuery } from "@tanstack/react-query";


export default function useTeacherPublishedCourseDetails(course_id: string) {
    return useQuery({
        queryKey: ["courses", "teacher", "my-courses", course_id],
        queryFn: () => getTeacherPublishedCourseDetails(course_id),
        staleTime: 0
    })
}