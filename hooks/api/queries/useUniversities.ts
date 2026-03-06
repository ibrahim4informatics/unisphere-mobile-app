import { getUniversities } from "@/services/university";
import { GetUniveristiesParams, GetUniversitiesResponse } from "@/types/universities.type";
import { useQuery } from "@tanstack/react-query";


const useUniversities = (params: GetUniveristiesParams) => {
    return useQuery<GetUniversitiesResponse, Error>({
        queryKey: ["universities", JSON.stringify(params)],
        queryFn: ()=> getUniversities(params),
        // staleTime: 1000 * 60 * 60
    })

}

export default useUniversities;