import { getUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";


export default function useGetUser(id: string) {
    return useQuery<any, AxiosError>({
        queryKey: ["user", id],
        queryFn: () => getUser(id)
    })
}