import Card from "@/components/ui/Card";
import Colors from "@/constants/Colors";
import CreateStudentProfile from "@/forms/profile/CreateStudentProfile";
import CreateTeacherProfile from "@/forms/profile/CreateTeacherProfile";
import useAppSelect from "@/hooks/useAppSelect";
import { Feather } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import {
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileSetup = () => {
    const router = useRouter();
    const user = useAppSelect(state => state.auth.user);

    useEffect(() => {
        if (!user) router.replace("/(auth)/(register)");
    }, []);




    return (
        <LinearGradient
            colors={["#f0f6ff", "#ffffff"]}
            className="flex-1"
        >
            <SafeAreaView className="flex-1 px-6">
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    enableOnAndroid={true}
                    extraScrollHeight={20}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mt-4 w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
                    >
                        <Feather
                            size={20}
                            color={Colors.blue["500"]}
                            name="arrow-left"
                        />

                    </TouchableOpacity>

                    {/* Icon Section */}
                    <View className="items-center mt-10">
                        <View className="w-28 h-28 rounded-full bg-blue-100 items-center justify-center shadow-lg">
                            <FontAwesome5 name="university" size={60} color={Colors.blue["500"]} />

                        </View>

                        <Text className="text-3xl font-extrabold mt-6 text-gray-800">
                            Academic Informations
                        </Text>

                        <Text className="text-gray-400 text-center mt-3 px-6 leading-5">
                            UniSphere needs this informations to setup the profile for you!
                        </Text>
                    </View>


                    <Card>

                        {user?.role === "STUDENT" ? (
                            <CreateStudentProfile />
                        ) : <CreateTeacherProfile />}


                    </Card>

                    <Link href={"/login-screen"} className="mt-4">
                        <Text className="text-gray-400 text-center">Already have an acount? <Text className="text-blue-500 font-extrabold">Login</Text></Text>
                    </Link>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </LinearGradient >
    );
};

export default ProfileSetup;