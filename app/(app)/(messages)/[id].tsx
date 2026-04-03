import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialMessages = [
  { id: "1", text: "Hello 👋", sender: "other" },
  { id: "2", text: "Hi bro!", sender: "me" },
  { id: "3", text: "This works on bare RN too 🔥", sender: "other" },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = useRef<any>(null);

  // 🔥 Correct keyboard listeners for both platforms
  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "me",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 50);
  };

  return (
    <SafeAreaView edges={["left", "right", "top"]} className="flex-1 bg-gray-100">
      <View className="flex-1">


        {/* Header */}
        <View className="flex-row gap-2 px-6 mb-6 pt-4 items-center">
          {/* Back Button */}
          <TouchableOpacity
            className="bg-white h-11 w-11 items-center justify-center rounded-full shadow-sm mr-3 elevation-md"
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color={Colors.blue[500]} />
          </TouchableOpacity>

          <Text className="text-lg font-bold">Benyahia Ibrahim</Text>

        </View>
        {/* Messages */}
        {/* <KeyboardAwareFlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={keyboardHeight}

          renderItem={({ item }) => (
            <View
              className={`mb-3 px-4 py-3 rounded-2xl max-w-[75%] ${item.sender === "me"
                  ? "self-end bg-blue-500"
                  : "self-start bg-white"
                }`}
            >
              <Text
                className={
                  item.sender === "me"
                    ? "text-white"
                    : "text-gray-800"
                }
              >
                {item.text}
              </Text>
            </View>
          )}
        /> */}

        {/* Input */}
        <View
          className="flex-row items-center bg-white border-t border-gray-200 px-4 py-3 mt-auto"
          style={{ marginBottom: keyboardHeight === 0 ? 0 : keyboardHeight - 74 }}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type message..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-gray-800"
            placeholderTextColor="#9ca3af"
          />

          <TouchableOpacity
            onPress={sendMessage}
            className="ml-3 bg-blue-500 px-4 py-3 rounded-full"
          >
            <Text className="text-white font-semibold">Send</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}