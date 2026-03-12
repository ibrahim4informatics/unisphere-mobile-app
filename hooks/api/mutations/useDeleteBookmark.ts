import { deleteBookmarks } from "@/services/bookmarks";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


export const useDeleteBookmark = () => {

    return useMutation<AxiosResponse<any>, Error, number>({
        mutationFn: deleteBookmarks
    })

}