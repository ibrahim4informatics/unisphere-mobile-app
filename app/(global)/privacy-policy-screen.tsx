import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Section = ({ title, children }: any) => (
    <View className="mb-6">
        <Text className="text-gray-900 font-bold text-lg mb-2">{title}</Text>
        <Text className="text-gray-600 leading-6">{children}</Text>
    </View>
);

export default function PrivacyPolicyScreen() {
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
                        Privacy Policy
                    </Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* Last updated */}
                    <Text className="text-gray-500 text-sm mb-6">
                        Last updated: 2026
                    </Text>

                    <View className="bg-white rounded-2xl p-5 shadow-sm">

                        <Section title="1. Information We Collect">
                            We collect information you provide directly, such as your
                            profile, posts, and messages. We also collect usage data to
                            improve the platform.
                        </Section>

                        <Section title="2. How We Use Your Information">
                            Your data is used to personalize your experience, show relevant
                            content, and maintain platform security.
                        </Section>

                        <Section title="3. Sharing Your Information">
                            We do not sell your personal information. We may share
                            information with trusted partners or as required by law.
                        </Section>

                        <Section title="4. Data Security">
                            We implement reasonable technical and administrative measures to
                            protect your data, but no system can be 100% secure.
                        </Section>

                        <Section title="5. Your Rights">
                            You can access, update, or delete your personal information by
                            contacting support.
                        </Section>

                        <Section title="6. Cookies & Tracking">
                            We use cookies and similar technologies to provide functionality
                            and analyze usage.
                        </Section>

                        <Section title="7. Changes to this Policy">
                            This privacy policy may be updated from time to time. Continued
                            use of Unisphere constitutes acceptance of the updated policy.
                        </Section>

                    </View>

                </ScrollView>

            </SafeAreaView>
        </LinearGradient>
    );
}