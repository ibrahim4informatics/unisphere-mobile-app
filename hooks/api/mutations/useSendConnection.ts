import { sendConnectionReqeuest } from "@/services/connections";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useSendConnetion() {
    return useMutation<any, AxiosError, string>({
        mutationFn: sendConnectionReqeuest
    })
}