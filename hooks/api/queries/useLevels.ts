import { getLevels } from "@/services/levels";
import { GetLevelParams, GetLevelsResponse } from "@/types/levels.types";
import { useQuery, type QueryOptions } from "@tanstack/react-query";


const useLevels = (params: GetLevelParams, options?: QueryOptions<GetLevelsResponse>) => {
    return useQuery<GetLevelsResponse>({
        queryKey: ["levels", JSON.stringify(params)],
        queryFn: () => getLevels(params),
        ...options,
    });
}


export default useLevels;