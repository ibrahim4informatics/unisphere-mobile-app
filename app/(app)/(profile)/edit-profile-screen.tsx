import UITabs from "@/components/ui/UITabs";
import Colors from "@/constants/Colors";
import UpdateStudentProfile from "@/forms/profile/UpdateStudentProfile";
import UpdateUser from "@/forms/profile/UpdateUser";
import useAcademicUserProfile from "@/hooks/api/queries/useAcademicUserProfile";
import useCurrentProfile from "@/hooks/api/queries/useCurrentProfile";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const schema = z.object({
    new_email: z.email({ error: ({ input }) => !input ? "Field is required." : "Invalid email." })
});

type FormFields = z.infer<typeof schema>;

export default function EditProfile() {

    const queryClient = useQueryClient();
    const user_role = (queryClient.getQueryData(["profile"]) as any).data.profile.role;
    const { data: academicProfileResponse, isPending: academicProfileLoading, error: academicProfileError } = useAcademicUserProfile();
    const { data: currentUserProfile, isPending: currentUserProfileLoading, error: currentUserProfileError } = useCurrentProfile();





    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">
            <SafeAreaView className="flex-1 px-5">

                {/* Header */}
                <View className="flex-row items-center mb-6 pt-4">
                    <TouchableOpacity
                        className="bg-white h-11 w-11 items-center justify-center rounded-full shadow-sm mr-3"
                        onPress={() => router.back()}
                    >
                        <Feather name="arrow-left" size={20} color={Colors.blue[500]} />
                    </TouchableOpacity>

                    <Text className="text-2xl font-extrabold text-gray-900">
                        Edit Profile
                    </Text>
                </View>

                <UITabs

                    tabs={[{ key: "personal", label: "Personal Informations" }, { key: "academic", label: "Academic Informations" }]}
                    renderContent={(activeTab) => {

                        if (activeTab === "personal") {

                            if (currentUserProfileLoading) {
                                return (<View className="flex-1 items-center justify-center"><ActivityIndicator size={"large"} color={Colors.blue[500]} /></View>)
                            }

                            else {
                                return (
                                    <UpdateUser first_name={currentUserProfile?.data.profile.first_name} last_name={currentUserProfile?.data.profile.last_name} bio={currentUserProfile?.data.profile.bio} avatar_url={currentUserProfile?.data.profile.avatar_url} />
                                )
                            }
                        }

                        else if (activeTab === "academic") {

                            if (user_role === "STUDENT") {

                                if (academicProfileLoading) {
                                    return <View className="flex-1 items-center justify-center">
                                        <ActivityIndicator size={"large"} color={Colors.blue[500]} />
                                    </View>
                                }

                                else {
                                    return (
                                        <UpdateStudentProfile
                                            university_id={academicProfileResponse?.profile.univeristy_id!}
                                            faculty_id={academicProfileResponse?.profile.faculty_id!}
                                            department_id={academicProfileResponse?.profile.department_id!}
                                            field_id={academicProfileResponse?.profile.field_id!}
                                            level_id={academicProfileResponse?.profile.level_id!}

                                        />
                                    )
                                }
                            }


                            else {
                                return (
                                    <View>
                                        <Text>Update teacher academic Informations</Text>
                                    </View>
                                )
                            }
                        }
                    }}
                />


            </SafeAreaView>
        </LinearGradient>
    );
}