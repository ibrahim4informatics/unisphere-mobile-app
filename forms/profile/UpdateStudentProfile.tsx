import PrimaryButton from "@/components/ui/PrimaryButton";
import Spacer from "@/components/ui/Spacer";
import Colors from "@/constants/Colors";
import useUpdateAcademicProfile from "@/hooks/api/mutations/useUpdateAcademicProfile";
import useDepartments from "@/hooks/api/queries/useDepartments";
import useFaculties from "@/hooks/api/queries/useFaculties";
import useFields from "@/hooks/api/queries/useFields";
import useLevels from "@/hooks/api/queries/useLevels";
import useUniversities from "@/hooks/api/queries/useUniversities";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type Props = {
    university_id: string,
    faculty_id: number,
    department_id: number,
    field_id: number,
    level_id: number
}

export default function UpdateStudentProfile({
    department_id, faculty_id, field_id, level_id, university_id
}: Props) {
    const [academicProfileData, setAcademicProfileData] = useState<{ department_id?: number, faculty_id?: number, field_id?: number, level_id?: number, university_id?: string }>
        ({ department_id, faculty_id, field_id, level_id, university_id });

    const { mutateAsync, isPending, error } = useUpdateAcademicProfile();
    const [academicProfileErrors, setAcademicProfileErrors] = useState({
        university_id: "",
        faculty_id: "",
        department_id: "",
        field_id: "",
        level_id: ""
    });


    const { isLoading: isUniversitiesLoading, data: univeristiesResponse, error: universitiesError } = useUniversities({})
    const { data: facultiesResponse, error: facultiesError, isLoading: isFacultiesLoading } = useFaculties({ university_id: academicProfileData.university_id });
    const { data: departmentsResponse, error: departmentsError, isLoading: isDepartmentsLoading } = useDepartments({ faculty_id: academicProfileData.faculty_id });
    const { data: fieldsResponse, isLoading: isFieldsLoading, error: fieldsError } = useFields({ department_id: academicProfileData.department_id });
    const { data: levelsResponse, isLoading: isLevelsLoading, error: levelsError } = useLevels({ field_id: academicProfileData.field_id });




    const handleSave = async () => {

        const { department_id, faculty_id, field_id, level_id, university_id } = academicProfileData;

        if (!university_id) setAcademicProfileErrors(prev => ({ ...prev, university_id: "Choose university." }))
        if (!faculty_id) setAcademicProfileErrors(prev => ({ ...prev, university_id: "Choose faculty." }))
        if (!department_id) setAcademicProfileErrors(prev => ({ ...prev, university_id: "Choose department." }))
        if (!field_id) setAcademicProfileErrors(prev => ({ ...prev, university_id: "Choose field." }))
        if (!level_id) setAcademicProfileErrors(prev => ({ ...prev, university_id: "Choose level." }))
        try {
            await mutateAsync({ department_id, faculty_id, field_id, level_id, university_id });
            router.back();
        }
        catch (err) {
            Alert.alert("Operation Failed", "Can not update profile for now!");
        }
    }


    return (
        <ScrollView className="bg-white p-4 rounded-2xl">
            {/* University */}
            <View>

                <Text className="text-base text-black font-bold mb-2">University<Text className="text-red-600">*</Text></Text>

                <Dropdown
                    value={academicProfileData.university_id}


                    style={{
                        padding: 16,
                        borderRadius: 12,
                        borderColor: Colors.gray[50],
                        borderWidth: 1,
                        elevation: 3,
                        backgroundColor: Colors.white
                    }}

                    placeholder="University"

                    renderItem={
                        (item: any) => (
                            <View
                                className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${academicProfileData.university_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                }
                            >
                                <Text className={`${academicProfileData.university_id === item.id ? "font-bold text-blue-600" : ""}`}>{item.name}</Text>
                            </View>)
                    }
                    // autoScroll={false}
                    data={univeristiesResponse?.universities || []}
                    onChange={(item: any) => { setAcademicProfileData({ department_id: undefined, faculty_id: undefined, field_id: undefined, level_id: undefined, university_id: item.id }) }}
                    labelField={"name"}
                    valueField={"id"}
                    containerStyle={{
                        borderRadius: 8,
                        padding: 12,
                        elevation: 3
                    }}


                    showsVerticalScrollIndicator={false}

                />
            </View>


            <Spacer spaceY="md" />
            {/* Faculty */}
            <View>

                <Text className="text-base text-black font-bold mb-2">Faculty<Text className="text-red-600">*</Text></Text>

                <Dropdown
                    value={academicProfileData.faculty_id}


                    style={{
                        padding: 16,
                        borderRadius: 12,
                        borderColor: Colors.gray[50],
                        borderWidth: 1,
                        elevation: 3,
                        backgroundColor: Colors.white
                    }}

                    placeholder="Faculty"

                    renderItem={
                        (item: any) => (
                            <View
                                className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${academicProfileData.faculty_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                }
                            >
                                <Text className={`${academicProfileData.faculty_id === item.id ? "font-bold text-blue-600" : ""}`}>{item.name}</Text>
                            </View>)
                    }

                    data={facultiesResponse?.faculties || []}
                    onChange={(item: any) => {
                        setAcademicProfileData(prev => ({
                            university_id: prev.university_id,
                            faculty_id: item.id,
                            department_id: undefined,
                            field_id: undefined,
                            level_id: undefined
                        }))
                    }}
                    labelField={"name"}
                    valueField={"id"}
                    containerStyle={{
                        borderRadius: 8,
                        padding: 12,
                        elevation: 3
                    }}

                    showsVerticalScrollIndicator={false}
                />
            </View>

            <Spacer spaceY="md" />

            {/* Department */}
            <View>

                <Text className="text-base text-black font-bold mb-2">Department<Text className="text-red-600">*</Text></Text>

                <Dropdown
                    value={academicProfileData.department_id || undefined}


                    style={{
                        padding: 16,
                        borderRadius: 12,
                        borderColor: Colors.gray[50],
                        borderWidth: 1,
                        elevation: 3,
                        backgroundColor: Colors.white
                    }}

                    placeholder="Department"

                    renderItem={
                        (item: any) => (
                            <View
                                className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${academicProfileData.department_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                }
                            >
                                <Text className={`${academicProfileData.department_id === item.id ? "font-bold text-blue-600" : ""}`}>{item.name}</Text>
                            </View>)
                    }

                    data={departmentsResponse?.departments || []}
                    onChange={(item: any) => {

                        setAcademicProfileData(prev => ({
                            university_id: prev.university_id,
                            faculty_id: prev.faculty_id,
                            department_id: item.id,
                            field_id: undefined,
                            level_id: undefined
                        }))
                    }}
                    labelField={"name"}
                    valueField={"id"}
                    containerStyle={{
                        borderRadius: 8,
                        padding: 12,
                        elevation: 3
                    }}

                    showsVerticalScrollIndicator={false}
                />
            </View>

            <Spacer spaceY="md" />


            {/* Field */}
            <View>

                <Text className="text-base text-black font-bold mb-2">Field<Text className="text-red-600">*</Text></Text>

                <Dropdown
                    value={academicProfileData.field_id || undefined}
                    style={{
                        padding: 16,
                        borderRadius: 12,
                        borderColor: Colors.gray[50],
                        borderWidth: 1,
                        elevation: 3,
                        backgroundColor: Colors.white
                    }}

                    placeholder="Field"

                    renderItem={
                        (item: any) => (
                            <View
                                className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${academicProfileData.field_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                }
                            >
                                <Text className={`${academicProfileData.field_id === item.id ? "font-bold text-blue-600" : ""}`}>{item.name}</Text>
                            </View>)
                    }

                    data={fieldsResponse?.fields || []}
                    onChange={(item: any) => {
                        console.log(item.id);
                        setAcademicProfileData(prev => ({
                            university_id: prev.university_id,
                            faculty_id: prev.faculty_id,
                            department_id: prev.department_id,
                            field_id: item.id,
                            level_id: undefined
                        }))
                    }}
                    labelField={"name"}
                    valueField={"id"}
                    containerStyle={{
                        borderRadius: 8,
                        padding: 12,
                        elevation: 3
                    }}

                    showsVerticalScrollIndicator={false}
                />
            </View>

            <Spacer spaceY="md" />

            {/* Level */}
            <View>

                <Text className="text-base text-black font-bold mb-2">Level<Text className="text-red-600">*</Text></Text>

                <Dropdown
                    value={academicProfileData.level_id || undefined}


                    style={{
                        padding: 16,
                        borderRadius: 12,
                        borderColor: Colors.gray[50],
                        borderWidth: 1,
                        elevation: 3,
                        backgroundColor: Colors.white
                    }}

                    placeholder="Level"

                    renderItem={
                        (item: any) => (
                            <View
                                className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${academicProfileData.level_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                }
                            >
                                <Text className={`${academicProfileData.level_id === item.id ? "font-bold text-blue-600" : ""}`}>{item.name}</Text>
                            </View>)
                    }

                    data={levelsResponse?.levels || []}
                    onChange={(item: any) => {
                        console.log(item.id);
                        setAcademicProfileData(prev => ({
                            university_id: prev.university_id,
                            faculty_id: prev.faculty_id,
                            department_id: prev.department_id,
                            field_id: prev.field_id,
                            level_id: item.id
                        }))
                    }}
                    labelField={"name"}
                    valueField={"id"}
                    containerStyle={{
                        borderRadius: 8,
                        padding: 12,
                        elevation: 3
                    }}

                    showsVerticalScrollIndicator={false}
                />
            </View>

            <Spacer spaceY="md" />
            <PrimaryButton
                title="Save" onPress={handleSave}
                disabled={
                    !academicProfileData.university_id || !academicProfileData.faculty_id || !academicProfileData.department_id
                    || !academicProfileData.field_id || !academicProfileData.level_id
                }

                loading={isPending}
            />


        </ScrollView>
    )
}