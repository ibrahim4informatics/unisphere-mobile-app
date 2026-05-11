import FormInput from "@/components/ui/FormInput";
import TextArea from "@/components/ui/TextArea";
import Colors from "@/constants/Colors";
import useTeacherPublishedCourseDetails from "@/hooks/api/queries/useTeacherPublishedCourseDetails";
import { updateCourse } from "@/services/courses";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";


export const schema = z.object({

    name: z.string({ error: ({ input }) => !input ? "Course name is required" : "Course name must be string" })
        .min(3).max(255),
    code: z.string({ error: ({ input }) => !input ? "Course name is required" : "Course name must be string" })
        .min(2).max(10),
    description: z.string({ error: ({ input }) => !input ? "Course name is required" : "Course name must be string" })
        .min(3).max(255),

    status: z.enum([
        "DRAFT",
        "PENDING"]).default("DRAFT"),

})

type FormData = z.infer<typeof schema>;

export default function UpdateCourseForm({ course_id }: { course_id: string }) {

    const { data, isPending, error } = useTeacherPublishedCourseDetails(course_id);
    const queryClient = useQueryClient();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            code: "",
            description: "",
            status: "PENDING"
        }
    });

    useEffect(()=>{
        console.log(course_id)
        if(data){
            reset({
                name:data.course.name,
                code:data.course.code,
                description:data.course.description
            })
        }
    }, [data, reset])
    const onSubmit = async (data: FormData) => {

        console.log(data)
        try {
            await updateCourse(course_id, data);
            queryClient.invalidateQueries({ queryKey: ["courses", "teacher", "my-courses", course_id] })
            queryClient.invalidateQueries({ queryKey: ["courses", "teacher", "my-courses"], exact: false })
            router.back();
        }

        catch (err) {
            console.log(err);
        }
    };

    if (isPending) {
        return <View className="flex-1 items-center justify-center">
            <ActivityIndicator size={"large"} color={Colors.blue[500]} />
        </View>
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            <View className="gap-6 pb-24">

                {/* Name */}


                <Controller
                    control={control}
                    name="name"

                    render={({ field: { onChange, value } }) => (
                        <FormInput
                            value={value}
                            label="Course Name"
                            required
                            error={errors.name?.message}

                            onChange={onChange}
                            placeholder="Enter course name"
                        />
                    )}
                />


                {/* Code */}


                <Controller
                    control={control}
                    name="code"
                    render={({ field: { onChange, value } }) => (
                        <FormInput
                            value={value}
                            onChange={onChange}
                            placeholder="RDB"
                            label="Course Code"
                            required
                            error={errors.code?.message}
                        />
                    )}
                />

                {/* Description */}


                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value, onBlur } }) => (
                        <TextArea
                            label="Course Description"
                            required
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                            placeholder="Describe your course..."
                            error={errors.description?.message}
                            numberOfLines={4}
                        />
                    )}
                />

                {/* Status Toggle */}
                <View>
                    <Text className="text-xs text-gray-400 font-semibold mb-3">
                        Status
                    </Text>

                    <Controller
                        control={control}
                        name="status"
                        render={({ field: { onChange, value } }) => (
                            <View className="flex-row gap-3">
                                {["DRAFT", "PENDING"].map((status) => (
                                    <TouchableOpacity
                                        key={status}
                                        onPress={() => onChange(status)}
                                        className={`flex-1 py-3 rounded-2xl border ${value === status
                                            ? "bg-blue-500 border-blue-500"
                                            : "bg-white border-gray-200"
                                            }`}
                                    >
                                        <Text
                                            className={`text-center font-semibold ${value === status
                                                ? "text-white"
                                                : "text-gray-600"
                                                }`}
                                        >
                                            {status}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    />
                </View>

                {/* Submit */}
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    className="bg-blue-500 py-4 rounded-2xl items-center mt-4 shadow-sm flex-row justify-center gap-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <ActivityIndicator size={"small"} color={"#FFF"} /> :
                        <>
                            <Feather name="save" size={20} color={Colors.white} />
                            <Text className="text-white font-bold text-base">
                                Save Course
                            </Text>
                        </>}
                </TouchableOpacity>



                {/* Cancel */}
                <TouchableOpacity
                    onPress={() => { router.back() }}
                    className="bg-white py-4 border border-gray-200 rounded-2xl items-center shadow-sm flex-row justify-center gap-2"                >

                    <Text className="text-red-600 font-bold text-base">
                        Cancel
                    </Text>

                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}