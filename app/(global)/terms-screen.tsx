import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Section = ({ title, children }: any) => (
    <View className="mb-6">
        <Text className="text-gray-900 font-bold text-lg mb-2">
            {title}
        </Text>
        <Text className="text-gray-600 leading-6">
            {children}
        </Text>
    </View>
);

export default function TermsScreen() {
    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">
            <SafeAreaView className="flex-1 px-5 pt-4">

                {/* Header */}
                <View className="flex-row items-center mb-6">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="bg-white h-11 w-11 items-center justify-center rounded-full shadow-sm mr-3"
                    >
                        <Feather name="arrow-left" size={20} color={Colors.blue[500]} />
                    </TouchableOpacity>

                    <Text className="text-2xl font-extrabold text-gray-900">
                        Terms of Use
                    </Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* Intro */}
                    <Text className="text-gray-500 text-sm mb-6">
                        Last updated: 2026
                    </Text>

                    <View className="bg-white rounded-2xl p-5 shadow-sm">

                        <Section title="1. Acceptance of Terms">
                            By using Unisphere, you agree to these terms. If you do not agree,
                            please do not use the platform.
                        </Section>

                        <Section title="2. Use of the Platform">
                            Unisphere is an academic networking platform. You agree to use it
                            respectfully and not engage in harmful, abusive, or illegal
                            activities.
                        </Section>

                        <Section title="3. User Content">
                            You are responsible for the content you post. Do not share
                            misleading, offensive, or unauthorized content.
                        </Section>

                        <Section title="4. Privacy">
                            Your data is handled according to our Privacy Policy. We aim to
                            protect your information but cannot guarantee absolute security.
                        </Section>

                        <Section title="5. Account Responsibility">
                            You are responsible for maintaining the security of your account
                            and credentials.
                        </Section>

                        <Section title="6. Termination">
                            We may suspend or terminate accounts that violate these terms or
                            harm the platform.
                        </Section>

                        <Section title="7. Changes to Terms">
                            These terms may be updated over time. Continued use means you
                            accept the updated terms.
                        </Section>

                    </View>

                </ScrollView>

            </SafeAreaView>
        </LinearGradient>
    );
}