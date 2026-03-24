import useCurrentProfile from "@/hooks/api/queries/useCurrentProfile";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setUser } from "@/store/slices/authSlice";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useRootNavigationState } from "expo-router";
import * as secureStore from "expo-secure-store";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const navigationState = useRootNavigationState();
  const dispatch = useAppDispatch();

  const clearToken = async () => {
    await secureStore.deleteItemAsync("refresh_token");
    await secureStore.deleteItemAsync("access_token");
  }

  const { data: response, isPending, error, isError } = useCurrentProfile();

  useEffect(() => {
    if (!navigationState?.key) return;
    if (isPending) return;

    if (isError) {

      if (error.code === "ERR_NETWORK") {
        router.replace("/(global)/network-error")
      }

      else {
        clearToken();
        router.replace("/(auth)/login-screen")
      }
      return;
    }
    if (response?.data?.profile) {
      dispatch(setUser(response.data.profile));
      router.replace("/(app)/(home)");
    } else {
      router.replace("/(auth)/login-screen");
    }
  }, [isPending, error]);

  return (
    <LinearGradient
      colors={["#f8fbff", "#eef4ff"]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 px-6">

        <View className="flex-1 items-center justify-center">

          {/* Logo */}
          <Image
            source={require("../assets/images/unisphere-logo.png")}
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