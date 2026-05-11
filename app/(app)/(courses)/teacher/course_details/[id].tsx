import TeacherCourseActionsModal from "@/components/Modals/TeacherCourseActionsModal";
import Colors from "@/constants/Colors";
import useDeleteCourse from "@/hooks/api/mutations/useDeleteOwnCourse";
import useTeacherPublishedCourseDetails from "@/hooks/api/queries/useTeacherPublishedCourseDetails";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function CoursesDetails() {
    const queryClient = useQueryClient();

    const { id }: { id: string } = useLocalSearchParams();
    const [showModal, setShowModal] = useState<boolean>(false);

    const { data, isPending, error } = useTeacherPublishedCourseDetails(id);
    const { mutateAsync: deleteCourse, isPending: deleting_course } = useDeleteCourse();


    const badgeStyles = (status: string) => {
        if (status === "ACCEPTED") {
            return { container: "bg-green-200", text: "text-green-600" }
        }
        else if (status === "PENDING") return { container: "bg-orange-200", text: "text-orange-600" }
        else if (status === "DRAFT" || status === "REJECTED") return { container: "bg-red-200", text: "text-red-600" }


    }


    return <LinearGradient
        colors={["#f8fbff", "#eef4ff"]}
        className="flex-1"
    >
        <SafeAreaView className="flex-1 px-6">

            <View className="flex-row items-center  mt-4 justify-between">
                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => {
                        router.back();
                    }}
                    className="bg-white w-12 h-12 items-center justify-center rounded-full border border-gray-200">
                    <Feather name="arrow-left" size={22} color={Colors.blue[500]} />
                </TouchableOpacity>

                <Text className="text-lg font-bold" >Course Details</Text>


                <TouchableOpacity
                    onPress={() => {
                        setShowModal(true)
                    }}
                    className="bg-white w-12 h-12 items-center justify-center rounded-full border border-gray-200">
                    <Feather name="more-horizontal" size={22} color={Colors.blue[500]} />
                </TouchableOpacity>


            </View>


            {
                isPending ? <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size={"large"} color={Colors.blue[500]} />
                </View> : error ? <Text className="text-base text-red-600 mt-2">Network error,can not get the course details</Text> :
                    (<>
                        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 mt-6" contentContainerClassName="pb-8">



                            {/* Course Title */}
                            <View className="bg-white rounded-3xl p-6 shadow-lg border border-blue-50">

                                <View className="flex-row justify-between items-start">

                                    <View className="flex-1">
                                        <Text className="text-2xl font-bold text-primary">
                                            {data.course.name}
                                        </Text>

                                        <View className="flex-row items-center gap-2 mt-2">
                                            <Text className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                                                {data.course.code}
                                            </Text>

                                            <Text className="text-xs text-gray-400">
                                                {data.course.field.name}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Status */}
                                    <View className={`${badgeStyles(data.course.status)?.container} px-3 py-1 rounded-full`}>
                                        <Text className={`${badgeStyles(data.course.status)?.text} text-xs font-semibold`}>
                                            {data.course.status}
                                        </Text>
                                    </View>
                                </View>

                                <Text className="text-textSecondary mt-4 leading-6">
                                    {data.course.description}
                                </Text>
                            </View>

                            {/* Stats */}
                            <View className="flex-row justify-between mt-6">

                                <View className="bg-white flex-1 mr-3 rounded-2xl p-5 shadow border border-blue-50 items-center">


                                    <View className="gap-1 mt-2 items-center">
                                        <Feather name="users" size={22} color={Colors.gray[400]} />
                                        <Text className="text-xs text-gray-400 mt-1">
                                            Students
                                        </Text>
                                    </View>
                                    <Text className="text-2xl font-bold text-blue-600">
                                        {data.course._count.courseEnrollments}
                                    </Text>
                                </View>

                                <View className="bg-white flex-1 ml-3 rounded-2xl p-5 shadow border border-blue-50 items-center">

                                    <View className="gap-1 mt-2 items-center">
                                        <Feather name="layers" size={22} color={Colors.gray[400]} />
                                        <Text className="text-xs text-gray-400 mt-1">
                                            Sections
                                        </Text>
                                    </View>
                                    <Text className="text-2xl font-bold text-blue-600">
                                        {data.course._count.courseSections}
                                    </Text>
                                </View>

                            </View>

                            {/* Academic Info */}
                            <View className="bg-white rounded-3xl p-6 shadow-lg border border-blue-50 mt-6">

                                <Text className="text-blue-500 text-xs font-bold mb-4">
                                    ACADEMIC INFORMATION
                                </Text>

                                <Text className="text-sm font-semibold text-gray-700">
                                    Module
                                </Text>
                                <Text className="text-sm text-gray-500 mb-3">
                                    {data.course.module.name} ({data.course.module.code})
                                </Text>

                                <Text className="text-sm font-semibold text-gray-700">
                                    Targeted Levels
                                </Text>

                                <View className="flex-row flex-wrap gap-2 mt-2 mb-4">
                                    {data.course.module.levels.map((level: any) => (
                                        <View
                                            key={level.id}
                                            className="bg-blue-50 px-4 py-1 rounded-full border border-blue-100"
                                        >
                                            <Text className="text-xs text-blue-600 font-medium">
                                                {level.name}
                                            </Text>
                                        </View>
                                    ))}
                                </View>

                                <Text className="text-sm font-semibold text-gray-700">
                                    Faculty
                                </Text>
                                <Text className="text-sm text-gray-500">
                                    {data.course.faculty.name}
                                </Text>

                                <Text className="text-sm text-gray-500">
                                    {data.course.faculty.university.name}
                                </Text>
                            </View>

                            {/* Sections */}
                            <View className="bg-white rounded-3xl p-6 shadow-lg border border-blue-50 mt-6">

                                <Text className="text-blue-500 text-xs font-bold mb-4">
                                    COURSE SECTIONS
                                </Text>

                                {data.course.courseSections.map((section: any) => (
                                    <View
                                        key={section.id}
                                        className="flex-row items-center justify-between bg-blue-50 p-4 rounded-2xl mb-3"
                                    >
                                        <View>
                                            <Text className="text-sm font-semibold text-blue-800">
                                                Section {section.order}
                                            </Text>
                                            <Text className="text-sm text-gray-600">
                                                {section.title}
                                            </Text>
                                        </View>

                                        <Text className="text-xs text-gray-400">
                                            #{section.order}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            {/* Dates */}
                            <View className="bg-white rounded-3xl p-6 shadow-lg border border-blue-50 mt-6 mb-10">

                                <Text className="text-blue-500 text-xs font-bold mb-4">
                                    COURSE TIMELINE
                                </Text>

                                <View className="flex-row justify-between mb-2">
                                    <Text className="text-sm text-gray-500">
                                        Created At
                                    </Text>
                                    <Text className="text-sm font-semibold text-gray-700">
                                        {new Date(data.course.created_at).toLocaleDateString()}
                                    </Text>
                                </View>

                                <View className="flex-row justify-between">
                                    <Text className="text-sm text-gray-500">
                                        Last Updated
                                    </Text>
                                    <Text className="text-sm font-semibold text-gray-700">
                                        {new Date(data.course.updated_at).toLocaleDateString()}
                                    </Text>
                                </View>
                            </View>

                        </ScrollView>
                        <TouchableOpacity
                            onPress={() => {
                                router.push(`./sections?course_id=${id}`)
                            }}
                            activeOpacity={0.85}
                            className="absolute bottom-6 right-5 z-20 bg-blue-500 px-6 py-4 rounded-full flex-row items-center gap-3 shadow-xl"
                        >
                            {/* Icon Container */}
                            <View className="w-9 h-9 rounded-full bg-white/20 items-center justify-center">
                                <Feather name="layers" size={18} color={Colors.white} />
                            </View>

                            <Text className="text-white text-base font-semibold tracking-wide">
                                Show Sections
                            </Text>
                        </TouchableOpacity>
                    </>)
            }

            <TeacherCourseActionsModal
                is_deleteing={deleting_course}
                onDelete={async () => {

                    try {
                        const res = await deleteCourse(data.course.id);
                        console.log(res)
                        setShowModal(false);
                        queryClient.invalidateQueries({ queryKey: ["courses", "teacher", "my-courses"], exact: false });
                        router.back();
                    }
                    catch (err) {
                        console.log(err)
                        setShowModal(false);

                    }
                }}
                onEdit={() => {
                    router.push(`./update-course?course_id=${id}`)
                    setShowModal(false)
                }}
                onShowStudentsList={() => {
                    router.push(`./enrolled-students?course_id=${id}`);

                    setShowModal(false)
                }}
                visible={showModal}
                setVisible={setShowModal}
            />
        </SafeAreaView>
    </LinearGradient>
}