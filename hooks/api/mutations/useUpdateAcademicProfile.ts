import { updateAcademicProfile } from "@/services/student.services";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";


type Data = {
    university_id?: string,
    faculty_id?: number,
    department_id?: number,
    field_id?: number,
    level_id?: number
}

export default function useUpdateAcademicProfile() {

    return useMutation<AxiosResponse<any>, AxiosError, Data>({
        mutationFn: updateAcademicProfile
    })
}