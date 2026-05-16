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



export default function Courses() {

    const [filters, setFilters] = useState<{ name?: string, status?: string }>({ status: undefined, name: undefined });

    const { data, isPending, error,
        hasNextPage, isFetchingNextPage, fetchNextPage, isRefetching, refetch
    } = useTeacherPublishedCourses(filters);
    return <LinearGradient
        colors={["#f8fbff", "#eef4ff"]}
        className="flex-1"
    >
        <SafeAreaView className="flex-1 px-6">

            <TouchableOpacity
                onPress={() => {
                    router.push("./create-course")

                }}
                activeOpacity={0.85}
                className="absolute bottom-6 right-5 z-20 bg-blue-500 px-6 py-4 rounded-full flex-row items-center gap-3 shadow-xl"
            >
                {/* Icon Container */}
                <View className="w-9 h-9 rounded-full bg-white/20 items-center justify-center">
                    <Feather name="plus" size={18} color={Colors.white} />
                </View>

                <Text className="text-white text-base font-semibold tracking-wide">
                    Create Course
                </Text>
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

                            refreshing={isRefetching}
                            onRefresh={() => {
                                refetch()
                            }}

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