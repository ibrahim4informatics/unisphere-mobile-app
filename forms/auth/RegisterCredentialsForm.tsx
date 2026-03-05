import FormInput from "@/components/ui/FormInput";
import PasswordInput from "@/components/ui/PasswordInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Spacer from "@/components/ui/Spacer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useAppSelect from "@/hooks/useAppSelect";
import { setRegisterCredentialsData, setRegisterErrors } from "@/store/slices/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import { z } from "zod";

export const PASSWORD_RULES = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_\-+=])[A-Za-z\d@$!%*?&.#^()_\-+=]{8,}$/;

export const RegisterCredentialsSchema = z.object({
    email: z.email({ error: ({ input }) => !input ? "Email is required" : "Invalid email address" }),
    password: z.string({ error: "Password is required" }).min(8, { error: "Password must contains at least 8 characters" }).max(100, { error: "Password can not be that long" }).
        regex(PASSWORD_RULES, { error: "Password must include uppercase, lowercase, number, and special character" }),
})

export type RegisterCredentials = z.infer<typeof RegisterCredentialsSchema>;

export default function RegisterCredentialsForm() {
    const dispatch = useAppDispatch();
    const register_errors = useAppSelect(state => state.auth.register_errors);
    const register_data = useAppSelect(state => state.auth.register_data);

    const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm({
        resolver: zodResolver(RegisterCredentialsSchema), defaultValues: {
            email: register_data?.email || "", password: register_data?.password || ""
        }
    })

    const onSubmit: SubmitHandler<RegisterCredentials> = async (data) => {

        return new Promise((resolve) => {
            dispatch(setRegisterCredentialsData(data));
            router.push("/(auth)/(register)/register-personal-info")
            setTimeout(() => {
                resolve(data);
            }, 1500);
        });

    }
    return (
        <KeyboardAvoidingView className="bg-white mt-10 rounded-3xl  p-4 border border-gray-100" behavior="height" keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
            {/* Form Container */}

            {/* EMAIL FIELD */}

            <Controller
                control={control}
                name="email"
                render={({ field: { onBlur, onChange, value } }) => (
                    <FormInput required keyboardType="email-address" label="Email" onChange={(text) => {
                        dispatch(setRegisterErrors({ email: undefined }))
                        onChange(text);
                    }} onBlur={onBlur} value={value} placeholder="mohamed@mail.edu" error={errors.email?.message || register_errors?.email || undefined} />
                )}
            />

            <Spacer spaceY="sm" />

            {/* PASSWORD FIELD */}
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <PasswordInput label="Password" placeholder="* * * * * * * * * *" onChange={onChange} onBlur={onBlur} value={value} error={errors.password?.message} requried />
                )}
            />

            {/* Spacer */}
            <Spacer spaceY="md" />
            {/* CONTINUE BUTTON */}
            <PrimaryButton title="Continue" onPress={handleSubmit(onSubmit)} loading={isSubmitting} disabled={isSubmitting} />

        </KeyboardAvoidingView>
    )
}