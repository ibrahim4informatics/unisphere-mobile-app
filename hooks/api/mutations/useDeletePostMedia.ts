import { deleteMedia } from "@/services/posts";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useDeletePostMedia = () => {
    return useMutation<AxiosResponse<any>, Error, number>({

        mutationFn: deleteMedia
    });
}