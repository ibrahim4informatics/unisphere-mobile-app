import Colors from "@/constants/Colors";
import useDeleteCourseSection from "@/hooks/api/mutations/useDeleteCourseSection";
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

export function SectionItem({
    section,
    deleting = false,
    onPress,
    onEdit,
    onDelete,
}: {
    section: any;
    deleting?: boolean;
    onPress: () => void;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            className="bg-white rounded-2xl p-5 mb-4 border border-blue-50 shadow-sm"
        >
            <View className="flex-row items-center justify-between">
                {/* Left Content */}
                <View className="flex-1 pr-4">
                    <Text className="text-base font-bold text-gray-800">
                        {section.title}
                    </Text>

                    <Text className="text-xs text-gray-400 mt-1">
                        Order #{section.order}
                    </Text>
                </View>

                {/* Right Actions */}
                <View className="flex-row items-center gap-3">
                    {/* Edit */}
                    <TouchableOpacity
                        onPress={onEdit}
                        className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center"
                    >
                        <Feather name="edit-2" size={18} color={Colors.blue[500]} />
                    </TouchableOpacity>

                    {/* Delete */}
                    <TouchableOpacity
                        onPress={onDelete}
                        className="w-10 h-10 rounded-full bg-red-50 items-center justify-center"
                    >
                        {
                            deleting ? <ActivityIndicator size={"small"} color={Colors.red[600]} /> : <Feather name="trash-2" size={18} color={Colors.red[600]} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default function Sections() {
    const { course_id }: { course_id: string } = useLocalSearchParams();
    const queryClient = useQueryClient();
    const courseData: any = queryClient.getQueryData(["courses", "teacher", "my-courses", course_id]);
    const { mutateAsync: deleteSection, isPending: deletingSection } = useDeleteCourseSection()
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
                                            deleting={deletingSection}


                                            onDelete={async () => {

                                                const snapshot = queryClient.getQueryData(["courses", course_id, "sections"]);

                                                try {

                                                    await deleteSection({ course_id, section_id: item.id });
                                                    queryClient.setQueryData(["courses", course_id, "sections"], (oldData: any) => {
                                                        if (!oldData) return oldData;
                                                        return {
                                                            ...oldData,
                                                            pages: oldData.pages.map((page: any) => ({
                                                                ...page,
                                                                sections: page.sections.filter((section: any) => section.id !== item.id)
                                                            }))
                                                        }
                                                    })

                                                    queryClient.invalidateQueries({ queryKey: ["courses", "teacher", "my-courses", course_id] });
                                                    queryClient.invalidateQueries({ queryKey: ["courses", "teacher", "my-courses"], exact: false });

                                                }

                                                catch (err) {
                                                    console.log(err);
                                                    queryClient.setQueryData(["courses", course_id, "sections"], snapshot);
                                                }
                                            }}
                                            onEdit={() => { router.push(`./update-section?course_id=${course_id}&section_id=${item.id}`) }}
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

                <TouchableOpacity
                    onPress={() => {
                        router.push(`./create-section?course_id=${course_id}`)
                    }}
                    activeOpacity={0.85}
                    className="absolute bottom-6 right-5 z-20 bg-blue-500 px-6 py-4 rounded-full flex-row items-center gap-3 shadow-xl"
                >
                    {/* Icon Container */}
                    <View className="w-9 h-9 rounded-full bg-white/20 items-center justify-center">
                        <Feather name="plus" size={18} color={Colors.white} />
                    </View>

                    <Text className="text-white text-base font-semibold tracking-wide">
                        Add Section
                    </Text>
                </TouchableOpacity>

            </SafeAreaView>
        </LinearGradient>
    )
}