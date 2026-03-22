import { updateUserAvatar } from "@/services/user";
import { useMutation } from "@tanstack/react-query";


export default function useUpdateUserAvatar() {
    return useMutation<number, Error, FormData>({
        mutationFn: updateUserAvatar
    })
}