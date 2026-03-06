import { useQuery } from "@tanstack/react-query";

import { getFaculties } from "@/services/faculties";
import { GetFacultiesParams, GetFacultiesResponse } from "@/types/faculties.types";


const useFaculties = (params: GetFacultiesParams) => {

    return useQuery<GetFacultiesResponse, Error>({
        queryKey: ["faculties", JSON.stringify(params)],
        queryFn: () => getFaculties(params),
        // staleTime: 1000 * 60 * 60
    });
}


export default useFaculties;