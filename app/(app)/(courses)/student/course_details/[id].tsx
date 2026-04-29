import Colors from "@/constants/Colors";
import useCourseDetails from "@/hooks/api/queries/useCourseDetails";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const courseData = {
    "course": {
        "id": "287d5bf0-3a0e-40ce-a9f8-4e31703af06f",
        "name": "Relational Database",
        "code": "RDB",
        "description": "An introduction to relational databases covering data modeling, SQL querying, schema design, and normalization. Students gain hands-on experience with RDBMS tools and learn to manage structured data efficiently in real-world applications.",
        "status": "ACCEPTED",
        "field_id": 117,
        "faculty_id": 25,
        "module_id": 3,
        "publisher_id": 2,
        "updated_at": "2026-04-17T10:28:43.368Z",
        "created_at": "2026-04-15T09:30:51.004Z",
        "studentProfileId": null,
        "faculty": {
            "name": "Faculty of Exact Sciences",
            "id": 25,
            "university": {
                "name": "University of Oran 1"
            }
        },
        "courseSections": [
            {
                "id": 2,
                "title": "Sql Introduction",
                "order": 2
            }
        ],
        "module": {
            "name": "Data Bases",
            "id": 3,
            "code": "SGDB",
            "levels": [
                {
                    "name": "L2",
                    "id": 2
                },
                {
                    "name": "Engineering Year 1",
                    "id": 56
                }
            ]
        },
        "field": {
            "name": "Computer Science",
            "id": 117
        },
        "publisher": {
            "university": {
                "name": "University of Oran 1"
            },
            "academic_title": "PROFESSOR",
            "specialization": "UML",
            "user": {
                "first_name": "Adla",
                "last_name": "Abd Elkader",
                "avatar_url": null,
                "id": "dedd071c-8a48-4f40-9c9d-5137926f3d02"
            }
        },
        "courseEnrollments": [
            {
                "student_id": 2
            }
        ],
        "_count": {
            "courseEnrollments": 1,
            "courseSections": 1
        }
    },
    "is_enrolled": true
}

export default function CourseDetails() {

    const { id }: { id: string } = useLocalSearchParams();
    const { data, isPending, error } = useCourseDetails(id);
    const course = data?.course;

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
                                {course.module.levels.map((level:any) => (
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
                    {course.courseSections.map((section:any) => (
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
                        <TouchableOpacity className="bg-blue-500 py-4 rounded-2xl items-center shadow-md">
                            <Text className="text-white font-semibold text-base">
                                Enroll in this Course
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {data.is_enrolled && (
                    <View className="mt-8">
                        <TouchableOpacity className="bg-blue-200 py-4 rounded-2xl items-center shadow-md">
                            <Text className="text-blue-500 font-semibold text-base">
                                Start Learning
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    </LinearGradient>
}