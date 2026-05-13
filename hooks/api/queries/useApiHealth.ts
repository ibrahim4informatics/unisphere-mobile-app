import { checkApiHealth } from "@/services/global";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useApiHealth() {
    return useQuery<number, AxiosError>({
        queryKey: ["api-health"],
        staleTime: 0,
        queryFn: checkApiHealth,
        retry:3,
        retryDelay:3000
    })
}