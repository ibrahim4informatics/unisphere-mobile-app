import FormInput from "@/components/ui/FormInput";
import PasswordInput from "@/components/ui/PasswordInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
    const {
        control,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<LoginStudentFields>({
        resolver: zodResolver(LoginStudentSchema),
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit: SubmitHandler<LoginStudentFields> = async (data) => {
        console.log(data);
        return new Promise((resolve) =>
            setTimeout(() => resolve(data), 1500)
        );
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
                    <PrimaryButton title="Login" onPress={handleSubmit(onSubmit)} loading={isSubmitting}  />

                </View>
            

        </>
    );
}