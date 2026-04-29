
import { enrollStudentInCourse } from "@/services/enrollments";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useEnrollInCourse() {
    return useMutation<number, AxiosError, string>({
        mutationFn: enrollStudentInCourse,
    });
}