import { getCurrentUserProfile } from "@/services/user";
import { QueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const useCurrentProfile = (options?: QueryOptions<AxiosResponse<any>,  AxiosError>) => {
    return useQuery<AxiosResponse<any>, AxiosError>({
        queryKey: ["profile"],
        queryFn: () => getCurrentUserProfile(),
        ...options,
        staleTime: 0,
        retry: false,

    })
}

export default useCurrentProfile;