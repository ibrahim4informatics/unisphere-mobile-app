import { acceptConnectionRequest } from "@/services/connections";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useAcceptConnetion() {
    return useMutation<any, AxiosError, number>({
        mutationFn: acceptConnectionRequest
    })
}