import FormInput from "@/components/ui/FormInput";
import PasswordInput from "@/components/ui/PasswordInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { loginUser } from "@/services/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";

export const PASSWORD_RULES = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_\-+=])[A-Za-z\d@$!%*?&.#^()_\-+=]{8,}$/;

export const LoginTeachertSchema = z.object({
    email: z.email({ error: ({ input }) => !input ? "Email is required" : "Invalid email address" }),
    password: z.string({ error: "Password is required" }).min(8, { error: "Password must contains at least 8 characters" }).max(100, { error: "Password can not be that long" }).
        regex(PASSWORD_RULES, { error: "Password must include uppercase, lowercase, number, and special character" }),
})

export type LoginTeacherFields = z.infer<typeof LoginTeachertSchema>;

export default function TeacherLoginForm() {

    const { control, handleSubmit, formState: { isSubmitting, errors }, setError } = useForm({ resolver: zodResolver(LoginTeachertSchema) })

    const onSubmit: SubmitHandler<LoginTeacherFields> = async (data) => {

        try {
            const loginPromise = loginUser({ password: data.password, role: "TEACHER", email: data.email });

            const result = await loginPromise;
            if (result.status === 200) {

                await secureStore.setItemAsync("access_token", result.data.accessToken);
                await secureStore.setItemAsync("refresh_token", result.data.refreshToken);
                router.replace("/(app)/(home)")

            }


            return loginPromise;
        }

        catch (err: any) {

            setError("password", { message: "Invalid Email or password" });
            setError("email", { message: "Invalid Email or password" });
        }

    }
    return (

        <>


            <View className="gap-6">

                {/* Email */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onBlur, onChange, value } }) => (
                        <FormInput
                            keyboardType="email-address"
                            placeholder="ex: ahmed@email-univ.dz"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            label="Email"
                            required
                            error={errors.email?.message}

                        />
                    )}
                />

                {/* PASSWORD */}
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PasswordInput
                            placeholder="* * * * * * * * * *"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            label="Password"
                            requried
                            error={errors.password?.message}
                        />
                    )}
                />



                {/* LOGIN BUTTON */}
                <PrimaryButton title="Login" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />

            </View>
        </>
    )
}