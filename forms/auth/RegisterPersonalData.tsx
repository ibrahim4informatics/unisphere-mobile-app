import FormInput from "@/components/ui/FormInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Spacer from "@/components/ui/Spacer";
import TextArea from "@/components/ui/TextArea";
import { useRegister } from "@/hooks/api/mutations/useRegister";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useAppSelect from "@/hooks/useAppSelect";
import { clearRegisterData, setRegisterErrors, setRegisterPersonalData, setUser } from "@/store/slices/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";


export const RegisterPersonalDataSchema = z.object({
    first_name: z.string({ error: "the first name is required" }).min(2, { error: "first name must be at least 2 characters " }).max(35, { error: "first name maximum lenght exceeded" }),
    last_name: z.string({ error: "the first name is required" }).min(2, { error: "first name must be at least 2 characters " }).max(35, { error: "first name maximum lenght exceeded" }),
    bio: z.string().max(50, { error: "Bio should be less than 500 char" }).transform(val => val === "" ? undefined : val).optional(),
    student_id: z.string()
        .transform((val) => (val === "" ? undefined : val))
        .refine((val) => !val || /^\d+$/.test(val), {
            message: "Student ID must contain only numbers"
        })
        .refine((val) => !val || val.length === 12, {
            message: "Student ID must be 12 digits"
        })
        .optional(),
    role: z.enum(["STUDENT", "TEACHER"]).default("STUDENT")

}).superRefine(({ student_id, role }, context) => {

    if (role === "STUDENT" && !student_id) context.addIssue({ code: "custom", path: ["student_id"], message: "Student id is required for student registration" })
    else if (role === "TEACHER" && student_id) context.addIssue({ code: "custom", path: ["student_id"], message: "Student id is not aviable for teacher registration" })
})

export type RegisterCredentials = z.infer<typeof RegisterPersonalDataSchema>;

export default function RegisterPersonalDataForm() {
    const dispatch = useAppDispatch();
    const register_data = useAppSelect(state => state.auth.register_data);
    const register_errors = useAppSelect(state => state.auth.register_errors);

    const { mutateAsync } = useRegister();

    useEffect(() => {
        if (!register_data || !register_data.email || !register_data.password) router.back();
    }, [])

    const { control, handleSubmit, formState: { isSubmitting, errors }, setValue, watch, setError } = useForm({
        resolver: zodResolver(RegisterPersonalDataSchema),
        defaultValues: {
            student_id: register_data && register_data.student_id || "",
            bio: register_data && register_data.bio || "",
            first_name: register_data && register_data.first_name || "",
            last_name: register_data && register_data.last_name || "",
            role: register_data && register_data.role || "STUDENT"
        }
    })

    const role = watch("role") || "STUDENT";
    const onSubmit: SubmitHandler<RegisterCredentials> = async (data) => {
        if (!register_data.email || !register_data.password) return router.replace("/(auth)/(register)");

        dispatch(setRegisterPersonalData(data))



        try {

            const registerPromise = mutateAsync({
                email: register_data.email,
                password: register_data.password,
                first_name: data.first_name,
                last_name: data.last_name,
                bio: data.bio,
                role: data.role,
                student_id: data.role === "STUDENT" ? data.student_id : undefined
            });

            const response = await registerPromise;
            if (response.status === 201) {
                dispatch(clearRegisterData())
                dispatch(setUser(response.data.user));
                router.push("/(auth)/(register)/profile-setup-screen");
            }
            return registerPromise;
        }

        catch (err: any) {
            if (err.response.status === 400) {

                if (err.response.data.message === "the email is taken") {
                    dispatch(setRegisterErrors({ email: "The email is already used" }))
                    router.push("/(auth)/(register)")
                }
                if (err.response.data.message === "the student exist") {
                    setError("student_id", { message: "This student ID already exists" })
                }

            }
        }


    }
    return (
        < View className="mt-10 bg-white rounded-2xl p-6 border-[0.5px] border-gray-200" >

            <Text className="text-sm font-semibold text-gray-700">Register As <Text className="text-red-500">*</Text></Text>
            <View className="mt-1 bg-gray-100 p-1 rounded-2xl flex-row">
                <TouchableOpacity
                    onPress={() => setValue("role", "STUDENT")}
                    activeOpacity={0.9}
                    className={`flex-1 py-3 rounded-xl items-center ${role === "STUDENT"
                        ? "bg-white elevation-sm"
                        : ""
                        }`}
                >
                    <Text
                        className={`${role === "STUDENT"
                            ? "text-blue-600 font-semibold"
                            : "text-gray-500"
                            }`}
                    >
                        Student
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setValue("role", "TEACHER"), dispatch(setRegisterPersonalData({
                            first_name: register_data?.first_name || "", last_name: register_data?.last_name || "",
                            role: register_data?.role || 'STUDENT',
                            bio: register_data?.bio || undefined,
                            student_id: undefined,
                        }))
                    }}
                    activeOpacity={0.9}
                    className={`flex-1 py-3 rounded-xl items-center ${role === "TEACHER"
                        ? "bg-white elevation-sm"
                        : ""
                        }`}
                >
                    <Text
                        className={`${role === "TEACHER"
                            ? "text-blue-600 font-semibold"
                            : "text-gray-500"
                            }`}
                    >
                        Teacher
                    </Text>
                </TouchableOpacity>
            </View>


            {role === "STUDENT" && (
                <>

                    <Spacer spaceY="md" />


                    <Controller
                        control={control}
                        name="student_id"
                        render={({ field: { onBlur, onChange, value } }) => <FormInput
                            keyboardType="number-pad"
                            placeholder="ex: 202045987845"
                            onBlur={onBlur}
                            onChange={(text) => {
                                dispatch(setRegisterErrors({ student_id: undefined }));
                                onChange(text)
                            }}
                            value={value}
                            maxLength={12}
                            label="Student ID"
                            required
                            error={errors.student_id?.message || register_errors?.student_id || undefined}
                        />}

                    />
                </>
            )}


            <Spacer spaceY="md" />


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
                    onBlur={onBlur}
                    value={value || ""}
                    error={errors.bio?.message}
                    maxLength={500}
                    placeholder="Tell us about your self"
                />
                }

            />



            {/* LOGIN BUTTON */}
            <PrimaryButton title="Register" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />

        </View >

    )
}