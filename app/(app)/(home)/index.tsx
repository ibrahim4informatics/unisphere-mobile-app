import CreatePostField from "@/components/ui/CreatePostField";
import Post from "@/components/ui/Post";
import Spacer from "@/components/ui/Spacer";
import Colors from "@/constants/Colors";
import useCurrentProfile from "@/hooks/api/queries/useCurrentProfile";
import useFeedPosts from "@/hooks/api/queries/usePosts";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setUser } from "@/store/slices/authSlice";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeScreen() {

    const dispatch = useAppDispatch();

    const { data, isPending, error, refetch } = useFeedPosts({ page: 1 });

    const { data: profileData, isPending: profileLoading, error: profileError, isError: isProfileError } = useCurrentProfile();

    useFocusEffect(
        React.useCallback(() => {

            refetch();
        }, [])
    );

    useFocusEffect(useCallback(() => {

        if (profileLoading) return;

        if (isProfileError) {
            if (profileError.code === "ERR_NETWORK") {
                router.replace("/(global)/network-error");
            }

            else {
                router.replace("/(auth)/login-screen")
            }

            return;
        }

        if(profileData.data?.profile){
            dispatch(setUser(profileData.data.profile));
        }
    }, [profileLoading]))


    if (isPending || profileLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size={"large"} color={Colors.blue[500]} />

            </View>
        )
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
                    onPress={()=>{
                        router.push("/(global)/notifications-screen")
                    }}
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

                                <CreatePostField />
                            </>
                        )}

                        renderItem={({ index, item }) => (<Post onPress={() => { router.push(`/(app)/(home)/${item.id}?back=home`) }} post={item} />)}
                    />
                )}
            </SafeAreaView>
        </LinearGradient>
    )
}