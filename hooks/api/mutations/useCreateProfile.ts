import { createStudentProfile } from "@/services/student.services";
import { CreateStudentProfileData } from "@/types/student.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


const useCreateStudentProfile = () => {
    return useMutation<AxiosResponse<any>, Error, CreateStudentProfileData>({
        mutationFn: createStudentProfile,
    })
}

export default useCreateStudentProfile;