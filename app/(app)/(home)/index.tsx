import CreatePostField from "@/components/ui/CreatePostField";
import Post from "@/components/ui/Post";
import Spacer from "@/components/ui/Spacer";
import Colors from "@/constants/Colors";
import useFeedPosts from "@/hooks/api/queries/usePosts";
import { bookmarkPost, likePost, setPostCounts } from "@/store/slices/postsSlice";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import * as secureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeScreen() {

    const { data, isPending, error, refetch } = useFeedPosts({ page: 1 })


    useFocusEffect(
        React.useCallback(() => {

            refetch();
        }, [])
    )

    useEffect(() => {

        // if(isPending) return;

        if (data?.posts) {
            data.posts.forEach((p: any) => {
                setPostCounts({post_id:p.id, booksmarks:p._count.booksmarks, likes:p._count.likes});
                if(p.is_liked){
                    likePost(p.id)
                }

                if(p.is_booked){
                    bookmarkPost(p.id)
                }
            })
        }
    }, [data])



    const handleLogout = async () => {
        await secureStore.deleteItemAsync("refresh_token");
        await secureStore.deleteItemAsync("access_token");
        router.replace("/(auth)/login-screen")

    }


    return (
        <LinearGradient
            colors={["#f8fbff", "#eef4ff"]}
            className="flex-1"
        >
            <SafeAreaView className="flex-1 px-6 pt-2" edges={["top", "left", "right"]}>

                {/* Top Section */}

                <View className="flex-row items-center justify-between">
                    <Image
                        source={require("@/assets/images/unisphere-logo.png")}
                        style={{ width: 100, height: 100 }}
                        contentFit="contain"
                    />
                    <TouchableOpacity
                        className="mr-3 bg-white rounded-full items-center justify-center"
                        style={{
                            width: 44,
                            height: 44,
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowRadius: 6,
                            shadowOffset: { width: 0, height: 2 },
                            elevation: 3,
                        }}
                    >
                        <Feather name="bell" size={22} color="#111" />

                        <View
                            style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: "#ef4444",
                            }}
                        />
                    </TouchableOpacity>
                </View>
                {isPending ? (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size={"large"} color={Colors.blue[600]} />
                    </View>
                ) : (
                    <KeyboardAwareFlatList
                        ListEmptyComponent={() => (
                            <View className="mt-6">
                                <Text className="text-gray-500">No Posts Found</Text>
                            </View>
                        )}

                        className="flex-1"
                        contentContainerStyle={{
                            padding: 0,

                        }}
                        showsVerticalScrollIndicator={false}
                        data={data?.posts || []}


                        ListHeaderComponent={() => (
                            <>


                                <Spacer spaceY="md" />

                                <CreatePostField onSubmit={() => { }} />
                            </>
                        )}

                        renderItem={({ index, item }) => (<Post onPress={() => { console.log(item.id) }} post={item} />)}
                    />
                )}
            </SafeAreaView>
        </LinearGradient>
    )
}