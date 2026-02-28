import FormInput from "@/components/ui/FormInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Spacer from "@/components/ui/Spacer";
import TextArea from "@/components/ui/TextArea";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useAppSelect from "@/hooks/useAppSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";


export const RegisterPersonalDataSchema = z.object({
    first_name: z.string({ error: "the first name is required" }).min(2, { error: "first name must be at least 2 characters " }).max(35, { error: "first name maximum lenght exceeded" }),
    last_name: z.string({ error: "the first name is required" }).min(2, { error: "first name must be at least 2 characters " }).max(35, { error: "first name maximum lenght exceeded" }),
    bio: z.string().max(500).optional(),
    student_id: z.string().regex(/\d+/).length(12).optional(),
    role: z.enum(["STUDENT", "TEACHER"]).default("STUDENT")

}).superRefine(({ student_id, role }, context) => {

    if (role === "STUDENT" && !student_id) context.addIssue({ code: "custom", path: ["student_id"], message: "Student id is required for student registration" })
    else if (role === "TEACHER" && student_id) context.addIssue({ code: "custom", path: ["student_id"], message: "Student id is not aviable for teacher registration" })
})

export type RegisterCredentials = z.infer<typeof RegisterPersonalDataSchema>;

export default function RegisterPersonalDataForm() {
    const dispatch = useAppDispatch();
    const register_data = useAppSelect(state=>state.auth.register_data);

    useEffect(()=>{
        if(!register_data || !register_data.email || !register_data.password ) router.back();
    })

    const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm({ resolver: zodResolver(RegisterPersonalDataSchema) })

    const onSubmit: SubmitHandler<RegisterCredentials> = async (data) => {

        console.log("first")

    }
    return (
        < View className="mt-10 bg-white rounded-2xl p-6 border-[0.5px] border-gray-200" >


            <Controller
                control={control}
                name="first_name"
                render={({ field: { onBlur, onChange, value } }) => <FormInput
                    keyboardType="default"
                    placeholder="ex: Amir"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="First Name"
                    required
                    error={errors.first_name?.message}
                />}

            />

            <Spacer spaceY="sm" />



            <Controller
                control={control}
                name="last_name"
                render={({ field: { onBlur, onChange, value } }) => <FormInput
                    keyboardType="default"
                    placeholder="ex: Belabdella"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    label="Last Name"
                    required
                    error={errors.last_name?.message}
                />}

            />


            <Spacer spaceY="sm" />



            <Controller
                control={control}
                name="bio"
                render={({ field: { onBlur, onChange, value } }) => <TextArea

                    label="Bio"
                    onChangeText={onChange}
                    value={value || ""}
                    error={errors.bio?.message}
                    maxLength={500}
                    placeholder="Tell us about your self"
                />
                }

            />





            <Spacer spaceY="md" />
            {/* LOGIN BUTTON */}
            <PrimaryButton title="Register Now!" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />
            
        </View >

    )
}