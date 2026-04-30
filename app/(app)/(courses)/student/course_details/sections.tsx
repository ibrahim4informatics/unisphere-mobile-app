import Colors from "@/constants/Colors";
import useCourseSections from "@/hooks/api/queries/useCourseSections";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



type SectionProps = {
    section: any
    onPress: () => void
}

function SectionItem({ section, onPress }: SectionProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            className="bg-white rounded-3xl p-5 mb-5 shadow-sm border border-blue-50"
            style={{
                shadowColor: "#3B82F6",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.08,
                shadowRadius: 14,
                elevation: 4,
            }}
        >
            {/* Top Row */}
            <View className="flex-row items-center justify-between mb-3">

                {/* Order Badge */}
                <View className="bg-blue-100 w-12 h-12 rounded-full items-center justify-center">
                    <Text className="text-blue-600 font-bold">
                        {section.order}
                    </Text>
                </View>

                {/* Materials Count */}
                <View className="flex-row items-center bg-blue-50 px-3 py-1 rounded-full">
                    <Feather name="file-text" size={14} color="#3B82F6" />
                    <Text className="text-blue-600 text-xs ml-1 font-semibold">
                        {section.materials.length} Material
                    </Text>
                </View>
            </View>

            {/* Title */}
            <Text className="text-lg font-bold text-gray-800 mb-2">
                {section.title}
            </Text>

            {/* Description */}
            <Text
                numberOfLines={2}
                className="text-gray-500 text-sm mb-4 leading-5"
            >
                {section.content}
            </Text>

            {/* Materials Preview */}
            {
                section.materials.length > 0 && (
                    <View className="bg-gray-50 rounded-2xl p-3 mb-4">
                        {section.materials.map((material: any) => (
                            <View
                                key={material.id}
                                className="flex-row items-center mb-2"
                            >
                                <Feather
                                    name={material.type === "PDF" ? "file" : "file-text"}
                                    size={16}
                                    color="#64748B"
                                />
                                <Text className="text-gray-600 text-xs ml-2">
                                    {material.type}
                                </Text>
                            </View>
                        ))}
                    </View>
                )
            }

            {/* Footer */}
            <View className="flex-row justify-between items-center">

                <View>
                    <Text className="text-xs text-gray-400">
                        Created
                    </Text>
                    <Text className="text-xs font-medium text-gray-500">
                        {new Date(section.created_at).toLocaleDateString()}
                    </Text>
                </View>

                <View className="flex-row items-center">
                    <Text className="text-blue-500 font-semibold text-sm mr-2">
                        Open Section
                    </Text>
                    <Feather name="arrow-right" size={18} color="#3B82F6" />
                </View>
            </View>
        </TouchableOpacity>
    )
}
export default function Sections() {
    const { course_id }: { course_id: string } = useLocalSearchParams();
    const queryClient = useQueryClient();
    const courseData: any = queryClient.getQueryData(["courses", course_id]);
    const { isPending: loadingSections, data: sectionsData, error: sectionsError,
        hasNextPage: hasMoreSections, fetchNextPage: loadMoreSections, isFetchingNextPage: loadingMoreSections
    } = useCourseSections(course_id);
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

                {/* sections body */}




                {
                    loadingSections ?
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator size={"large"} color={Colors.blue[500]} />
                        </View>
                        : sectionsError ? <Text className="text-red-600 text-base mt-2">Network error,can not get course sections!</Text>
                            : (
                                <FlatList
                                    data={sectionsData?.pages.flatMap(page => page.sections)}
                                    keyExtractor={(item) => item.id.toString()}
                                    contentContainerStyle={{ paddingVertical: 24 }}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <SectionItem
                                            section={item}
                                            onPress={() =>
                                                router.push(`./section-details?course_id=${course_id}&section_id=${item.id}`)
                                            }
                                        />
                                    )}

                                    ListEmptyComponent={() => <Text className="text-gray-400 text-xs">
                                        No sections published yet.
                                    </Text>}
                                    ListFooterComponent={
                                        <View className="items-center mt-6">
                                            {!hasMoreSections && <Text className="text-gray-400 text-xs">
                                                {sectionsData.pages.flatMap(page => page.sections).length} Section Available
                                            </Text>}

                                            {loadingMoreSections && <ActivityIndicator size={"small"} color={Colors.blue[500]} />}
                                        </View>
                                    }
                                    onEndReached={() => {
                                        if (loadingMoreSections || !hasMoreSections) return;
                                        loadMoreSections();
                                    }}
                                />
                            )
                }

            </SafeAreaView>
        </LinearGradient>
    )
}