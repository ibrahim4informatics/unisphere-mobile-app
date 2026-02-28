import Card from "@/components/ui/Card";
import Spacer from "@/components/ui/Spacer";
import Colors from "@/constants/Colors";
import StudentLoginForm from "@/forms/auth/StudentLoginForm";
import TeacherLoginForm from "@/forms/auth/TeacherLoginForm";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
    const router = useRouter();
    const [loginType, setLoginType] = useState<"STUDENT" | "TEACHER">("STUDENT");
    return (

        <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">
            <SafeAreaView className="flex-1  px-6">

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    enableOnAndroid={true}
                    extraScrollHeight={40}   // small extra spacing above keyboard
                    keyboardShouldPersistTaps="handled"
                >




                    <View className="py-4">
                        <TouchableOpacity className="bg-white rounded-full w-10 h-10 items-center justify-center shadow" onPress={() => { router.back() }}>
                            <Feather name="arrow-left" size={20} color={Colors.blue["500"]} />
                        </TouchableOpacity>
                    </View>

                    <View className="w-32 h-32 rounded-full bg-blue-100 items-center justify-center  mx-auto mt-6 shadow-md">
                        <Feather size={60} color={Colors.blue["500"]} name="lock" />
                    </View>

                    <Text className="text-3xl font-extrabold text-gray-900 mt-10 text-center">Welcome Back</Text>
                    <Text className="text-gray-400 mt-3 text-center px-4 leading-6">
                        Sign in to continue to your academic dashboard and
                        manage your activities.
                    </Text>

                    <View className="mt-10 bg-gray-100 p-1 rounded-2xl flex-row">
                        <TouchableOpacity
                            onPress={() => setLoginType("STUDENT")}
                            activeOpacity={0.9}
                            className={`flex-1 py-3 rounded-xl items-center ${loginType === "STUDENT"
                                ? "bg-white elevation-sm"
                                : ""
                                }`}
                        >
                            <Text
                                className={`${loginType === "STUDENT"
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-500"
                                    }`}
                            >
                                Student
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setLoginType("TEACHER")}
                            activeOpacity={0.9}
                            className={`flex-1 py-3 rounded-xl items-center ${loginType === "TEACHER"
                                ? "bg-white elevation-sm"
                                : ""
                                }`}
                        >
                            <Text
                                className={`${loginType === "TEACHER"
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-500"
                                    }`}
                            >
                                Teacher
                            </Text>
                        </TouchableOpacity>
                    </View>



                    <Card>
                        {
                            loginType === "STUDENT" ? <StudentLoginForm /> : <TeacherLoginForm />
                        }

                        <Spacer spaceY="md" />

                        {/* Forgot Password */}

                        <Link href={"/(auth)/(forgot-password)"}>
                            <Text className="text-blue-600 text-sm font-medium text-right">
                                Forgot password?
                            </Text>
                        </Link>
                    </Card>



                    <Spacer spaceY="md" />
                    <Link href={"/(auth)/(register)"}>
                        <Text className="text-gray-500 text-center text-sm">
                            Don't have an account?{" "}
                            <Text className="text-blue-600 font-semibold">
                                Register
                            </Text>
                        </Text>
                    </Link>



                </KeyboardAwareScrollView>


            </SafeAreaView>
        </LinearGradient>
    )
}

export default LoginScreen;