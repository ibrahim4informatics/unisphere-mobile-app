import { logoutUser } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export default function useSigneOut() {

    return useMutation<AxiosResponse, AxiosError, string>({
        mutationFn: logoutUser
    })
}