import CourseCard from "@/components/ui/courses/CourseCard";
import SearchInput from "@/components/ui/courses/SearchInput";
import Colors from "@/constants/Colors";
import useCourses from "@/hooks/api/queries/useCourses";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// export const courses = [
//     {
//         "id": "287d5bf0-3a0e-40ce-a9f8-4e31703af06f",
//         "name": "Relational Database",
//         "code": "RDB",
//         "description": "An introduction to relational databases covering data modeling, SQL querying, schema design, and normalization. Students gain hands-on experience with RDBMS tools and learn to manage structured data efficiently in real-world applications.",
//         "status": "ACCEPTED",
//         "field_id": 117,
//         "faculty_id": 25,
//         "module_id": 3,
//         "publisher_id": 2,
//         "updated_at": "2026-04-17T10:28:43.368Z",
//         "created_at": "2026-04-15T09:30:51.004Z",
//         "studentProfileId": null,
//         "faculty": {
//             "name": "Faculty of Exact Sciences",
//             "id": 25,
//             "university": {
//                 "name": "University of Oran 1"
//             }
//         },
//         "module": {
//             "name": "Data Bases",
//             "id": 3,
//             "code": "SGDB",
//             "levels": [
//                 {
//                     "name": "L2",
//                     "id": 2
//                 },
//                 {
//                     "name": "Engineering Year 1",
//                     "id": 56
//                 }
//             ]
//         },
//         "field": {
//             "name": "Computer Science",
//             "id": 117
//         },
//         "publisher": {
//             "user": {
//                 "first_name": "Adla",
//                 "last_name": "Abd Elkader",
//                 "avatar_url": null,
//                 "id": "dedd071c-8a48-4f40-9c9d-5137926f3d02"
//             }
//         },
//         "is_enrolled": true
//     },
//     {
//         "id": "c86cd39a-a343-4687-adb0-ebe3fd5a10b6",
//         "name": "Object Oriented Programming",
//         "code": "OOP",
//         "description": "This Object-Oriented Programming (OOP) course is designed to help students understand and master one of the most important programming paradigms used in modern software development. The course covers the fundamental principles of OOP, including encapsulation, abstraction, inheritance, and polymorphism, and explains how these concepts are applied to build clean, organized, and maintainable software systems.  Students will learn how to design classes and objects, structure real-world problems into object models, and write reusable and scalable code. The course also introduces important topics such as constructors, access modifiers, interfaces, abstract classes, composition versus inheritance, and an introduction to SOLID principles and basic design patterns.  Through practical examples and hands-on projects, learners will move beyond theory and develop the ability to think in terms of objects and system design. By the end of the course, students will be able to design structured applications using OOP concepts and apply them confidently in real-world programming scenarios.",
//         "status": "ACCEPTED",
//         "field_id": 1,
//         "faculty_id": 1,
//         "module_id": 1,
//         "publisher_id": 1,
//         "updated_at": "2026-04-17T10:35:41.370Z",
//         "created_at": "2026-04-17T09:08:57.847Z",
//         "studentProfileId": null,
//         "faculty": {
//             "name": "Faculty of Exact Sciences",
//             "id": 1,
//             "university": {
//                 "name": "USTHB"
//             }
//         },
//         "module": {
//             "name": "Algorithm and Data Structure",
//             "id": 1,
//             "code": "DSA",
//             "levels": [
//                 {
//                     "name": "L1",
//                     "id": 1
//                 },
//                 {
//                     "name": "Engineering Year 1",
//                     "id": 56
//                 }
//             ]
//         },
//         "field": {
//             "name": "Computer Science",
//             "id": 1
//         },
//         "publisher": {
//             "user": {
//                 "first_name": "Touati",
//                 "last_name": "Amira",
//                 "avatar_url": null,
//                 "id": "fb025719-1087-4bd8-b022-2d2efc9994c7"
//             }
//         },
//         "is_enrolled": false
//     }
// ]

export default function Courses() {

    const [search, setSearch] = useState("");

    const { isPending: coursesLoading, data: courses, error: coursesError,
        hasNextPage: hasMoreCourses, fetchNextPage: getMoreCourses, isFetchingNextPage: moreCoursesLoading
    } = useCourses(search);



    return <LinearGradient
        colors={["#f8fbff", "#eef4ff"]}
        className="flex-1"
    >
        <SafeAreaView className="flex-1 px-6">

            <Text className="text-2xl font-bold text-primary mb-6 mt-4">
                Available Courses
            </Text>

            <SearchInput value={search} onChange={setSearch} />




            {
                coursesLoading ? (
                    <View className="flex-1 items-center justify-center"><ActivityIndicator color={Colors.blue[500]} size={"large"} /></View>)
                    : coursesError ? (
                        <Text className="text-red-600 text-base">Network error</Text>
                    ) : (

                        <FlatList
                            contentContainerClassName="pb-12"
                            data={courses?.pages.flatMap(page => page.courses)}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <CourseCard course={item} />
                            )}

                            onEndReached={() => {
                                if (!hasMoreCourses || moreCoursesLoading) return
                                getMoreCourses();
                            }}
                        />
                    )
            }

            {/* My Enrolled Courses Button */}

            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                    router.push("./my-courses")
                }}
                className="
                    absolute bottom-6 right-5
                    flex-row items-center gap-3
                    bg-blue-500
                    px-6 py-4
                    rounded-full
                    shadow-lg
                "
                style={{
                    elevation: 8, // Android shadow
                }}
            >
                <View className="w-9 h-9 rounded-full bg-white/20 items-center justify-center">
                    <Feather name="book" size={18} color="#FFF" />
                </View>

                <Text className="text-white font-semibold text-base">
                    My Courses
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    </LinearGradient>
}


