import { deleteCourseSection } from "@/services/courses";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useDeleteCourseSection() {
    return useMutation<number, AxiosError, { course_id: string, section_id: number }>({
        mutationFn: deleteCourseSection
    })
}