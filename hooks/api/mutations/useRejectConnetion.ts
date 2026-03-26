import { rejectConnectionRequest } from "@/services/connections";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useRejectConnetion() {
    return useMutation<any, AxiosError, number>({
        mutationFn: rejectConnectionRequest
    })
}