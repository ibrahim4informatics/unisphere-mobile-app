import FileCard from "@/components/ui/FileCard";
import Colors from "@/constants/Colors";
import useSectionDetails from "@/hooks/api/queries/useSectionDetails";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function SectionDetails() {

    const { course_id, section_id }: { course_id: string, section_id: string } = useLocalSearchParams();
    const queryClient = useQueryClient();

    const courseData: any = queryClient.getQueryData(["courses", course_id]);

    const { data, isPending, error } = useSectionDetails(course_id, section_id);

    return (
        <LinearGradient
            colors={["#f8fbff", "#eef4ff"]}
            className="flex-1"
        >
            <SafeAreaView className="flex-1 px-6">

                <View className="flex-row items-center gap-2">

                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                        className="bg-white w-12 h-12 items-center justify-center rounded-full border border-gray-200">
                        <Feather name="arrow-left" size={22} color={Colors.blue[500]} />
                    </TouchableOpacity>


                    <Text className="text-2xl font-bold text-primary mb-6 mt-4">
                        {courseData.course.name}
                    </Text>

                    <View className="bg-blue-100 px-3 py-1 rounded-full">
                        <Text className="text-blue-700 text-xs font-semibold">
                            {courseData.course.code}
                        </Text>
                    </View>
                </View>


                {
                    isPending ? <View className="flex-1 items-center justify-center"><ActivityIndicator size={"large"} color={Colors.blue[500]} /></View> :
                        error ? <Text className="mt-2 text-red-600 text-base">Network error,can not get section now!</Text> :
                            (<ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingVertical: 24 }}
                            >
                                {/* ===== FILES SECTION ===== */}
                                {data.section.materials.length > 0 && (
                                    <View className="mb-8">

                                        <View className="flex-row items-center mb-4">
                                            <Feather name="folder" size={20} color="#3B82F6" />
                                            <Text className="text-lg font-bold ml-2 text-gray-800">
                                                Materials
                                            </Text>
                                        </View>

                                        {data.section.materials.map((file: any) => (
                                            <FileCard
                                                key={file.id}
                                                file={file}
                                                onView={() => { }}
                                                onDownload={() => {
                                                    console.log("Download pressed")
                                                }}
                                            />
                                        ))}
                                    </View>
                                )}

                                {/* ===== SECTION INFO ===== */}
                                <View className="bg-white rounded-3xl p-6 shadow-sm border border-blue-50">

                                    {/* Order Badge */}
                                    <View className="flex-row items-center mb-4">
                                        <View className="bg-blue-100 w-12 h-12 rounded-full items-center justify-center">
                                            <Text className="text-blue-600 font-bold">
                                                {data.section.order}
                                            </Text>
                                        </View>

                                        <View className="ml-4">
                                            <Text className="text-xl font-bold text-gray-800">
                                                {data.section.title}
                                            </Text>
                                            <Text className="text-xs text-gray-400">
                                                Section #{data.section.order}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Description */}
                                    <Text className="text-gray-600 leading-6 mb-6">
                                        {data.section.content}
                                    </Text>

                                    {/* Metadata */}
                                    <View className="flex-row justify-between">
                                        <View>
                                            <Text className="text-xs text-gray-400">Created</Text>
                                            <Text className="text-sm font-medium text-gray-600">
                                                {new Date(data.section.created_at).toLocaleDateString()}
                                            </Text>
                                        </View>

                                        <View>
                                            <Text className="text-xs text-gray-400">Updated</Text>
                                            <Text className="text-sm font-medium text-gray-600">
                                                {new Date(data.section.updated_at).toLocaleDateString()}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>)
                }
            </SafeAreaView>
        </LinearGradient>
    )
}