import { getCourseDetails } from "@/services/courses";
import { useQuery } from "@tanstack/react-query";


export default function useCourseDetails(id: string) {
    return useQuery({
        queryKey: ["courses", id],
        queryFn: () => getCourseDetails(id),
        staleTime: 0
    })
}