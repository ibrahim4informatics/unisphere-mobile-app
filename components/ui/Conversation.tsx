// components/messages/ConversationItem.tsx

import Colors from "@/constants/Colors";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";



type Props = {

    item: any

}

export default function ConversationItem({ item }: Props) {
    return (
        <TouchableOpacity
            onPress={() => router.push(`/(app)/chat/${item.id}`)}
            className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex-row items-center mb-3"
        >
            <Image
                source={
                    item.user.avatar_url
                        ? { uri: item.user.avatar_url }
                        : require("@/assets/images/no-avatar.png")
                }
                style={{ width: 50, height: 50, borderRadius: 25 }}
            />

            <View className="flex-1 ml-4">
                <View className="flex-row justify-between items-center">
                    <Text className="font-semibold text-base text-gray-900">
                        {item.user.first_name} {item.user.last_name}
                    </Text>
                    <Text className="text-xs text-gray-400">{item.time}</Text>
                </View>

                <Text
                    numberOfLines={1}
                    className="text-sm text-gray-500 mt-1"
                >
                    {item.lastMessage}
                </Text>
            </View>

            {item.unread > 0 && (
                <View
                    style={{ backgroundColor: Colors.blue[500] }}
                    className="ml-3 px-2 py-1 rounded-full"
                >
                    <Text className="text-white text-xs font-semibold">
                        {item.unread}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}