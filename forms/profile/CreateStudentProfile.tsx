import PrimaryButton from "@/components/ui/PrimaryButton"
import Spacer from "@/components/ui/Spacer"
import useCreateStudentProfile from "@/hooks/api/mutations/useCreateProfile"
import useDepartments from "@/hooks/api/queries/useDepartments"
import useFaculties from "@/hooks/api/queries/useFaculties"
import useFields from "@/hooks/api/queries/useFields"
import useLevels from "@/hooks/api/queries/useLevels"
import useUniversities from "@/hooks/api/queries/useUniversities"
import useAppSelect from "@/hooks/useAppSelect"
import { router } from "expo-router"
import { useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { Dropdown } from "react-native-element-dropdown"

export default function CreateStudentProfile() {

    const user_id = useAppSelect(state => state.auth.user?.id);
    const { isLoading: isUniversitiesLoading, data: univeristiesResponse, error: universitiesError } = useUniversities({})
    const [profileData, setProfileData] = useState({
        university_id: null,
        faculty_id: null,
        department_id: null,
        field_id: null,
        level_id: null,
    })
    const { data: facultiesResponse, error: facultiesError, isLoading: isFacultiesLoading } = useFaculties({ university_id: profileData.university_id || undefined })
    const { data: departmentsResponse, error: departmentsError, isLoading: isDepartmentsLoading } = useDepartments({ faculty_id: profileData.faculty_id || undefined })
    const { data: fieldsResponse, isLoading: isFieldsLoading, error: fieldsError } = useFields({ department_id: profileData.department_id || undefined })
    const { data: levelsResponse, isLoading: isLevelsLoading, error: levelsError } = useLevels({ field_id: profileData.field_id || undefined })

    const { mutateAsync, isPending } = useCreateStudentProfile();

    const handleSubmit = async () => {

        if (
            !user_id || !profileData.department_id || !profileData.faculty_id
            || !profileData.field_id || !profileData.level_id || !profileData.university_id
        ) { 
            
            console.log(user_id)
            return }
        try {


            const response = await mutateAsync({
                user_id,
                department_id: profileData.department_id,
                faculty_id: profileData.faculty_id,
                field_id: profileData.field_id,
                level_id: profileData.level_id,
                university_id: profileData.university_id
            });

            if (response.status === 201) {

                router.replace("/(auth)/(register)/upload-avatar-screen");
            }

        }

        catch (err: any) {
            console.log(JSON.stringify(err.response))
        }
    }
    return (
        <>
            {/* This is university select */}
            <View className="mb-2">
                <Text className="text-base">University <Text className="text-red-500">*</Text></Text>
                <View className=" rounded-md border border-gray-100 my-2">

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
            </View>



            {/* Faculty Select */}

            {profileData.university_id && (
                <View className="mb-2">
                    <Text className="text-base">Faculty <Text className="text-red-500">*</Text></Text>
                    <View className=" rounded-md border border-gray-100 my-2">

                        {isFacultiesLoading || (!facultiesResponse && !facultiesError) ?
                            (<ActivityIndicator />) :
                            (
                                <Dropdown
                                    value={profileData.faculty_id || undefined}

                                    style={{
                                        padding: 12,
                                    }}

                                    placeholder="Select Faculty"

                                    renderItem={
                                        (item: any) => (
                                            <View
                                                className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${profileData.faculty_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                                }
                                            >
                                                <Text className={`${profileData.faculty_id === item.id ? "font-bold text-blue-600" : ""}`}>Faculty of {item.name}</Text>
                                            </View>)
                                    }

                                    data={facultiesResponse?.faculties || []}
                                    onChange={(item: any) => { setProfileData(prev => ({ ...prev, faculty_id: item.id })) }}
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
                </View>
            )}

            {/* Department select */}

            {profileData.faculty_id && (
                <View className="mb-2">
                    <Text className="text-base">Department <Text className="text-red-500">*</Text></Text>
                    <View className=" rounded-md border border-gray-100 my-2">

                        {isDepartmentsLoading || (!departmentsResponse && !departmentsError) ?
                            (<ActivityIndicator />) :
                            (
                                <Dropdown
                                    value={profileData.department_id || undefined}

                                    style={{
                                        padding: 12,
                                    }}

                                    placeholder="Select Department"

                                    renderItem={
                                        (item: any) => (
                                            <View
                                                className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${profileData.department_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                                }
                                            >
                                                <Text className={`${profileData.department_id === item.id ? "font-bold text-blue-600" : ""}`}>Department of {item.name}</Text>
                                            </View>)
                                    }

                                    data={departmentsResponse?.departments || []}
                                    onChange={(item: any) => { setProfileData(prev => ({ ...prev, department_id: item.id })) }}
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
                </View>
            )}




            {/* Field select */}

            {profileData.department_id && (
                <View className="mb-2">
                    <Text className="text-base">Field <Text className="text-red-500">*</Text></Text>
                    <View className=" rounded-md border border-gray-100 my-2">

                        {isFieldsLoading || (!fieldsResponse && !fieldsError) ?
                            (<ActivityIndicator />) :
                            (
                                <Dropdown
                                    value={profileData.field_id || undefined}

                                    style={{
                                        padding: 12,
                                    }}

                                    placeholder="Select Department"

                                    renderItem={
                                        (item: any) => (
                                            <View
                                                className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${profileData.field_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                                }
                                            >
                                                <Text className={`${profileData.field_id === item.id ? "font-bold text-blue-600" : ""}`}>Field of {item.name}</Text>
                                            </View>)
                                    }

                                    data={fieldsResponse?.fields || []}
                                    onChange={(item: any) => { setProfileData(prev => ({ ...prev, field_id: item.id })) }}
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
                </View>
            )}




            {/* Level select */}

            {profileData.field_id && (
                <View className="mb-2">
                    <Text className="text-base">Academic Level <Text className="text-red-500">*</Text></Text>
                    <View className=" rounded-md border border-gray-100 my-2">

                        {isLevelsLoading || (!levelsResponse && !levelsError) ?
                            (<ActivityIndicator />) :
                            (
                                <Dropdown
                                    
                                    keyboardAvoiding
                                    value={profileData.level_id || undefined}

                                    style={{
                                        padding: 12,
                                    }}

                                    placeholder="Select Level"

                                    renderItem={
                                        (item: any) => (
                                            <View
                                                className={`h-12 items-center px-2 rounded-md py-3 justify-center border-b border-gray-100
                                                
                                                ${profileData.field_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                                }
                                            >
                                                <Text className={`${profileData.field_id === item.id ? "font-bold text-blue-600" : ""}`}>{item.name}</Text>
                                            </View>)
                                    }

                                    data={levelsResponse?.levels || []}
                                    onChange={(item: any) => { setProfileData(prev => ({ ...prev, level_id: item.id })) }}
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
                </View>
            )}

            <Spacer spaceY="md" />
            <PrimaryButton title="Save" onPress={handleSubmit} loading={isPending}/>
            <Spacer spaceY="md" />
        </>
    )

}