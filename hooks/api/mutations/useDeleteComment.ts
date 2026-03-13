import { deleteComment } from "@/services/comments";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


export const useDeleteComment = () => {

    return useMutation<AxiosResponse<any>, Error, { comment_id: number }>({
        mutationFn: deleteComment
    })

}