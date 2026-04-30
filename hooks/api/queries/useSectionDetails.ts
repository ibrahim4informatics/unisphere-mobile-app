import { getSectionDetails } from "@/services/courses";
import { useQuery } from "@tanstack/react-query";



export default function useSectionDetails(course_id: string, section_id: string) {
    return useQuery({
        queryFn: () => getSectionDetails(course_id, section_id),
        queryKey: ["sections", course_id, section_id],
    })
}