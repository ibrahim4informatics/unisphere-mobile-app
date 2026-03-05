import PrimaryButton from "@/components/ui/PrimaryButton";
import Spacer from "@/components/ui/Spacer";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterSuccess() {
    return (
        <LinearGradient
            colors={["#f0f6ff", "#ffffff"]}
            className="flex-1"
        >
            <SafeAreaView className="flex-1 px-6">


                {/* Icon Section */}
                <View className="items-center justify-center flex-1">
                    <View className="w-28 h-28 rounded-full bg-green-100 items-center justify-center shadow-lg">
                        <MaterialIcons
                            size={60}
                            color={Colors.green["500"]}
                            name="check"
                        />
                    </View>

                    <Text className="text-3xl font-extrabold mt-6 text-gray-800">
                        Done!
                    </Text>

                    <Text className="text-gray-400 text-center mt-3 px-6 leading-5">
                        You can know access the plateform thank you for joining us
                    </Text>
                </View>


                <PrimaryButton title="Login Now" onPress={() => { router.replace("/(auth)/login-screen") }} />
                <Spacer spaceY="3xl" />
            </SafeAreaView>
        </LinearGradient >
    )
}