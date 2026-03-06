import { uploadUserAvatar } from "@/services/user"
import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

const useUploadAvatar = () => {

    return useMutation<AxiosResponse<any>, Error, FormData>({
        mutationFn: uploadUserAvatar,
    })
}

export default useUploadAvatar;