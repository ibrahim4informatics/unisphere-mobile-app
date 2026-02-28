import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/unisphere-logo.png";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/welcome-screen"); // better than push
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#f8fbff", "#eef4ff"]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 px-6">

        <View className="flex-1 items-center justify-center">

          {/* Logo */}
          <Image
            source={logo}
            style={{ width: 180, height: 180 }}
            contentFit="contain"
          />

          {/* App Name */}
          <Text className="text-3xl font-extrabold text-blue-600 mt-6">
            Unisphere
          </Text>

          {/* Tagline */}
          <Text className="text-gray-500 mt-2 text-center px-6">
            Academic Networking Platform
          </Text>

          {/* Loader */}
          <View className="mt-10">
            <ActivityIndicator size="large" color="#2563eb" />
          </View>

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