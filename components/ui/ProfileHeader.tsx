import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";


type Props = {
    user: {
        id: string,
        first_name: string,
        last_name: string,
        bio: string,
        avatar_url?: string | null,
        role: string,
        _count: {
            [key: string]: number
        }
    }
}

export default function ProfileHeader({ user }: Props) {


    return (
        <View className="mb-6">
            <View className="flex-row items-start py-6 px-2">

                {/* Avatar */}
                <View className="p-[2px] rounded-full bg-gray-200">
                    <Image
                        source={user?.avatar_url ? { uri: user?.avatar_url } : require("@/assets/images/no-avatar.png")}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 999,
                        }}
                        contentFit="cover"
                    />
                </View>

                {/* User Info */}
                <View className="flex-1 px-4">

                    <Text className="text-black text-xl font-extrabold">
                        {user?.first_name} {user.last_name}
                    </Text>

                    {/* 🔥 Role Badge */}
                    <View className={`mt-2 self-start rounded-full overflow-hidden flex-row items-center px-3 py-1 ${user.role === "STUDENT" ? "bg-green-600" : "bg-blue-600"}`}>

                        <Feather name={user.role === "STUDENT" ? "book" : "award"} size={12} color="white" />

                        <Text className="text-white text-xs font-bold ml-1 uppercase tracking-wide">
                            {user.role}
                        </Text>
                    </View>


                </View>

                {/* Settings */}
                <TouchableOpacity
                    className="bg-gray-100 p-3 rounded-xl active:opacity-70 shadow-sm elevation-md"
                    onPress={() => {
                        router.push("/settings-screen");
                    }}
                >
                    <Feather name="settings" size={20} color={Colors.gray[700]} />
                </TouchableOpacity>

            </View>

            <Text className=" text-gray-600 leading-3">{user.bio}</Text>

            <View className="flex-row py-4 gap-3">

                {/* POSTS */}
                <View className="flex-1 bg-white border border-gray-200 rounded-2xl p-5 items-center justify-center shadow-sm">
                    <Text className="text-3xl font-extrabold ">
                        {user._count.posts}
                    </Text>
                    <Text className="text-gray-400 text-xs mt-1 uppercase tracking-wide">
                        Posts
                    </Text>
                </View>

                {/* BOOKMARKS */}
                <View className="flex-1 bg-white border border-gray-200 rounded-2xl p-5 items-center justify-center shadow-sm">
                    <Text className="text-3xl font-extrabold ">
                        {user._count.bookmarks}
                    </Text>
                    <Text className="text-gray-400 text-xs mt-1 uppercase tracking-wide">
                        Bookmarks
                    </Text>
                </View>

                {/* CONNECTIONS */}
                <View className="flex-1 bg-white border border-gray-200 rounded-2xl p-5 items-center justify-center shadow-sm">
                    <Text className="text-3xl font-extrabold">
                        {user._count.connections}
                    </Text>
                    <Text className="text-gray-400 text-xs mt-1 uppercase tracking-wide">
                        Connections
                    </Text>
                </View>

            </View>

            <Text className="text-blue-600 text-lg font-bold">Posts</Text>

        </View>
    );
}