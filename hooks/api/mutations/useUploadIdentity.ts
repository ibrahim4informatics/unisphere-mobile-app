import { uploadIdentityCard } from "@/services/authServices"
import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

const useUploadIdentity = () => {

    return useMutation<AxiosResponse<any>, Error, FormData>({
        mutationFn: uploadIdentityCard
    })
}

export default useUploadIdentity;