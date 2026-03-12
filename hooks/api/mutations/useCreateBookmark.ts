import { createBookmark } from "@/services/bookmarks";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


export const useCreateBookmark = () => {

    return useMutation<AxiosResponse<any>, Error, number>({
        mutationFn: createBookmark
    })

}