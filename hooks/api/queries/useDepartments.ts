import { getDepartments } from "@/services/departments";
import { GetDepartmentsParams, GetDepartmentsResponse } from "@/types/departments.types";
import { useQuery } from "@tanstack/react-query";


const useDepartments = (params: GetDepartmentsParams) => {

    return useQuery<GetDepartmentsResponse, Error>({
        queryKey: ["departments", JSON.stringify(params)],
        queryFn: () => getDepartments(params),
        // staleTime: 1000 * 60 * 60
    })
}

export default useDepartments;