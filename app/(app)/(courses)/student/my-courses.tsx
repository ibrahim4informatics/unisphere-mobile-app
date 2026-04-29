import CourseCard from "@/components/ui/courses/CourseCard";
import Colors from "@/constants/Colors";
import useStudentEnrolledCourses from "@/hooks/api/queries/useStudentEnrolledCourses";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyCourses() {

    const {
        isPending: coursesLoading, data: courses, error: coursesError,
        hasNextPage: hasMoreCourses, fetchNextPage: getMoreCourses, isFetchingNextPage: moreCoursesLoading
    } = useStudentEnrolledCourses()
    return (
        <LinearGradient
            colors={["#f8fbff", "#eef4ff"]}
            className="flex-1"
        >
            <SafeAreaView className="flex-1 px-6">

                <View className="flex-row gap-2 items-center">
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                        className="bg-white w-12 h-12 items-center justify-center rounded-full border border-gray-200">
                        <Feather name="arrow-left" size={22} color={Colors.blue[500]} />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-primary mb-6 mt-4">
                        Enrolled Courses
                    </Text>
                </View>




               
                {
                    coursesLoading ? (
                        <View className="flex-1 items-center justify-center"><ActivityIndicator color={Colors.blue[500]} size={"large"} /></View>)
                        : coursesError ? (
                            <Text className="text-red-600 text-base">Network error</Text>
                        ) : (

                            <FlatList
                                contentContainerClassName="pb-12"
                                data={courses.pages.flatMap(page => page.courses)}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <CourseCard course={item} />
                                )}

                                ListEmptyComponent={() =>
                                (
                                    <Text className="mt-2 text-gray-500">No enrolled courses for the moment!</Text>
                                )
                                }

                                onEndReached={() => {
                                    if (!hasMoreCourses || moreCoursesLoading) return
                                    getMoreCourses();
                                }}
                            />
                        )
                }


            </SafeAreaView>
        </LinearGradient>
    )
}