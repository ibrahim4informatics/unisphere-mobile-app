import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#f8fbff", "#eef4ff"]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 px-6">

        {/* Center Content */}
        <View className="flex-1 items-center justify-center">

          {/* Logo Circle */}
          <View className="w-36 h-36 bg-blue-100 rounded-full items-center justify-center shadow-lg">
            <Feather name="globe" color="#2563eb" size={85} />
          </View>

          {/* Title */}
          <Text className="mt-10 text-4xl font-extrabold text-gray-900">
            Welcome to Unisphere
          </Text>

          {/* Subtitle */}
          <Text className="mt-4 text-center text-gray-500 text-base leading-6 px-4">
            Connect with students, explore academic communities,
            and manage your courses seamlessly.
          </Text>

        </View>

        {/* Buttons Section */}
        <View className="mb-10">

          {/* Login Button */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login-screen")}
            className="w-full bg-blue-600 py-5 rounded-2xl items-center shadow-md"
            activeOpacity={0.85}
          >
            <Text className="text-white text-lg font-semibold">
              Login
            </Text>
          </TouchableOpacity>

          {/* Spacer */}
          <View className="h-4" />

          {/* Create Account Button */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/(register)")}
            className="w-full bg-white py-5 rounded-2xl items-center border border-blue-200"
            activeOpacity={0.85}
          >
            <Text className="text-blue-600 text-lg font-semibold">
              Create Account
            </Text>
          </TouchableOpacity>

        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}