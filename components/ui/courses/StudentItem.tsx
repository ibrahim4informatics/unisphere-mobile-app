import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Text, View } from "react-native";

type Props = {
    student: any;
};

export function StudentItem({ student }: Props) {
    return (
        <View className="bg-white rounded-3xl p-5 mb-4 shadow-md border border-blue-50">

            {/* Top Row */}
            <View className="flex-row items-center justify-between">

                <View className="flex-row items-center gap-4 flex-1">

                    {/* Avatar */}
                    <Image
                        source={student.avatar_url ? { uri: student.avatar_url } : require("@/assets/images/no-avatar.png")}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        contentFit="cover"
                    />

                    {/* Info */}
                    <View className="flex-1">

                        <Text className="text-lg font-bold text-primary">
                            {student.first_name} {student.last_name}
                        </Text>

                        <View className="flex-row items-center gap-2 mt-1">
                            <Feather name="hash" size={14} color={Colors.blue[500]} />
                            <Text className="text-sm text-gray-500">
                                Student ID: {student.student_id}
                            </Text>
                        </View>

                        <View className="flex-row items-center gap-2 mt-1">
                            <Feather name="user" size={14} color={Colors.gray[400]} />
                            <Text
                                numberOfLines={1}
                                className="text-xs text-gray-400"
                            >
                                {student.id}
                            </Text>
                        </View>

                    </View>
                </View>
            </View>
        </View>
    );
}