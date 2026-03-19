import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HelpItem = ({ icon, title, subtitle }: any) => (
  <TouchableOpacity className="flex-row items-center py-4 px-3 rounded-xl active:opacity-70">
    
    {/* Icon */}
    <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
      <Feather name={icon} size={18} color={Colors.blue[600]} />
    </View>

    {/* Text */}
    <View className="flex-1">
      <Text className="text-base font-semibold text-gray-800">
        {title}
      </Text>
      <Text className="text-xs text-gray-400 mt-0.5">
        {subtitle}
      </Text>
    </View>

    {/* Arrow */}
    <Feather name="chevron-right" size={18} color={Colors.gray[400]} />
  </TouchableOpacity>
);

export default function HelpScreen() {
  return (
    <LinearGradient
      colors={["#f8fbff", "#eef4ff"]}
      className="flex-1"
    >
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
            Help Center
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* FAQ Section */}
          <View className="mb-6">
            <Text className="text-gray-400 text-xs uppercase mb-2 px-2 tracking-wide">
              Frequently Asked
            </Text>

            <View className="bg-white rounded-2xl p-2 shadow-sm">
              <HelpItem
                icon="help-circle"
                title="How does Unisphere work?"
                subtitle="Learn how the platform works"
              />
              <HelpItem
                icon="user-plus"
                title="How to connect with others?"
                subtitle="Build your academic network"
              />
              <HelpItem
                icon="book"
                title="How to share posts?"
                subtitle="Publish and interact with content"
              />
            </View>
          </View>

          {/* Support Section */}
          <View className="mb-6">
            <Text className="text-gray-400 text-xs uppercase mb-2 px-2 tracking-wide">
              Support
            </Text>

            <View className="bg-white rounded-2xl p-2 shadow-sm">
              <HelpItem
                icon="mail"
                title="Contact Support"
                subtitle="Get help from our team"
              />
              <HelpItem
                icon="alert-circle"
                title="Report a Problem"
                subtitle="Something not working?"
              />
            </View>
          </View>

          {/* About */}
          <View className="mb-6">
            <Text className="text-gray-400 text-xs uppercase mb-2 px-2 tracking-wide">
              About
            </Text>

            <View className="bg-white rounded-2xl p-2 shadow-sm">
              <HelpItem
                icon="info"
                title="About Unisphere"
                subtitle="Learn more about the platform"
              />
            </View>
          </View>

        </ScrollView>

      </SafeAreaView>
    </LinearGradient>
  );
}