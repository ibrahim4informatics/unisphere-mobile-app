import { registerUser } from "@/services/authServices";
import { RegisterPayload, RegisterResponse } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useRegister = () => {
    return useMutation<AxiosResponse<RegisterResponse>, Error, RegisterPayload>(
        {
            mutationFn: registerUser
        }
    )
}