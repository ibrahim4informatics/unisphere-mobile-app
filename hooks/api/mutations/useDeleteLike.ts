import { deleteLike } from "@/services/posts";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useDeleteLike = () => {
    return useMutation<AxiosResponse<any>, Error, number>({

        mutationFn: deleteLike
    });
}