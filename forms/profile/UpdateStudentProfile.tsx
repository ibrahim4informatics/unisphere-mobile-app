import PrimaryButton from "@/components/ui/PrimaryButton";
import Spacer from "@/components/ui/Spacer";
import Colors from "@/constants/Colors";
import useAcademicUserProfile from "@/hooks/api/queries/useAcademicUserProfile";
import useDepartments from "@/hooks/api/queries/useDepartments";
import useFaculties from "@/hooks/api/queries/useFaculties";
import useFields from "@/hooks/api/queries/useFields";
import useLevels from "@/hooks/api/queries/useLevels";
import useUniversities from "@/hooks/api/queries/useUniversities";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function UpdateStudentProfile() {

    const { data: profileResponse, isPending: profileLoading, error } = useAcademicUserProfile();

    const { isLoading: isUniversitiesLoading, data: univeristiesResponse, error: universitiesError } = useUniversities({})
    const { data: facultiesResponse, error: facultiesError, isLoading: isFacultiesLoading } = useFaculties({ university_id: profileResponse?.profile.univeristy_id || undefined })
    const { data: departmentsResponse, error: departmentsError, isLoading: isDepartmentsLoading } = useDepartments({ faculty_id: profileResponse?.profile.faculty_id || undefined })
    const { data: fieldsResponse, isLoading: isFieldsLoading, error: fieldsError } = useFields({ department_id: profileResponse?.profile.department_id || undefined })
    const { data: levelsResponse, isLoading: isLevelsLoading, error: levelsError } = useLevels({ field_id: profileResponse?.profile.field_id || undefined })


    if (profileLoading) return <View className="flex-1 items-center justify-center"><ActivityIndicator size={"large"} color={Colors.blue[500]} /></View>
    return (
        <ScrollView className="bg-white p-4 rounded-2xl">
            {/* University */}
            <View>

                <Text className="text-base text-black font-bold mb-2">University<Text className="text-red-600">*</Text></Text>

                <Dropdown
                    value={profileResponse?.profile.univeristy_id || undefined}


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
                                                
                                                ${profileResponse?.profile.univeristy_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                }
                            >
                                <Text className={`${profileResponse?.profile.univeristy_id === item.id ? "font-bold text-blue-600" : ""}`}>University of {item.name}</Text>
                            </View>)
                    }

                    data={univeristiesResponse?.universities || []}
                    onChange={(item: any) => { console.log(item.id) }}
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
                    value={profileResponse?.profile.faculty_id || undefined}


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
                                                
                                                ${profileResponse?.profile.faculty_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                }
                            >
                                <Text className={`${profileResponse?.profile.faculty_id === item.id ? "font-bold text-blue-600" : ""}`}>Faculty of {item.name}</Text>
                            </View>)
                    }

                    data={facultiesResponse?.faculties || []}
                    onChange={(item: any) => { console.log(item.id) }}
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
                    value={profileResponse?.profile.department_id || undefined}


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
                                                
                                                ${profileResponse?.profile.department_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                }
                            >
                                <Text className={`${profileResponse?.profile.department_id === item.id ? "font-bold text-blue-600" : ""}`}>{item.name}</Text>
                            </View>)
                    }

                    data={departmentsResponse?.departments || []}
                    onChange={(item: any) => { console.log(item.id) }}
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
                    value={profileResponse?.profile.field_id || undefined}
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
                                                
                                                ${profileResponse?.profile.field_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                }
                            >
                                <Text className={`${profileResponse?.profile.field_id === item.id ? "font-bold text-blue-600" : ""}`}>Field of {item.name}</Text>
                            </View>)
                    }

                    data={fieldsResponse?.fields || []}
                    onChange={(item: any) => { console.log(item.id) }}
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
                    value={profileResponse?.profile.level_id || undefined}


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
                                                
                                                ${profileResponse?.profile.level_id === item.id ? "bg-blue-100 " : ""}
                                                `
                                }
                            >
                                <Text className={`${profileResponse?.profile.level_id === item.id ? "font-bold text-blue-600" : ""}`}>{item.name}</Text>
                            </View>)
                    }

                    data={levelsResponse?.levels || []}
                    onChange={(item: any) => { console.log(item.id) }}
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
            <PrimaryButton title="Save" onPress={() => {
                console.log("save")
            }} />


        </ScrollView>
    )
}