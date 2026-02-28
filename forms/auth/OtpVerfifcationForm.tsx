import OtpTextInput from "@/components/ui/OtpTextInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import Spacer from "@/components/ui/Spacer";
import useAppSelect from "@/hooks/useAppSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text } from "react-native";
import { z } from "zod";

const shcema = z.object({
    otp_code: z.string({ error: "Otp code is Required" }).length(6, { error: "Otp is 6 digit" }).regex(/\d+/, { error: "Otp contains only digits" })
})

export type VerifyOtpFormFields = z.infer<typeof shcema>;


export default function VerifyOtpForm() {
    const user_id = useAppSelect(state=>state.auth.forgot_id);

    const { control, formState: { errors, isSubmitting }, handleSubmit } = useForm({ resolver: zodResolver(shcema) });

    const onSubmit: SubmitHandler<VerifyOtpFormFields> = async (data) => {

        console.log({...data, user_id});
        router.replace("/(auth)/(forgot-password)/reset-password-screen")
    }

    const resendOtpHandler = () => {
        console.log("redend code")
    }


    return (
        <>


            <Controller
                control={control}
                name="otp_code"
                render={({ field: { onChange, onBlur, value } }) => (
                    <OtpTextInput
                        label="Verification Code"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        pinCount={6}
                        size="small"
                        required
                    />
                )}
            />
            <Text className="text-base text-gray-400 mt-1">Check your email inbox
                for the verification code.

            </Text>

            <Spacer spaceY="md" />


            <PrimaryButton title="Verify" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />
            <Spacer spaceY="md" />

            <Text className="text-base text-gray-400 my-1">
                 Didn't receive the code?
                
            </Text>

            <SecondaryButton onPress={resendOtpHandler} title="Send Again" />
        </>
    )
}