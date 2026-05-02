import { deletePublishedCourse } from "@/services/courses";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useDeleteCourse() {
    return useMutation<number, AxiosError, string>({
        mutationFn: deletePublishedCourse
    })
}