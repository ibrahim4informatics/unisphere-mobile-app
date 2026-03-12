import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {

    return (
        <LinearGradient
            colors={["#f8fbff", "#eef4ff"]}
            className="flex-1"
        >
            <SafeAreaView className="flex-1 px-6">

                <View className="flex-1 items-center justify-center">

                    {/* Logo */}
                    <Image
                        source={require("../../assets/images/unisphere-logo.png")}
                        style={{ width: 180, height: 180 }}
                        contentFit="contain"
                    />

                    {/* Title */}
                    <Text className="text-3xl font-extrabold text-blue-600 mt-6 text-center">
                        Page Not Found
                    </Text>

                    {/* Subtitle */}
                    <Text className="text-gray-500 mt-2 text-center px-6">
                        The page you are looking for doesn’t exist or has been moved.
                    </Text>

                    {/* Return Button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mt-10 bg-blue-600 px-6 py-3 rounded-full"
                    >
                        <Text className="text-white font-bold text-lg">
                            Go Back
                        </Text>
                    </TouchableOpacity>

                </View>

                {/* Footer */}
                <View className="pb-6">
                    <Text className="text-center text-gray-400 text-sm">
                        © 2026 Unisphere
                    </Text>
                </View>

            </SafeAreaView>
        </LinearGradient>
    );
}