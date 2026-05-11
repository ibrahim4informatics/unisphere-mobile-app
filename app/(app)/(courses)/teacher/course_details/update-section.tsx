import Colors from "@/constants/Colors";
import UpdateSectionForm from "@/forms/course/UpdateSectionForm";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdateSection() {

    const { course_id, section_id }: { [key: string]: string } = useLocalSearchParams()
 
    return (<LinearGradient
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
                    Update Section
                </Text>

            </View>

            <UpdateSectionForm course_id={course_id} section_id={section_id} />
        </SafeAreaView>
    </LinearGradient>
    )
}


