// components/messages/ConversationItem.tsx

import Colors from "@/constants/Colors";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";



type Props = {

    item: any

}

export default function ConversationItem({ item }: Props) {
    const queryClient = useQueryClient();
    const profileQuery: any = queryClient.getQueryData(["profile"])

    const timeFormat = (timestamp: string) => {
        const time = new Date(timestamp).getTime();
        const now = new Date().getTime();
        const diffMs = now - time;
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffYears = Math.floor(diffDays / 365);

        if (diffSeconds < 60) return `${diffSeconds}s`;
        if (diffMinutes < 60) return `${diffMinutes}m`;
        if (diffHours < 24) return `${diffHours}h`;
        if (diffDays < 365) return `${diffDays}d`;
        return `${diffYears}y`;
    }
    return (
        <TouchableOpacity
            onPress={() => router.push(`/(app)/(messages)/${item.id}`)}
            className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex-row items-center mb-3"
        >
            <Image
                source={
                    item.participants[0].user.avatar_url
                        ? { uri: item.participants[0].user.avatar_url }
                        : require("@/assets/images/no-avatar.png")
                }
                style={{ width: 50, height: 50, borderRadius: 25 }}
            />

            <View className="flex-1 ml-4">
                <View className="flex-row justify-between items-center">
                    <Text className="font-semibold text-base text-gray-900">
                        {item.participants[0].user.first_name} {item.participants[0].user.last_name}
                    </Text>
                    <Text className="text-xs text-gray-400">{timeFormat(item.updated_at)}</Text>
                </View>

                {item.last_message && <Text
                    numberOfLines={1}
                    className={`text-sm mt-1 ${item.unread > 0 ? "text-black font-bold" : "text-gray-500"}`}
                >
                    {profileQuery.data.profile.id === item.last_message.sender_id ? `You: ${item.last_message.text}` : item.last_message.text}
                </Text>}
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