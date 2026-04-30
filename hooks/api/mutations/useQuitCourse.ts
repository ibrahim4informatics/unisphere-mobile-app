import { leaveCourse } from "@/services/enrollments";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useQuitCourse() {
    return useMutation<number, AxiosError, string>({
        mutationFn: leaveCourse
    })
}