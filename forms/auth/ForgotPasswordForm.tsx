import FormInput from "@/components/ui/FormInput"
import PrimaryButton from "@/components/ui/PrimaryButton"
import Spacer from "@/components/ui/Spacer"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import useAppSelect from "@/hooks/useAppSelect"
import { sendResetPasswordEmail } from "@/services/authServices"
import { setForgotId, setForgotPasswordEmail } from "@/store/slices/authSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
    email: z.email({ error: ({ input }) => !input ? "Email is required" : "Invalid email" })
})


export type ForgotPasswordFormFields = z.infer<typeof schema>

export default function ForgotPasswordForm() {
    const forgotEmail = useAppSelect(state => state.auth.forgot_email)
    const {
        control, handleSubmit, formState: { errors, isSubmitting }, setError
    } = useForm({ resolver: zodResolver(schema), defaultValues: { email: forgotEmail || "" } })


    const dispatch = useAppDispatch()
    const onSubmit: SubmitHandler<ForgotPasswordFormFields> = async (data) => {

        dispatch(setForgotPasswordEmail(data.email));
        try {

            const response = await sendResetPasswordEmail({ email: data.email });
            if (response.status === 200) {
                dispatch(setForgotId(response.data.user_id));
                router.replace("/(auth)/(forgot-password)/verify-otp-screen");
            }

        }

        catch (err: any) {
            console.log(err);
            if (err.response.status === 400) setError("email", { message: "Email is not valid" });
            else {
                setError("email", { message: "Uncaught error try again later" });
            }

        }



    }
    return <>


        <Controller
            name="email"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
                <FormInput
                    onChange={onChange} onBlur={onBlur} placeholder="eg:ahmed@univ-oran.edu"
                    label="Email" error={errors.email?.message} keyboardType="email-address"
                    required value={value}
                />
            )}
        />

        <Spacer spaceY="md" />
        <PrimaryButton title="Send Code" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />


    </>
}