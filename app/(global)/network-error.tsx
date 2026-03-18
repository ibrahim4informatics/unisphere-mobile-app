import PrimaryButton from "@/components/ui/PrimaryButton";
import Spacer from "@/components/ui/Spacer";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NetworkErrorScreen() {
  const handleRetry = () => {
    router.replace("/");
  };

  return (
    <LinearGradient
      colors={["#f8fbff", "#eef4ff"]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 px-6">

        <View className="flex-1 items-center justify-center">

          {/* Icon */}
          <View className="bg-blue-100 p-6 rounded-full mb-6">
            <Feather name="wifi-off" size={40} color="#2563eb" />
          </View>

          {/* Title */}
          <Text className="text-2xl font-extrabold text-blue-600">
            No Internet
          </Text>

          {/* Description */}
          <Text className="text-gray-500 text-center mt-3 px-6">
            It looks like you're offline. Please check your connection and try again.
          </Text>

          {/* Retry Button */}
          {/* <Pressable
            onPress={handleRetry}
            className="mt-8 bg-blue-600 px-8 py-4 rounded-2xl w-full active:opacity-70"
          >
            <Text className="text-white text-center font-semibold text-base">
              Retry
            </Text>
          </Pressable> */}
          <Spacer spaceY="2xl" />
          <PrimaryButton
          
            onPress={handleRetry}
            title="Retry"
          />

        </View>

        {/* Footer */}
        <View className="pb-6">
          <Text className="text-center text-gray-400 text-sm">
            Unisphere
          </Text>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}