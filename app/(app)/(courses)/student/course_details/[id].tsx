import Colors from "@/constants/Colors";
import useEnrollInCourse from "@/hooks/api/mutations/useEnrollInCourse";
import useQuitCourse from "@/hooks/api/mutations/useQuitCourse";
import useCourseDetails from "@/hooks/api/queries/useCourseDetails";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function CourseDetails() {

    const queryClient = useQueryClient()
    const { id }: { id: string } = useLocalSearchParams();
    const { mutateAsync: enroll, isPending: enrolling } = useEnrollInCourse();
    const { mutateAsync: quit, isPending: quittingCourse } = useQuitCourse();
    const { data, isPending, error } = useCourseDetails(id);
    const course = data?.course;

    const quitCourse = async (course_id: string) => {
        const course_snapshot = queryClient.getQueryData(["courses", course_id]);
        if (quittingCourse) return;
        try {
            await quit(course_id);
            queryClient.setQueryData(["courses", course_id], (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    is_enrolled: false
                }
            })
        }

        catch (err) {
            console.log(err);
            queryClient.setQueryData(["courses", course_id], course_snapshot)
        }
        finally {
            queryClient.invalidateQueries({
                exact: false,
                queryKey: ["courses"]
            })
        }


    }


    const handleEnroll = async (course_id: string) => {
        const courses_snapshot = queryClient.getQueryData(["courses", course_id]);

        if (enrolling) return;

        try {
            await enroll(course_id);
            queryClient.setQueryData(["courses", course_id], (oldData: any) => {
                if (!oldData) return oldData
                return {
                    ...oldData,
                    is_enrolled: true
                }
            });
            queryClient.invalidateQueries({
                queryKey: ["courses"],
                exact: false,
            });


        }

        catch (err) {
            console.log(err)
            // rollback
            queryClient.setQueryData(["courses"], courses_snapshot);
        }
    }

    if (isPending) return <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={Colors.blue[500]} size={"large"} />
    </View>


    return <LinearGradient
        colors={["#f8fbff", "#eef4ff"]}
        className="flex-1"
    >
        <SafeAreaView className="flex-1 px-6">



            {/* Header */}

            <View className="flex-row items-center  mt-4 gap-4">
                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => {
                        router.back();
                    }}
                    className="bg-white w-12 h-12 items-center justify-center rounded-full border border-gray-200">
                    <Feather name="arrow-left" size={22} color={Colors.blue[500]} />
                </TouchableOpacity>

                <Text className="text-lg font-bold" >Course Details</Text>


            </View>



            <ScrollView
                showsVerticalScrollIndicator={false}
                className="mt-6"
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Course Title Section */}
                <View className="bg-white rounded-3xl p-6 shadow-md border border-blue-50">

                    <View className="flex-row justify-between items-start">

                        <View className="flex-1">
                            <Text className="text-2xl font-bold text-primary">
                                {course.name}
                            </Text>

                            <View className="flex-row items-center gap-2 mt-2">
                                <Text className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                                    {course.code}
                                </Text>

                                <Text className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                                    {course.status}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Description */}
                    <Text className="text-sm text-textSecondary mt-5 leading-6">
                        {course.description}
                    </Text>
                </View>

                {/* Academic Information */}
                <View className="bg-white rounded-3xl p-6 mt-6 shadow-md border border-blue-50">
                    <Text className="text-base font-bold text-primary mb-4">
                        Academic Information
                    </Text>

                    <View className="space-y-3">

                        <View>
                            <Text className="text-xs text-gray-400 font-semibold">Field</Text>
                            <Text className="text-sm font-semibold text-gray-700">
                                {course.field.name}
                            </Text>
                        </View>

                        <View>
                            <Text className="text-xs text-gray-400 font-semibold">Module</Text>
                            <Text className="text-sm font-semibold text-gray-700">
                                {course.module.name} ({course.module.code})
                            </Text>
                        </View>

                        <View>
                            <Text className="text-xs text-gray-400 font-semibold">Faculty</Text>
                            <Text className="text-sm font-semibold text-gray-700">
                                {course.faculty.name}
                            </Text>
                            <Text className="text-xs text-gray-400">
                                {course.faculty.university.name}
                            </Text>
                        </View>

                        {/* Target Levels */}
                        <View>
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
                    </View>
                </View>

                {/* Instructor Section */}
                <View className="bg-white rounded-3xl p-6 mt-6 shadow-md border border-blue-50">
                    <Text className="text-base font-bold text-primary mb-4">
                        Instructor
                    </Text>

                    <View className="flex-row gap-4 items-center">

                        <Image
                            source={
                                course.publisher.user.avatar_url
                                    ? { uri: course.publisher.user.avatar_url }
                                    : require("@/assets/images/no-avatar.png")
                            }
                            style={{ width: 60, height: 60, borderRadius: 30 }}
                        />

                        <View className="flex-1">
                            <Text className="text-base font-bold">
                                {course.publisher.user.first_name} {course.publisher.user.last_name}
                            </Text>

                            <Text className="text-sm text-blue-500 font-semibold">
                                {course.publisher.academic_title}
                            </Text>

                            <Text className="text-xs text-gray-400">
                                Specialization: {course.publisher.specialization}
                            </Text>

                            <Text className="text-xs text-gray-400 mt-1">
                                {course.publisher.university.name}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Course Structure */}
                <View className="bg-white rounded-3xl p-6 mt-6 shadow-md border border-blue-50">


                    <View className="flex-row gap-4 mb-4">
                        <View className="items-center">
                            <View className="flex-row gap-1 items-center">
                                <Feather name="layers" color={Colors.blue[600]} size={18} />
                                <Text className="text-xl font-bold text-blue-600">
                                    {course._count.courseSections}
                                </Text>
                            </View>
                            <Text className="text-xs text-blue-600">
                                Sections
                            </Text>
                        </View>

                        <View className="items-center">
                            <View className="flex-row gap-1 items-center">
                                <Feather name="users" color={Colors.gray[400]} size={18} />
                                <Text className="text-xl font-bold text-gray-400">
                                    {course._count.courseEnrollments}
                                </Text>
                            </View>
                            <Text className="text-xs text-gray-400">
                                Enrollements
                            </Text>
                        </View>
                    </View>
                    <Text className="text-base font-bold text-primary mb-4">
                        Course Structure
                    </Text>

                    {/* Sections List */}
                    {course.courseSections.map((section: any) => (
                        <View
                            key={section.id}
                            className="flex-row items-center gap-3 py-3 border-t border-gray-100"
                        >
                            <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center">
                                <Text className="text-xs font-bold text-blue-600">
                                    {section.order}
                                </Text>
                            </View>

                            <Text className="text-sm font-medium text-gray-700">
                                {section.title}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Bottom Enroll Button */}
                {!data.is_enrolled && (
                    <View className="mt-8">
                        <TouchableOpacity onPress={async()=>{
                            await handleEnroll(id)
                        }} className="bg-blue-500 py-4 rounded-2xl items-center shadow-md">
                            <Text className="text-white font-semibold text-base">
                                Enroll in this Course
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                {data.is_enrolled && (
                    <View className="mt-10 gap-4">

                        {/* START LEARNING */}
                        <TouchableOpacity
                        onPress={()=>{
                            router.push(`./sections?course_id=${id}`)
                        }}
                            activeOpacity={0.85}
                            className="bg-blue-500 py-4 rounded-2xl flex-row items-center justify-center shadow-lg"
                            style={{
                                shadowColor: "#3B82F6",
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.25,
                                shadowRadius: 12,
                                elevation: 8,
                            }}
                        >
                            <Feather name="play-circle" size={20} color="#FFFFFF" />
                            <Text className="text-white font-bold text-base ml-3">
                                Start Learning
                            </Text>
                        </TouchableOpacity>

                        {/* QUIT COURSE */}
                        <TouchableOpacity
                            activeOpacity={0.85}
                            className="py-4 rounded-2xl flex-row items-center justify-center border border-red-400 bg-red-50"
                            onPress={async () => { await quitCourse(id) }}
                        >

                            {quittingCourse ? <ActivityIndicator size={"small"} color={Colors.red[600]} /> :
                                <>
                                    <Feather name="log-out" size={18} color="#DC2626" />
                                    <Text className="text-red-600 font-semibold text-base ml-3">
                                        Quit Course
                                    </Text></>}
                        </TouchableOpacity>

                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    </LinearGradient>
}