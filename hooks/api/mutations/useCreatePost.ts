import { createPost } from "@/services/posts";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


export const useCreatePost = () => {
    return useMutation<AxiosResponse<any>, Error, FormData>({
        mutationFn: createPost,
    })
}