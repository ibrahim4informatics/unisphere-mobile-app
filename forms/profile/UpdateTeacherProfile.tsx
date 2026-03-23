import FormInput from "@/components/ui/FormInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Spacer from "@/components/ui/Spacer";
import useUpdateTeacherProfile from "@/hooks/api/mutations/useUpdateTeacherProfile";
import useUniversities from "@/hooks/api/queries/useUniversities";
import useAppSelect from "@/hooks/useAppSelect";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { z } from "zod";



const schema = z.object({
    university_of_study: z.string({ error: "This field is required" }),
    field_of_study: z.string({ error: "This field is required" }),
    specialization: z.string({ error: "This field is required" }),
    phone_number: z
        .string()
        .optional()
        .refine(val => !val || val.length === 10, {
            message: "field need to be of length 10",
        })
        .refine(val => !val || /^\d+$/.test(val), {
            message: "Phone number must contain only digits",
        })
})

export type UpdateTeacherFormFields = z.infer<typeof schema>;

type Props = {
    phone_number?: string,
    university_of_study: string,
    field_of_study: string,
    specialization: string,
    university_id: string,
    academic_title: string,

}
export default function UpdateTeacherProfile(

    {
        phone_number,
        university_of_study,
        field_of_study,
        specialization,
        university_id,
        academic_title,

    }: Props
) {

    const { control, formState: { errors, isSubmitting }, handleSubmit } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { field_of_study, specialization, phone_number, university_of_study }
    });


    const user_id = useAppSelect(state => state.auth.user?.id);
    const [profileData, setProfileData] = useState({
        university_id: university_id || null,
        academic_title: academic_title || "NONE",
    })

    const academicTitles = [
        { label: "Assistant", value: "ASSISTANT" },
        { label: "Lecturer", value: "LECTURER" },
        { label: "Professor", value: "PROFESSOR" },
        { label: "Doctor", value: "DOCTOR" },
        { label: "Researcher", value: "RESEARCHER" },
        { label: "None", value: "NONE" },
    ]
    const { isLoading: isUniversitiesLoading, data: univeristiesResponse, error: universitiesError } = useUniversities({})
    const [university_id_error, setUniversityIDError] = useState("");
    const { mutateAsync } = useUpdateTeacherProfile();
    const onSubmit: SubmitHandler<UpdateTeacherFormFields> = async (data) => {

        if (isSubmitting) return;
        try {

            if (!profileData.university_id) {
                setUniversityIDError("University id is required");
                return
            }
            if (!user_id) return;

            // the update endpoint is the same as the create endpoint so we can use the same hook
             await mutateAsync({
                academic_title: profileData.academic_title,
                field_of_study: data.field_of_study,
                university_of_study: data.university_of_study,
                specialization: data.specialization,
                university_id: profileData.university_id,
                phone_number: data.phone_number,
            });

            router.back();
            return;

        }

        catch (err: any) {
            Alert.alert("Error", "An error occurred while updating your profile. Please try again later.");
            console.log(err);
        }
    }

    return (
        <KeyboardAwareScrollView enableAutomaticScroll enableOnAndroid extraHeight={60}>
            {/* This is university select */}
            <View className="mb-2">
                <Text className="text-base">University <Text className="text-red-500">*</Text></Text>
                <View className={`rounded-md border  my-2 ${university_id_error ? "border-red-500 bg-red-100 " : "border-gray-100 bg-white"}`}>

                    {isUniversitiesLoading || (!univeristiesResponse && !universitiesError) ?
                        (<ActivityIndicator />) :
                        (
                            <Dropdown

                                value={profileData.university_id || undefined}

                                style={{
                                    padding: 12,
                                }}

                                placeholder="Select University"

                                renderItem={
                                    (item: any) => (
                                        <View
                                            className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${profileData.university_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                            }
                                        >
                                            <Text className={`${profileData.university_id === item.id ? "font-bold text-blue-600" : ""}`}>University of {item.name}</Text>
                                        </View>)
                                }

                                data={univeristiesResponse?.universities || []}
                                onChange={(item: any) => { setProfileData(prev => ({ ...prev, university_id: item.id })) }}
                                labelField={"name"}
                                valueField={"id"}
                                containerStyle={{
                                    borderRadius: 8,
                                    padding: 12,
                                    elevation: 3
                                }}

                                showsVerticalScrollIndicator={false}
                            />
                        )

                    }

                </View>


                {university_id_error && (
                    <View className="flex-row items-center gap-2">
                        <Feather name="alert-circle" size={14} color="#EF4444" />
                        <Text className="text-red-500 text-xs">{university_id_error}</Text>
                    </View>

                )}


            </View>




            {/* academic title select */}
            <View className="mb-2">
                <Text className="text-base">Academic Title <Text className="text-red-500">*</Text></Text>
                <View className=" rounded-md  border border-gray-100 my-2 bg-white">


                    <Dropdown
                        value={profileData.academic_title || undefined}

                        style={{
                            padding: 12,
                        }}

                        placeholder="Select Academic Title"

                        renderItem={
                            (item: any) => (
                                <View
                                    className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${profileData.academic_title === item.value ? "bg-blue-100 " : ""}
                                                `
                                    }
                                >
                                    <Text className={`${profileData.academic_title === item.value ? "font-bold text-blue-600" : ""}`}>{item.label}</Text>
                                </View>)
                        }

                        data={academicTitles || []}
                        onChange={(item: any) => { setProfileData(prev => ({ ...prev, academic_title: item.value })) }}
                        labelField={"label"}
                        valueField={"value"}
                        containerStyle={{
                            borderRadius: 8,
                            padding: 12,
                            elevation: 3
                        }}

                        showsVerticalScrollIndicator={false}
                    />
                </View>


            </View>


            <Controller
                control={control}
                name="phone_number"
                render={({ field: { onBlur, onChange, value } }) => (<FormInput maxLength={10} placeholder="Eg:0659878451" label="Phone Number" onChange={onChange} onBlur={onBlur} value={value} error={errors.phone_number?.message} keyboardType="number-pad" />)}
            />
            <Spacer spaceY="md" />

            <Controller
                control={control}
                name="university_of_study"
                render={({ field: { onBlur, onChange, value } }) => (<FormInput placeholder="Eg:Ahmed Ben Bella" label="University Of Study" required onChange={onChange} onBlur={onBlur} value={value} error={errors.university_of_study?.message} />)}
            />
            <Spacer spaceY="md" />

            <Controller
                control={control}
                name="field_of_study"
                render={({ field: { onBlur, onChange, value } }) => (<FormInput placeholder="Eg:Ai optimizations" label="Field Of Study" required onChange={onChange} onBlur={onBlur} value={value} error={errors.field_of_study?.message} />)}
            />



            <Spacer spaceY="md" />

            <Controller
                control={control}
                name="specialization"
                render={({ field: { onBlur, onChange, value } }) => (<FormInput placeholder="Eg:Machine Learning" label="Specialization" required onChange={onChange} onBlur={onBlur} value={value} error={errors.specialization?.message} />)}
            />

            <Spacer spaceY="md" />

            <PrimaryButton onPress={handleSubmit(onSubmit)} title="Save" loading={isSubmitting} />

        </KeyboardAwareScrollView>
    );
}