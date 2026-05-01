import SearchInput from "@/components/ui/courses/SearchInput";
import TeacherCourseCard from "@/components/ui/courses/TeacherCourseCard";
import Colors from "@/constants/Colors";
import useTeacherPublishedCourses from "@/hooks/api/queries/useTeacherPublishedCourses";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const courses = [
    {
        "id": "287d5bf0-3a0e-40ce-a9f8-4e31703af06f",
        "name": "Relational Database",
        "code": "RDB",
        "description": "An introduction to relational databases covering data modeling, SQL querying, schema design, and normalization. Students gain hands-on experience with RDBMS tools and learn to manage structured data efficiently in real-world applications.",
        "status": "REJECTED",
        "field_id": 117,
        "faculty_id": 25,
        "module_id": 3,
        "publisher_id": 2,
        "updated_at": "2026-05-01T14:13:41.857Z",
        "created_at": "2026-04-15T09:30:51.004Z",
        "studentProfileId": null,
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
        "faculty": {
            "name": "Faculty of Exact Sciences",
            "id": 25,
            "university": {
                "name": "University of Oran 1"
            }
        },
        "_count": {
            "courseEnrollments": 2,
            "courseSections": 1
        }
    }
]

export default function Courses() {

    const [filters, setFilters] = useState<{ name?: string, status?: string }>({ status: undefined, name: undefined });

    const { data, isPending, error,
        hasNextPage, isFetchingNextPage, fetchNextPage
    } = useTeacherPublishedCourses(filters);
    return <LinearGradient
        colors={["#f8fbff", "#eef4ff"]}
        className="flex-1"
    >
        <SafeAreaView className="flex-1 px-6">
            <TouchableOpacity
                className="absolute bottom-6 z-20 right-2 bg-blue-500 rounded-full px-6 py-3 items-center justify-center flex-row gap-2"
                onPress={() => {
                    router.push("./create-course")
                }}
            >

                <Feather name="plus" color={"#FFF"} size={22} />
                <Text className="text-lg font-bold text-white">New Course</Text>

            </TouchableOpacity>
            <Text className="text-2xl font-bold mt-6 mb-4">Published Courses</Text>

            {/* Search bar */}
            <SearchInput onChange={(text) => { setFilters(prev => ({ ...prev, name: text })) }} value={filters.name || ""} />

            {/* Filters Section */}

            <View className="mt-4 flex-row gap-2 flex-wrap">

                <TouchableOpacity
                    onPress={() => {
                        setFilters(prev => ({ ...prev, status: undefined }))
                    }}
                    className={`px-6 py-3 items-center justify-center rounded-full ${filters.status === undefined ? "bg-blue-200" : "bg-gray-200"}`}>
                    <Text className={`${filters.status === undefined ? "text-blue-600" : "text-gray-600"} font-bold `}>All</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => {
                        setFilters(prev => ({ ...prev, status: "PENDING" }))
                    }} className={`px-6 py-3 items-center justify-center rounded-full ${filters.status === "PENDING" ? "bg-blue-200" : "bg-gray-200"}`}>
                    <Text className={`font-bold ${filters.status === "PENDING" ? "text-blue-600" : "text-gray-600"}`}>Pending</Text>
                </TouchableOpacity>


                <TouchableOpacity className={`px-6 py-3 items-center justify-center rounded-full ${filters.status === "DRAFT" ? "bg-blue-200" : "bg-gray-200"}`}

                    onPress={() => {
                        setFilters(prev => ({ ...prev, status: "DRAFT" }))
                    }}
                >
                    <Text className={`${filters.status === "DRAFT" ? "text-blue-600" : "text-gray-600"} font-bold`}>Draft</Text>
                </TouchableOpacity>



                <TouchableOpacity

                    onPress={() => {
                        setFilters(prev => ({ ...prev, status: "REJECTED" }))
                    }}
                    className={`px-6 py-3 items-center justify-center rounded-full ${filters.status === "REJECTED" ? "bg-blue-200" : "bg-gray-200"}`}>
                    <Text className={`${filters.status === "REJECTED" ? "text-blue-600" : "text-gray-600"} font-bold`}>Rejected</Text>
                </TouchableOpacity>

            </View>


            {
                isPending ? <View className="flex-1 items-center justify-center"><ActivityIndicator size={"large"} color={Colors.blue[500]} /></View>
                    : error ? <Text className="mt-3 text-red-600 text-base">Network error,can not get published courses!</Text>
                        : <FlatList
                            data={data.pages.flatMap(page => page.courses)}

                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TeacherCourseCard
                                    course={item}

                                />
                            )}
                            contentContainerStyle={{ paddingBottom: 24 }}
                            showsVerticalScrollIndicator={false}
                            onEndReached={() => {
                                if (isFetchingNextPage || !hasNextPage) return;
                                fetchNextPage();
                            }}

                            ListEmptyComponent={() => (
                                <Text className="mt-3 text-gray-600 text-base">No matching published courses found!</Text>
                            )}

                            ListFooterComponent={() => (
                                <View className="mt-1">
                                    {isFetchingNextPage && (<ActivityIndicator size={"small"} color={Colors.blue[500]} />)}
                                    {!hasNextPage && <Text className="mt-3 text-gray-500  text-sm text-center">No more results!</Text>
                                    }

                                </View>
                            )}
                        />
            }
        </SafeAreaView>
    </LinearGradient>
}