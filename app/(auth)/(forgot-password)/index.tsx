import Card from "@/components/ui/Card";
import Spacer from "@/components/ui/Spacer";
import Colors from "@/constants/Colors";
import ForgotPasswordForm from "@/forms/auth/ForgotPasswordForm";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";





export default function Index() {
    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">

            <SafeAreaView className="flex-1 px-6">



                <KeyboardAwareScrollView

                    enableOnAndroid
                    showsVerticalScrollIndicator={false}
                    extraHeight={40}
                >



                    <View className="py-4">
                        <TouchableOpacity className="bg-white rounded-full w-10 h-10 items-center justify-center shadow" onPress={() => { router.back() }}>
                            <Feather name="arrow-left" size={20} color={Colors.blue["500"]} />
                        </TouchableOpacity>
                    </View>

                    <View className="w-32 h-32 rounded-full bg-blue-100 items-center justify-center  mx-auto mt-6 shadow-md">
                        <Feather size={60} color={Colors.blue["500"]} name="key" />
                    </View>

                    <Text className="text-3xl font-extrabold text-gray-900 mt-10 text-center">Forgot Your Password?</Text>
                    <Text className="text-gray-400 mt-3 text-center px-4 leading-6">
                        Enter your email address and we'll send you a one-time password to reset your account.

                    </Text>




                    <Card>

                        <ForgotPasswordForm />
                    </Card>



                    <Spacer spaceY="md" />
                    

                </KeyboardAwareScrollView>


            </SafeAreaView>
        </LinearGradient>
    );
}