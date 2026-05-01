import { getModules } from "@/services/modules";
import { useQuery } from "@tanstack/react-query";


export default function useModules(params: { field_id?: number, level_id?: string, code?: string, name?: string }) {
    return useQuery({
        queryKey: ["modules"],
        queryFn: () => getModules(params)
    });
}