import { createLike } from "@/services/posts";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useCreateLike = () => {
    return useMutation<AxiosResponse<any>, Error, number>({

        mutationFn: createLike
    });
}