import { createComment } from "@/services/comments";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


export const useCreateComment = () => {
    return useMutation<AxiosResponse, Error, { post_id: number, content: string }>({
        mutationFn: createComment
    })
}