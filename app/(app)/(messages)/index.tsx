// ConversationsScreen.tsx

import ConversationItem from "@/components/ui/Conversation";
import Colors from "@/constants/Colors";
import useUserChats from "@/hooks/api/queries/useUserChats";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
// import { conversations } from "@/dummyMessages";

// dummyMessages.ts
export const conversations = [
    {
        id: "1",
        user: {
            id: "u1",
            first_name: "Ahmed",
            last_name: "Benali",
            avatar_url: "https://res.cloudinary.com/djn33vea9/image/upload/v1774302431/users/56949d61-5a38-4376-8bf6-df5dffa0affc/profile_pictures/i0gvbii2xb0npdq8nnyv.jpg",
        },
        lastMessage: "Hey bro, are we meeting today?",
        time: "2m",
        unread: 12,
    },
    {
        id: "2",
        user: {
            id: "u2",
            first_name: "Sara",
            last_name: "Khaled",
            avatar_url: null,
        },
        lastMessage: "Sent the files 👍",
        time: "1h",
        unread: 0,
    },
]
export default function ConversationsScreen() {
    const insets = useSafeAreaInsets();
    const {
        data,
        isPending,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useUserChats();

    if (isPending || !data) return <View className="flex-1 items-center justify-center"><ActivityIndicator size={"large"} color={Colors.blue[500]} /></View>
    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">

            <TouchableOpacity
                activeOpacity={0.85}
                className="flex-row items-center absolute right-5 px-5 py-4 rounded-full"
                style={{
                    bottom: insets.bottom + 20,
                    backgroundColor: Colors.blue[500],
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    elevation: 8,
                    zIndex: 999
                }}
            >
                <Feather name="plus" size={22} color="white" />
                <Text className="text-white text-base font-semibold ml-2">
                    New Chat
                </Text>
            </TouchableOpacity>
            <SafeAreaView className="flex-1 px-5">

                {/* Header */}
                <View className="flex-row items-center mb-6 pt-4">

                    <Text className="text-2xl font-extrabold text-gray-900">
                        Messages
                    </Text>
                </View>

                <FlatList
                    data={data.pages.flatMap(page => page.chats)}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ConversationItem item={item} />}
                    showsVerticalScrollIndicator={false}
                    onEndReached={() => {

                        if (isFetchingNextPage || !hasNextPage) return;
                        fetchNextPage()
                    }}

                    ListFooterComponent={() => (
                        isFetchingNextPage && (<View className="mt-2 items-center justify-center"><ActivityIndicator size={"small"} color={Colors.blue[500]} /></View>)
                    )}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}