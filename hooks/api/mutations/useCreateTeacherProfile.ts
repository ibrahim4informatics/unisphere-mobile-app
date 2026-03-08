import { createTacherProfile } from "@/services/teacher";
import { CreateTeacherProfileData } from "@/types/teacher.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export default function useCreateTeacherProfile() {
    return useMutation<AxiosResponse<any>, Error, CreateTeacherProfileData>({
        mutationFn: createTacherProfile
    })
}
