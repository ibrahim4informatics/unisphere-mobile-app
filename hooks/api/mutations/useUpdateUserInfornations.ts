import { updateUserInformations } from "@/services/user";
import { useMutation } from "@tanstack/react-query";


export default function useUpdateUserInformations() {
    return useMutation<number, Error, { first_name?: string, last_name?: string, bio?: string }>({
        mutationFn: updateUserInformations
    })
}