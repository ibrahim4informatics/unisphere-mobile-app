import PasswordInput from "@/components/ui/PasswordInput"
import PrimaryButton from "@/components/ui/PrimaryButton"
import Spacer from "@/components/ui/Spacer"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import useAppSelect from "@/hooks/useAppSelect"
import { updatePassword } from "@/services/authServices"
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"


export const PASSWORD_RULES = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_\-+=])[A-Za-z\d@$!%*?&.#^()_\-+=]{8,}$/;
const schema = z.object({
    new_password: z.string({ error: "Password is required" }).min(8, { error: "Password must contains at least 8 characters" }).max(100, { error: "Password can not be that long" }).
        regex(PASSWORD_RULES, { error: "Password must include uppercase, lowercase, number, and special character" }),
    confirm: z.string({ error: "Conifrm password is required" })
}).superRefine(({ new_password, confirm }, ctx) => {
    if (new_password !== confirm) ctx.addIssue({ code: "custom", message: "Password doesn't match", path: ["confirm"] })
})


export type ResetPasswordFormFields = z.infer<typeof schema>

export default function ResetPasswordForm() {

    const { control, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({ resolver: zodResolver(schema) })
    const dispatch = useAppDispatch();
    const reset_token = useAppSelect(state => state.auth.reset_token);
    const onSubmit: SubmitHandler<ResetPasswordFormFields> = async (data) => {

        if (!reset_token) {
            router.replace("/(auth)/(forgot-password)");
        }

        else {

            try {

                const response = await updatePassword({ new_password: data.new_password, reset_token });
                if (response.status === 200) {
                    router.replace("/(auth)/login-screen");
                    return
                }
            }

            catch (err: any) {

                if (err.response.status === 403) {
                    router.replace("/(auth)/(forgot-password)");
                    return;
                }

                else if (err.response.status === 400) {
                    setError("new_password", { message: "Invalid Password" })
                }
            }

        }

    }

    return <>


        <Controller
            name="new_password"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
                <PasswordInput
                    onChange={onChange} onBlur={onBlur} placeholder="* * * * * * * * * *"
                    label="New Password" error={errors.new_password?.message}
                    requried value={value}
                />
            )}
        />

        <Spacer spaceY="md" />


        <Controller
            name="confirm"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
                <PasswordInput
                    onChange={onChange} onBlur={onBlur} placeholder="* * * * * * * * * *"
                    label="Confirm" error={errors.confirm?.message}
                    requried value={value}
                />
            )}
        />

        <Spacer spaceY="md" />
        <PrimaryButton title="Save" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />


    </>
}