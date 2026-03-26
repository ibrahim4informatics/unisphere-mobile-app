import { unConnect } from "@/services/connections";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useUnConnect() {
    return useMutation<any, AxiosError, number>({
        mutationFn: unConnect
    })
}