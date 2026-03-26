import Post from "@/components/ui/Post";
import ProfileHeader from "@/components/ui/ProfileHeader";
import Colors from "@/constants/Colors";
import useCurrentProfile from "@/hooks/api/queries/useCurrentProfile";
import useMyPosts from "@/hooks/api/queries/useMyPosts";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";





export default function UserProfileScreen() {

    const { isPending: loadingProfile, error: profileResponseError, data: profileData } = useCurrentProfile();


    const { data: postsResponse, isPending: postsAreLoading, error: postsError, fetchNextPage, isFetchingNextPage, hasNextPage } = useMyPosts();

    useFocusEffect(useCallback(() => {
        if (profileResponseError?.code === "ERR_NETWORK") {
            router.replace("/(global)/network-error");
            return;
        }

    }, [loadingProfile]));



    if (loadingProfile || postsAreLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size={"large"} color={Colors.blue[500]} />
            </View>
        )
    }
    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]}
            className="flex-1">
            <SafeAreaView edges={["top", "left", "right"]} className="flex-1 px-6 ">

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





                <KeyboardAwareFlatList

                    showsVerticalScrollIndicator={false}

                    ListHeaderComponent={() => <ProfileHeader user={profileData?.data.profile} />}
                    data={postsResponse?.pages.flatMap(page => page.posts)}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Post post={item} />}

                    ListFooterComponent={() => (
                         isFetchingNextPage && <View className="mt-1"><ActivityIndicator size={"small"} color={Colors.blue[500]} /></View>

                    )}
                onEndReached={async () => {

                    if (!isFetchingNextPage && hasNextPage) {

                        try {
                            await fetchNextPage()
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }
                }}

                />



            </SafeAreaView>
        </LinearGradient>
    )
}



// <View className="flex-row items-center py-6 px-2">

//     {/* Avatar with subtle border */}
//     <View className="p-[2px] rounded-full bg-blue-500">
//         <Image
//             source={{
//                 uri: "https://imgs.search.brave.com/Lmq1cCEdOkJIQS06K7YgNDCmvZluInPka6iKOxgzpVo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ1/NTM0MzI4Mi9waG90/by9wb3J0cmFpdC1v/Zi1hbi1pbmRpYW4t/bWFuLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz12MEZVVWd1/UkJKTEt0c1NXMmtG/d1ZxcWllS2ZUVDdV/TEtIcGU2bjdNd3ZF/PQ"
//             }}
//             style={{
//                 width: 80,
//                 height: 80,
//                 borderRadius: 999,
//             }}
//             contentFit="cover"
//         />
//     </View>

//     {/* User Info */}
//     <View className="flex-1 px-4">

//         <Text className="text-black text-xl font-extrabold">
//             John Smith
//         </Text>

//         <Text className="text-gray-500 text-sm mt-1">
//             Computer Science Student
//         </Text>

//     </View>

//     {/* Settings Button */}
//     <TouchableOpacity
//         className="bg-gray-100 p-3 rounded-xl active:opacity-70 shadow-sm"
//     >
//         <Feather name="settings" size={20} color={Colors.gray[700]} />
//     </TouchableOpacity>

// </View>