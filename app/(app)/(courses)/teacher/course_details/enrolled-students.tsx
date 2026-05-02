import { StudentItem } from "@/components/ui/courses/StudentItem";
import Colors from "@/constants/Colors";
import useEnrolledStudentsList from "@/hooks/api/queries/useEnrolledStudentsList";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function EnrolledStudents() {
    const { course_id }: { course_id: string } = useLocalSearchParams();

    const { data, isPending, error } = useEnrolledStudentsList(course_id)

    return (

        <LinearGradient
            colors={["#f8fbff", "#eef4ff"]}
            className="flex-1"
        >
            <SafeAreaView className="flex-1 px-6">


                {/* Header */}
                <View className="flex-row items-center gap-4 mt-4 mb-8">

                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-11 h-11 rounded-full bg-white border border-gray-200 items-center justify-center"
                    >
                        <Feather name="arrow-left" size={20} color={Colors.blue[500]} />
                    </TouchableOpacity>

                    <Text className="text-2xl font-extrabold text-primary">
                        Students Enrolled
                    </Text>
                </View>


                {
                    isPending ? <View className="flex-1"><ActivityIndicator size={"large"} color={Colors.blue[500]} /></View> :
                        error ? <Text className="mt-2 text-base text-red-600">Network error,can not get students list</Text> :
                            <FlatList
                                data={data.pages.flatMap(page=> page.students)}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={{ paddingVertical: 24 }}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <StudentItem
                                        student={item}
                                    />
                                )}
                                ListEmptyComponent={
                                    <View className="items-center mt-12">
                                        <Text className="text-gray-400">
                                            No students enrolled yet.
                                        </Text>
                                    </View>
                                }
                            />
                }
            </SafeAreaView>
        </LinearGradient>

    )
}