import { deleteCourseMaterial } from "@/services/courses";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useDeleteMaterial() {
    return useMutation<number, AxiosError, { course_id: string, material_id: string }>({
        mutationFn: deleteCourseMaterial
    })
}