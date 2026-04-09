import FormInput from "@/components/ui/FormInput";
import PasswordInput from "@/components/ui/PasswordInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { loginUser } from "@/services/authServices";
import { connectSocket } from "@/services/socket";
import { setAuth } from "@/store/slices/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
    View
} from "react-native";
import { z } from "zod";

export const PASSWORD_RULES =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_\-+=])[A-Za-z\d@$!%*?&.#^()_\-+=]{8,}$/;

export const LoginStudentSchema = z.object({
    student_id: z
        .string({ error: "Student id is required" })
        .regex(/^\d+$/, { error: "Student id must contain only numbers" })
        .length(12, { error: "Student id must contain exactly 12 digits" }),
    password: z
        .string({ error: "Password is required" })
        .min(8, { error: "Password must contain at least 8 characters" })
        .max(100)
        .regex(PASSWORD_RULES, {
            error:
                "Password must include uppercase, lowercase, number and special character",
        }),
});

export type LoginStudentFields = z.infer<typeof LoginStudentSchema>;

export default function StudentLoginForm() {
    const dispatch = useAppDispatch();
    const {
        control,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<LoginStudentFields>({
        resolver: zodResolver(LoginStudentSchema),
    });


    const onSubmit: SubmitHandler<LoginStudentFields> = async (data) => {
        try {
            const loginPromise = loginUser({ password: data.password, role: "STUDENT", student_id: data.student_id });

            const result = await loginPromise;
            if (result.status === 200) {

                await secureStore.setItemAsync("access_token", result.data.accessToken);
                await secureStore.setItemAsync("refresh_token", result.data.refreshToken);
                connectSocket(result.data.accessToken)
                dispatch(setAuth(true));
                router.replace("/(app)/(home)");
            }


            return loginPromise;
        }

        catch (err: any) {
            setError("password", { message: "Invalid ID or password" });
            setError("student_id", { message: "Invalid ID or password" });
        }
    };

    return (
        <>



            <View className="gap-6">

                {/* STUDENT ID */}
                <Controller
                    control={control}
                    name="student_id"
                    render={({ field: { onBlur, onChange, value } }) => (
                        <FormInput
                            keyboardType="number-pad"
                            maxLength={12}
                            label="Student ID"
                            placeholder="ex: 202345698787"
                            onBlur={onBlur}
                            error={errors.student_id?.message}
                            required
                            onChange={onChange}
                            value={value}
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
                            label="Password"
                            requried
                            onChange={onChange}
                            onBlur={onBlur}
                            error={errors.password?.message}
                            value={value}
                        />
                    )}
                />

                {/* LOGIN BUTTON */}
                <PrimaryButton title="Login" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />

            </View>


        </>
    );
}