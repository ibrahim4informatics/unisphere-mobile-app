import timeFormat from "@/utils/timeFormatter"
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

type NotificationType =
    | "PUBLISHED_POST"
    | "COMMENT_POST"
    | "LIKE_POST"
    | "RECEIVED_MESSAGE"
    | "BOOKMARKED_POST"
    | "CONNECTION_REQUEST"
    | "CONNECTION_ACCEPTED"
    | "COURSE_ENROLLEMENT"
    | "COURSE_PUBLISHED"
    | "SYSTEM"

interface NotificationProps {
    title: string
    body: string
    type: NotificationType,
    entity_id: number,
    actor_id: string,
    is_read: boolean
    created_at: string
    onPress?: () => void
}

const getIcon = (type: NotificationType) => {
    switch (type) {
        case "LIKE_POST":
            return { name: "heart", color: "#ef4444" }
        case "COMMENT_POST":
            return { name: "chatbubble-ellipses", color: "#3b82f6" }
        case "RECEIVED_MESSAGE":
            return { name: "mail", color: "#10b981" }
        case "CONNECTION_REQUEST":
            return { name: "person-add", color: "#8b5cf6" }
        case "COURSE_PUBLISHED":
            return { name: "school", color: "#f59e0b" }
        default:
            return { name: "notifications", color: "#6b7280" }
    }
}



export const NotificationItem: React.FC<NotificationProps> = ({
    title,
    body,
    type,
    is_read,
    created_at,
    onPress,
}) => {
    const icon = getIcon(type)

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-row items-start px-4 py-3 rounded-2xl mb-3 elevation-sm ${is_read ? "bg-white" : "bg-blue-100"
                }`}
        >
            {/* Icon */}
            <View className="w-10 h-10 rounded-full items-center justify-center bg-gray-100 mr-3">
                <Ionicons name={icon.name as any} size={20} color={icon.color} />
            </View>

            {/* Content */}
            <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">
                    {title}
                </Text>

                <Text className="text-sm text-gray-500 mt-1">
                    {body}
                </Text>

                <Text className="text-xs text-gray-400 mt-2">
                    {timeFormat(created_at)}
                </Text>
            </View>

            {/* Unread dot */}
            {!is_read && (
                <View className="w-2 h-2 rounded-full bg-blue-500 mt-2 ml-2" />
            )}
        </TouchableOpacity>
    )
}