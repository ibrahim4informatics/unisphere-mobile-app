import Colors from "@/constants/Colors";
import useAcademicTeacherProfile from "@/hooks/api/queries/useAcademicTeacherProfile";
import useDepartments from "@/hooks/api/queries/useDepartments";
import useFaculties from "@/hooks/api/queries/useFaculties";
import useFields from "@/hooks/api/queries/useFields";
import useModules from "@/hooks/api/queries/useModules";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { z } from "zod";


export const schema = z.object({

    name: z.string({ error: ({ input }) => !input ? "Course name is required" : "Course name must be string" })
        .min(3).max(255),
    code: z.string({ error: ({ input }) => !input ? "Course name is required" : "Course name must be string" })
        .min(2).max(10),
    description: z.string({ error: ({ input }) => !input ? "Course name is required" : "Course name must be string" })
        .min(3).max(255),
    module_id: z.number(),
    status: z.enum([
        "DRAFT",
        "PENDING"]).default("DRAFT"),
    faculty_id: z.number(),
    field_id: z.number(),
})

type FormData = z.infer<typeof schema>;

export default function CreateCourseForm() {



    const [department, setDepartment] = useState<number | null>(null);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            code: "",
            description: "",
            module_id: undefined,
            faculty_id: undefined,
            field_id: undefined,
            status: "DRAFT"
        }
    });


    const { data: teacherData, isPending: loadingTeacherData } = useAcademicTeacherProfile("TEACHER");
    const { data: facultiesResponse, error: facultiesError, isLoading: isFacultiesLoading } = useFaculties({ university_id: teacherData?.profile.university_id || undefined })
    const { data: departmentsResponse, error: departmentsError, isLoading: isDepartmentsLoading } = useDepartments({ faculty_id: watch("faculty_id") || undefined })
    const { data: fieldsResponse, isLoading: isFieldsLoading, error: fieldsError } = useFields({ department_id: department || undefined })
    const { data: modulesResponse, isLoading: isModulesLoading, error: modulesError } = useModules({ field_id: watch("field_id") });
    const onSubmit = (data: FormData) => {
        console.log("Validated Data:", data);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            <View className="gap-6 pb-24">

                {/* Name */}
                <View>
                    <Text className="text-xs text-gray-400 font-semibold mb-2">
                        Course Name
                    </Text>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Enter course name"
                                className="bg-white rounded-2xl px-4 py-4 border border-gray-200 text-base"
                            />
                        )}
                    />
                    {errors.name && (
                        <Text className="text-red-500 text-xs mt-1">
                            {errors.name.message}
                        </Text>
                    )}
                </View>

                {/* Code */}
                <View>
                    <Text className="text-xs text-gray-400 font-semibold mb-2">
                        Course Code
                    </Text>

                    <Controller
                        control={control}
                        name="code"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="RDB"
                                className="bg-white rounded-2xl px-4 py-4 border border-gray-200 text-base"
                            />
                        )}
                    />
                    {errors.code && (
                        <Text className="text-red-500 text-xs mt-1">
                            {errors.code.message}
                        </Text>
                    )}
                </View>

                {/* Description */}
                <View>
                    <Text className="text-xs text-gray-400 font-semibold mb-2">
                        Description
                    </Text>

                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Describe your course..."
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                                className="bg-white rounded-2xl px-4 py-4 border border-gray-200 text-base"
                            />
                        )}
                    />
                    {errors.description && (
                        <Text className="text-red-500 text-xs mt-1">
                            {errors.description.message}
                        </Text>
                    )}
                </View>

                {/* 
                Modules Faculties .. todo
             */}

                {/* Faculty */}

                {loadingTeacherData || isFacultiesLoading ? <View className="py-2 items-center justify-center"><ActivityIndicator size={"small"} color={Colors.blue[500]} /></View> : (

                    <>
                        {/* label */}
                        <Text className="text-xs text-gray-400 font-semibold">
                            Faculty
                        </Text>
                        <Dropdown
                            value={watch("faculty_id")}
                            placeholderStyle={{
                                color: Colors.gray[500],
                                fontSize: 16
                            }}

                            style={{
                                padding: 12,
                                backgroundColor: "#fff",
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: Colors.gray[100]
                            }}

                            placeholder="Select Faculty"

                            renderItem={
                                (item: any) => (
                                    <View
                                        className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${item.id === watch("faculty_id") ? "bg-blue-200" : ""}`
                                        }
                                    >
                                        <Text className={`${item.id === watch("faculty_id") ? "text-blue-600" : ""}`} >{item.name}</Text>
                                    </View>)
                            }

                            data={facultiesResponse?.faculties || []}
                            onChange={(item) => { setValue("faculty_id", item.id) }}
                            labelField={"name"}
                            valueField={"id"}
                            containerStyle={{
                                borderRadius: 8,
                                padding: 12,
                                elevation: 3
                            }}

                            showsVerticalScrollIndicator={false}
                        />
                    </>

                )}


                {loadingTeacherData || isFacultiesLoading || isDepartmentsLoading ? <View className="py-2 items-center justify-center"><ActivityIndicator size={"small"} color={Colors.blue[500]} /></View> : (

                    <>
                        {/* label */}
                        <Text className="text-xs text-gray-400 font-semibold">
                            Deparetment
                        </Text>
                        <Dropdown
                            value={department}
                            placeholderStyle={{
                                color: Colors.gray[500],
                                fontSize: 16
                            }}

                            style={{
                                padding: 12,
                                backgroundColor: "#fff",
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: Colors.gray[100]
                            }}

                            placeholder="Select Department"

                            renderItem={
                                (item: any) => (
                                    <View
                                        className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${item.id === watch("faculty_id") ? "bg-blue-200" : ""}`
                                        }
                                    >
                                        <Text className={`${item.id === watch("faculty_id") ? "text-blue-600" : ""}`} >{item.name}</Text>
                                    </View>)
                            }

                            data={departmentsResponse?.departments || []}
                            onChange={(item) => { setDepartment(item.id) }}
                            labelField={"name"}
                            valueField={"id"}
                            containerStyle={{
                                borderRadius: 8,
                                padding: 12,
                                elevation: 3
                            }}

                            showsVerticalScrollIndicator={false}
                        />
                    </>

                )}

                {loadingTeacherData || isFacultiesLoading || isDepartmentsLoading || isFieldsLoading ? <View className="py-2 items-center justify-center"><ActivityIndicator size={"small"} color={Colors.blue[500]} /></View> : (

                    <>
                        {/* label */}
                        <Text className="text-xs text-gray-400 font-semibold">
                            Field
                        </Text>
                        <Dropdown
                            value={watch("field_id")}
                            placeholderStyle={{
                                color: Colors.gray[500],
                                fontSize: 16
                            }}

                            style={{
                                padding: 12,
                                backgroundColor: "#fff",
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: Colors.gray[100]
                            }}

                            placeholder="Select Field"

                            renderItem={
                                (item: any) => (
                                    <View
                                        className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${item.id === watch("faculty_id") ? "bg-blue-200" : ""}`
                                        }
                                    >
                                        <Text className={`${item.id === watch("faculty_id") ? "text-blue-600" : ""}`} >{item.name}</Text>
                                    </View>)
                            }

                            data={fieldsResponse?.fields || []}
                            onChange={(item) => { setValue("field_id", item.id) }}
                            labelField={"name"}
                            valueField={"id"}
                            containerStyle={{
                                borderRadius: 8,
                                padding: 12,
                                elevation: 3
                            }}

                            showsVerticalScrollIndicator={false}
                        />
                    </>

                )}




                       {loadingTeacherData || isFacultiesLoading || isDepartmentsLoading || isFieldsLoading ? <View className="py-2 items-center justify-center"><ActivityIndicator size={"small"} color={Colors.blue[500]} /></View> : (

                    <>
                        {/* label */}
                        <Text className="text-xs text-gray-400 font-semibold">
                            Module
                        </Text>
                        <Dropdown
                            value={watch("module_id")}
                            placeholderStyle={{
                                color: Colors.gray[500],
                                fontSize: 16
                            }}

                            style={{
                                padding: 12,
                                backgroundColor: "#fff",
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: Colors.gray[100]
                            }}

                            placeholder="Select Module"

                            renderItem={
                                (item: any) => (
                                    <View
                                        className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${item.id === watch("module_id") ? "bg-blue-200" : ""}`
                                        }
                                    >
                                        <Text className={`${item.id === watch("module_id") ? "text-blue-600" : ""}`} >{item.name}</Text>
                                    </View>)
                            }

                            data={modulesResponse?.modules || []}
                            onChange={(item) => { setValue("module_id", item.id) }}
                            labelField={"name"}
                            valueField={"id"}
                            containerStyle={{
                                borderRadius: 8,
                                padding: 12,
                                elevation: 3
                            }}

                            showsVerticalScrollIndicator={false}
                        />
                    </>

                )}


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
                >
                    <Feather name="check-circle" size={20} color={Colors.white} />
                    <Text className="text-white font-bold text-base">
                        Create Course
                    </Text>
                </TouchableOpacity>

            </View>

            <Text> { watch("field_id") }</Text>

        </ScrollView>
    );
}