import Card from "@/components/ui/Card";
import Spacer from "@/components/ui/Spacer";
import Colors from "@/constants/Colors";
import ResetPasswordForm from "@/forms/auth/ResetPasswordForm";
import useAppSelect from "@/hooks/useAppSelect";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPasswordScreen() {

    const reset_token = useAppSelect(state=>state.auth.reset_token);

    useEffect(()=>{
        console.log(reset_token)
    },[])
    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">

            <SafeAreaView className="flex-1 px-6">



                <KeyboardAwareScrollView

                    enableOnAndroid
                    showsVerticalScrollIndicator={false}
                    enableAutomaticScroll
                    extraHeight={40}
                >

                    <View className="w-32 h-32 rounded-full bg-blue-100 items-center justify-center  mx-auto mt-6 shadow-md">
                        <AntDesign size={60} color={Colors.blue["500"]} name="lock" />
                    </View>

                    <Text className="text-3xl font-extrabold text-gray-900 mt-10 text-center">Almost Done</Text>
                    <Text className="text-gray-500 text-sm mt-4 text-center px-4 leading-6">
                        Enter a strong password to secure your account
                    </Text>

                    <Card>

                        <ResetPasswordForm />
                    </Card>

                    <Spacer spaceY="md" />


                </KeyboardAwareScrollView>



            </SafeAreaView>
        </LinearGradient>
    );

}