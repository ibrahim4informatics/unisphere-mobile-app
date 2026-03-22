import { deleteAccount } from "@/services/user";
import { useMutation } from "@tanstack/react-query";


export default function useDeleteAccount() {
    return useMutation({
        mutationFn: deleteAccount
    })
}