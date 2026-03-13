import { updatePost } from "@/services/posts";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


export default function useUpdatePost() {
    return useMutation<AxiosResponse, Error, { post_id: number, data: FormData }>({
        mutationFn: updatePost
    })
}