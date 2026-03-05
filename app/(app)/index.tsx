import PrimaryButton from "@/components/ui/PrimaryButton";
import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeScreen() {

    const handleLogout = async()=>{

        await secureStore.deleteItemAsync("refresh_token");
        await secureStore.deleteItemAsync("access_token");
        router.replace("/(auth)/login-screen")

    }
    return (
        <SafeAreaView className="flex-1">
            <Text>Home</Text>
            <PrimaryButton title="Sign-out" onPress={handleLogout} />
        </SafeAreaView>
    )
}