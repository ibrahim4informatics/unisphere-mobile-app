import Spacer from "@/components/ui/Spacer";
import Colors from "@/constants/Colors";
import useUserBookmarks from "@/hooks/api/queries/useUserBookmarks";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BoomarksScreen() {
    const {
        data,
        isPending,
        error,
    } = useUserBookmarks();


    if (isPending) return (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator size={"large"} color={Colors.blue[500]} />
        </View>
    )

    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">
            <SafeAreaView className="flex-1 px-5">

                {/* Header */}
                <View className="flex-row items-center mb-6 pt-4">
                    <TouchableOpacity
                        className="bg-white h-11 w-11 items-center justify-center rounded-full shadow-sm mr-3"
                        onPress={() => router.back()}
                    >
                        <Feather name="arrow-left" size={20} color={Colors.blue[500]} />
                    </TouchableOpacity>

                    <Text className="text-2xl font-extrabold text-gray-900">
                        Bookmarks
                    </Text>
                </View>
                <FlatList
                    contentContainerClassName={data?.bookmarks.length === 0 ? "flex-1" : ""}
                    keyExtractor={(item) => item.id.toString()}
                    data={data?.bookmarks}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { router.push(`/(app)/(home)/${item.post_id}?back=bookmarks`) }} className="border border-gray-100 bg-white rounded-xl py-4 px-6">
                            {/* Author */}

                            <View className="flex-row items-center gap-3">
                                <Image
                                    source={
                                        item.post.author.avatar_url
                                            ? { uri: item.post.author.avatar_url }
                                            : require("@/assets/images/no-avatar.png")
                                    }
                                    style={{ width: 40, height: 40, borderRadius: 20 }}
                                />
                                <Text className="font-medium text-base">
                                    {item.post.author.first_name} {item.post.author.last_name}
                                </Text>
                            </View>



                            <Spacer spaceY="sm" />

                            {/* Content */}
                            <Text className="text-base">{item.post.content}</Text>

                            <Spacer spaceY="sm" />

                            {/* Media Attachments */}
                            {item.post.postMedias.length > 0 && (
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ paddingRight: 12 }}
                                >
                                    {item.post.postMedias.map((media) => (
                                        <View key={media.id} style={{ marginRight: 10, position: "relative" }}>
                                            {media.type === "IMAGE" ? (
                                                <Image

                                                    source={{ uri: media.url }}
                                                    style={{ width: 120, height: 120, borderRadius: 12, borderWidth: 1, borderColor: Colors.gray[200] }}
                                                />
                                            ) : (
                                                <TouchableOpacity
                                                    style={{
                                                        width: 120,
                                                        height: 120,
                                                        borderRadius: 12,
                                                        backgroundColor: "#f3f4f6",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        padding: 8,
                                                    }}
                                                    onPress={() => Linking.openURL(media.url)}
                                                >
                                                    <Feather name="file-text" size={24} />
                                                    <Text numberOfLines={1} ellipsizeMode="tail" className="text-sm mt-1">
                                                        {media.url.split("/").pop()}
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    ))}
                                </ScrollView>
                            )}


                        </TouchableOpacity>
                    )}
                    onEndReached={() => { }}
                    ListEmptyComponent={() => (<View className="flex-1  items-center justify-center">
                        <Text className="text-gray-500">Nothing bookmared yet.</Text>
                    </View>)}
                />

            </SafeAreaView>
        </LinearGradient>
    )
}