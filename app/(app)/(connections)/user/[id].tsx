import Colors from "@/constants/Colors";
import useSendConnetion from "@/hooks/api/mutations/useSendConnection";
import useGetUser from "@/hooks/api/queries/useGetUser";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function PublicUserProfile() {

    const params: { id: string } = useLocalSearchParams();

    const { isPending, data } = useGetUser(params.id);
    const { mutateAsync: sendConnection, isPending: sendingConnection } = useSendConnetion();
    const queryClient = useQueryClient();



    if (isPending || !data) return <View className="flex-1 items-center justify-center"><ActivityIndicator size={"large"} color={Colors.blue[500]} /></View>
    const handleConnect = async () => {

        const snapshot = queryClient.getQueryData(["user", params.id]);
        if (!data || sendingConnection) return
        try {

            await sendConnection(data.user.id);
            queryClient.setQueryData(["user", params.id], (oldData: any) => {

                if (!oldData) return oldData;

                return {
                    user: {
                        ...oldData.user,
                        connection_status: "PENDING"
                    }
                }
            })
        }

        catch (err) {
            queryClient.setQueryData(["user", params.id], snapshot);
            console.log(err)
        }

    };

    const handleSendMessage = () => { }

    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">

            <SafeAreaView className="flex-1 px-6 pt-2">

                {/* Back Button */}
                <TouchableOpacity
                    className="bg-white h-11 w-11 items-center justify-center rounded-full shadow-sm mr-3 elevation-md"
                    onPress={() => router.back()}
                >
                    <Feather name="arrow-left" size={20} color={Colors.blue[500]} />
                </TouchableOpacity>



                <View className="items-center mt-6">
                    <Image
                        source={data.user.avatar_url ? { uri: data.user.avatar_url } : require("@/assets/images/no-avatar.png")}
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 60,
                            objectFit: "contain",
                        }}
                    />

                    <Text className="mt-4 text-2xl font-bold">{data.user.first_name} {data.user.last_name}</Text>
                    <View className="flex-row gap-2 items-center">
                        <FontAwesome name="university" color={Colors.gray[500]} size={18} />
                        <Text className="mt-2 text-lg text-gray-500">{data.user.role === "STUDENT" ? data.user.student_profile.university.name : data.user.teacher_profile.university.name}</Text>

                    </View>

                    <Text className="text-center bg-green-100 text-green-600 px-6 py-3 mt-2 rounded-full border border-gray-100 elevation-sm">{data.user.role}</Text>
                </View>

                <View className="flex-row items-center gap-3 justify-center mt-4">

                    <View className=" rounded-xl border bg-white elevation-sm border-gray-100 p-4 items-center w-1/2">
                        <Text className="text-xl font-bold">{data.user._count.posts}</Text>
                        <Text className="text-gray-500 font-bold">POSTS</Text>
                    </View>


                    <View className=" rounded-xl border bg-white  elevation-sm border-gray-100 p-4 items-center w-1/2" >
                        <Text className="text-xl font-bold">{data.user._count.connections}</Text>
                        <Text className="text-gray-500 font-bold">CONNECTIONS</Text>
                    </View>
                </View>

                {
                    data.user.connection_status === "PENDING" && (
                        <View className="py-4 mt-4 bg-white rounded-xl border border-gray-100 elevation-sm">
                            <Text className="text-center text-blue-500">Connection Request Sent</Text>
                        </View>
                    )
                }

                {
                    data.user.connection_status === "ACCEPTED" && (
                        <TouchableOpacity className="bg-blue-500 py-4 items-center justify-center flex-row gap-2 mt-4 rounded-xl"
                            onPress={handleSendMessage}
                        >
                            <Feather name="message-circle" color={Colors.white} size={24} />

                            <Text className="text-white font-bold">Send Message</Text>

                        </TouchableOpacity>
                    )
                }


                {
                    !data.user.connection_status && (
                        <TouchableOpacity className="bg-blue-500 py-4 items-center justify-center flex-row gap-2 mt-4 rounded-xl"
                            onPress={handleConnect}
                        >
                            {
                                sendingConnection ?
                                    <ActivityIndicator size={"small"} color={Colors.white} />
                                    : <Text className="text-white font-bold">Connect</Text>
                            }
                        </TouchableOpacity>
                    )
                }
            </SafeAreaView>
        </LinearGradient>
    )
}