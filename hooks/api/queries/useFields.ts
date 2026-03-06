import { getFields } from "@/services/fields"
import { GetFieldsParams, GetFieldsResponse } from "@/types/fields.types"
import { QueryOptions, useQuery } from "@tanstack/react-query"


const useFields = (params: GetFieldsParams, options?: QueryOptions<GetFieldsResponse, Error>) => {

    return useQuery<GetFieldsResponse, Error>({
        queryKey: ["fields", JSON.stringify(params)],
        queryFn: async () => getFields(params),
        ...options
    })
}

export default useFields;