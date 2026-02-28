import Colors from "@/constants/Colors";
import RegisterPersonalDataForm from "@/forms/auth/RegisterPersonalData";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import {
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterPersonalScreen = () => {
    const router = useRouter();

    return (
        <LinearGradient
            colors={["#f0f6ff", "#ffffff"]}
            className="flex-1"
        >
            <SafeAreaView className="flex-1 px-6">
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    enableOnAndroid={true}
                    extraScrollHeight={20}   // small extra spacing above keyboard
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mt-4 w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
                    >
                        <Feather name="arrow-left" size={20} color={Colors.blue["500"]} />
                    </TouchableOpacity>

                    {/* Icon Section */}
                    <View className="items-center mt-10">
                        <View className="w-28 h-28 rounded-full bg-blue-100 items-center justify-center shadow-lg">
                            <Feather
                                size={60}
                                color={Colors.blue["500"]}
                                name="user-plus"
                            />
                        </View>

                        <Text className="text-3xl font-extrabold mt-6 text-gray-800">
                            More About You
                        </Text>

                        <Text className="text-gray-400 text-center mt-3 px-6 leading-5">
                            UniSphere needs this informations to setup the profile for you!
                        </Text>
                    </View>


                    <RegisterPersonalDataForm />

                    <Link href={"/login-screen"} className="mt-4">
                        <Text className="text-gray-400 text-center">Already have an acount? <Text className="text-blue-500 font-extrabold">Login</Text></Text>
                    </Link>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </LinearGradient >
    );
};

export default RegisterPersonalScreen;