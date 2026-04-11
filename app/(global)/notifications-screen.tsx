import { NotificationItem } from "@/components/ui/Notification";
import Colors from "@/constants/Colors";
import useUserNotifications from "@/hooks/api/queries/useUserNotifications";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const navigateNotification = (notification: any) => {

    switch (notification.type) {

        case "BOOKMARKED_POST": case "COMMENT_POST": case "PUBLISHED_POST": case "LIKE_POST":
            if (notification.entity_id) {
                router.push(`/(home)/${notification.entity_id}`)
            }
            break;
        case "CONNECTION_ACCEPTED": case "CONNECTION_REQUEST":
            if (notification.actor_id) {
                router.push(`/(connections)/user/${notification.actor_id}`)
            }
            break;
        case "COURSE_ENROLLEMENT": case "COURSE_PUBLISHED":
            //TODO: navigate to course    
            console.log("Not implemented")
            break;
        case "RECEIVED_MESSAGE":
            if (notification.entity_id) {
                router.push(`/(messages)/${notification.entity_id}`)
            }
            break;
        default:
            break
    }
}

export default function NotificationsScreen() {

    const {
        data: notificationsResponse, isPending: notificationsLoading, error: notificationsError,
        hasNextPage: notificationsHasMore, fetchNextPage: fetchMoreNotifications, isFetchingNextPage: notificationsLoadingMore

    } = useUserNotifications();

    return (
        <LinearGradient
            colors={["#f8fbff", "#eef4ff"]}
            className="flex-1"
        >
            {
                notificationsLoading ? (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size={"large"} color={Colors.blue[500]} />
                    </View>
                ) :
                    (
                        <SafeAreaView className="flex-1 px-6 pt-2" edges={["top", "left", "right"]}>
                            {/* Header */}
                            <View className="flex-row items-center px-4 py-4">
                                <TouchableOpacity
                                    onPress={() => router.back()}
                                    className="mr-3 h-12 w-12 bg-white items-center justify-center rounded-full elevation-sm"
                                >
                                    <Feather name="arrow-left" size={24} color={Colors.blue[500]} />
                                </TouchableOpacity>

                                <Text className="text-xl font-bold text-gray-900">
                                    Notifications
                                </Text>
                            </View>

                            {/* List */}
                            <FlatList
                                data={notificationsResponse?.pages.flatMap(page => page.notifications)}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={{ padding: 16 }}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <NotificationItem
                                        entity_id={item.entity_id}
                                        actor_id={item.actor_id}
                                        title={item.title}
                                        body={item.body}
                                        type={item.type as any}
                                        is_read={item.is_read}
                                        created_at={item.created_at}
                                        onPress={() => {console.log("Open notification", item.id); navigateNotification(item)}}
                                    />
                                )}

                                onEndReached={() => {
                                    if (!notificationsHasMore || notificationsLoadingMore) return;
                                    fetchMoreNotifications();
                                }}

                                ListFooterComponent={() => notificationsLoadingMore && <View className="py-4 items-center justify-center"><ActivityIndicator size={"small"} color={Colors.blue[500]} /></View>}
                            />
                        </SafeAreaView>
                    )
            }
        </LinearGradient>
    )
}