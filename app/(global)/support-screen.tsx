import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContactSupportScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSend = () => {
        // MVP: just alert
        Alert.alert("Message Sent", "Your support request has been received.");
        setName("");
        setEmail("");
        setMessage("");
    };

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
                        Contact Support
                    </Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <View className="bg-white rounded-2xl p-5 shadow-sm">

                        <Text className="text-gray-600 mb-4">
                            Fill out the form below and our support team will get back to you as soon as possible.
                        </Text>

                        {/* Name */}
                        <Text className="text-gray-700 font-semibold mb-1">Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Your name"
                            className="bg-gray-100 rounded-xl px-4 py-3 mb-4"
                        />

                        {/* Email */}
                        <Text className="text-gray-700 font-semibold mb-1">Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Your email"
                            keyboardType="email-address"
                            className="bg-gray-100 rounded-xl px-4 py-3 mb-4"
                        />

                        {/* Message */}
                        <Text className="text-gray-700 font-semibold mb-1">Message</Text>
                        <TextInput
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Describe your issue"
                            multiline
                            numberOfLines={5}
                            textAlignVertical="top"
                            className="bg-gray-100 rounded-xl px-4 py-3 mb-4"
                        />

                        {/* Send Button */}
                        <TouchableOpacity
                            onPress={handleSend}
                            className="bg-blue-600 py-4 rounded-xl mt-2"
                        >
                            <Text className="text-white text-center font-semibold">
                                Send Message
                            </Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </SafeAreaView>
        </LinearGradient>
    );
}