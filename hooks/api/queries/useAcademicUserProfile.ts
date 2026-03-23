import { getAcademicStudentProfile } from "@/services/student.services";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";


type Response = {
    profile: {
        univeristy_id: string,
        field_id: number,
        department_id: number,
        faculty_id: number,
        level_id: number
    }
}

export default function useAcademicUserProfile(role: string, options?: UseQueryOptions<Response, AxiosError>) {

    return useQuery<Response, AxiosError>({
        queryKey: ["academic-profile"],
        queryFn: getAcademicStudentProfile,
        staleTime: 0,
        enabled: role === "STUDENT" ? true : false,
        ...options
    })
}