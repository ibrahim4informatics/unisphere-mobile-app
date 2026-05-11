import { appendFilesToCourseSection } from "@/services/courses";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useAppendFiles() {
    return useMutation<number, AxiosError, { course_id: string, section_id: number, data: FormData }>({
        mutationFn: appendFilesToCourseSection
    })
}