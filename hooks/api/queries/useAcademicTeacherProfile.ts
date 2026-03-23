import { getTeacherProfile } from "@/services/teacher";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useAcademicTeacherProfile(role: string, options?: UseQueryOptions<{ profile: any }, AxiosError>) {
    return useQuery<{ profile: any }, AxiosError>({
        queryKey: ["teacher-profile"],
        queryFn: getTeacherProfile,
        staleTime: 0,
        enabled: role === "TEACHER" ? true : false,
        ...options
    })
}