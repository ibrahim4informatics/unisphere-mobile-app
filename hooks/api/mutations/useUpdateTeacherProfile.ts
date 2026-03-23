import { updateTeacherProfile } from "@/services/teacher";
import { CreateTeacherProfileData } from "@/types/teacher.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export default function useUpdateTeacherProfile() {
    return useMutation<AxiosResponse, AxiosError, Partial<CreateTeacherProfileData>>({
        mutationKey: ["update-teacher-profile"],
        mutationFn: updateTeacherProfile,
    }
    )
}
