import { updateComments } from "@/services/comments";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


export const useUpdateComment = () => {
    return useMutation<AxiosResponse, Error, { content: string, comment_id: number }>({
        mutationFn: updateComments
    })
}