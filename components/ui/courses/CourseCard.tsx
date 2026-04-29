
import Colors from "@/constants/Colors";
import useEnrollInCourse from "@/hooks/api/mutations/useEnrollInCourse";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type Props = {
    course: any
}

export default function CourseCard({ course }: Props) {
    const queryClient = useQueryClient();
    const { mutateAsync: enroll, isPending: enrolling } = useEnrollInCourse();



    const handleEnroll = async (course_id: string) => {
        const courses_snapshot = queryClient.getQueryData(["courses"]);

        if (enrolling) return;

        try {

            const result = await enroll(course_id);



            queryClient.setQueriesData({ queryKey: ["courses"], exact: false }, (oldData: any) => {
                console.log(oldData)
                if (!oldData?.pages) return oldData

                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        courses: page.courses.map((course: any) =>
                            course.id === course_id
                                ? { ...course, is_enrolled: true }
                                : course
                        )
                    }))
                }
            });

            queryClient.invalidateQueries({
                queryKey: ["courses", course_id]
            });


        }

        catch (err) {
            console.log(err)
            // rollback
            queryClient.setQueryData(["courses"], courses_snapshot);
        }
    }
    return (
        <View className="bg-white rounded-3xl p-5 my-4 shadow-md border border-blue-50">

            {/* Header */}
            <View className="flex-row justify-between items-start">

                <View className="flex-row items-center gap-3 flex-1">
                    <View className="w-12 h-12 rounded-2xl items-center justify-center bg-green-100">
                        <Feather size={22} name="book-open" color={Colors.green[600]} />
                    </View>

                    <View className="flex-1">
                        <Text className="text-lg font-bold text-primary">
                            {course.name}
                        </Text>

                        <View className="flex-row items-center gap-2 mt-1">
                            <Text className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                {course.code}
                            </Text>

                            <Text className="text-xs text-gray-400">
                                {course.field.name}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Status */}
                <View className="bg-green-100 px-3 py-1 rounded-full">
                    <Text className="text-green-700 text-xs font-semibold">
                        {course.status}
                    </Text>
                </View>
            </View>

            {/* Module Info */}
            <View className="mt-4">
                <Text className="text-xs text-gray-400 font-semibold">
                    Module
                </Text>
                <Text className="text-sm font-semibold text-gray-700">
                    {course.module.name} ({course.module.code})
                </Text>
            </View>

            {/* Description */}
            <Text numberOfLines={3} className="text-sm text-textSecondary mt-3 leading-5">
                {course.description}
            </Text>

            {/* Target Levels */}
            <View className="mt-4">
                <Text className="text-xs text-gray-400 font-semibold mb-2">
                    Targeted Levels
                </Text>
                <View className="flex-row flex-wrap gap-2">
                    {course.module.levels.map((level: any) => (
                        <View
                            key={level.id}
                            className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100"
                        >
                            <Text className="text-xs text-blue-600 font-medium">
                                {level.name}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Publisher Section */}
            <View className="mt-5 pt-4 border-t border-gray-100">

                <Text className="text-blue-500 font-bold text-xs mb-3">
                    Published By
                </Text>

                <View className="flex-row gap-3 items-center">
                    <Image
                        source={
                            course.publisher.user.avatar_url
                                ? { uri: course.publisher.user.avatar_url }
                                : require("@/assets/images/no-avatar.png")
                        }
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                    />

                    <View className="flex-1">
                        <Text className="text-sm font-bold">
                            {course.publisher.user.first_name} {course.publisher.user.last_name}
                        </Text>

                        <Text className="text-xs text-gray-400">
                            {course.faculty.name}
                        </Text>

                        <Text className="text-xs text-gray-400">
                            {course.faculty.university.name}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Actions */}
            <View className="flex-row items-center gap-3 mt-6">

                {!course.is_enrolled && (
                    <TouchableOpacity onPress={async () => { await handleEnroll(course.id) }} className="bg-blue-500 flex-1 py-3 rounded-2xl items-center shadow-sm">
                        {enrolling ? <ActivityIndicator size={"small"} color={"#fff"} /> : <Text className="text-white font-semibold">
                            Enroll Now
                        </Text>}
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    onPress={() => {
                        router.push(`/(app)/(courses)/student/course_details/${course.id}`);
                    }}
                    className="flex-1 items-center justify-center border border-blue-200 py-3 rounded-2xl"
                >
                    <Text className="text-blue-500 font-semibold">
                        View Details
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}