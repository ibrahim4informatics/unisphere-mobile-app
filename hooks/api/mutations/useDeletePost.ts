import { deletePostById } from "@/services/posts";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


export const useDeletePostById = () => {

    return useMutation<AxiosResponse<any>, Error, number>({
        mutationFn: deletePostById
    })

}