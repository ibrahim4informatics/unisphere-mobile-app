import { getCurrentUserProfile } from "@/services/user";
import { QueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const useCurrentProfile = (options?: QueryOptions<AxiosResponse<any>, Error>) => {
    return useQuery<AxiosResponse<any>, Error>({
        queryKey: ["profile"],
        queryFn: ()=>getCurrentUserProfile(),
        ...options
    })
}

export default useCurrentProfile;