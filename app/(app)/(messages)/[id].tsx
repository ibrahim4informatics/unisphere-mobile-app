import Colors from "@/constants/Colors";
import useChatById from "@/hooks/api/queries/useChatById";
import { useChatMessages } from "@/hooks/api/queries/useChatMessages";
import { getSocket } from "@/services/socket";
import timeFormat from "@/utils/timeFormatter";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
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
  const [input, setInput] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const params: { id: string } = useLocalSearchParams()
  const socket = getSocket();
  const queryClient = useQueryClient();
  const user_id = (queryClient.getQueryData(["profile"]) as any).data.profile.id;


  const { isPending: chatLoading, data: chatData, error: chatError } = useChatById(parseInt(params.id));
  const { isPending: messagesLoading, data: messagesData, error: messagesError } = useChatMessages(parseInt(params.id));

  useFocusEffect(useCallback(() => {
    if (!socket) return;
    socket.emit(`enter-chat`, params.id);

    return () => {
      queryClient.invalidateQueries({
        queryKey: ["chat", parseInt(params.id)]
      })


      queryClient.invalidateQueries({
        queryKey: ["chats"]
      })
      socket.emit("leave-chat", params.id)
    }
  }, []));

  useEffect(() => {
    if (!socket) return;
    socket.on("new-message", (message) => {
      queryClient.setQueryData(["chat-messages", parseInt(params.id)], (oldData: any) => {
        if (!oldData) return oldData;
        const pages = [...oldData.pages];
        const { sender_id, ...msg } = message
        pages[pages.length - 1] = {
          ...pages[pages.length - 1], messages: [
            { ...msg, sender: sender_id === user_id ? "self" : "other" },
            ...pages[pages.length - 1].messages,
          ]
        }
        return { ...oldData, pages }
      })
    });

    return () => {
      socket.off("new-message")
    }
  }, [])
  // Correct keyboard listeners for both platforms
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
    if (!socket) return;
    socket.emit("send-message", { text: input, chat_id: parseInt(params.id) });
    setInput("");


  };

  if (chatLoading || messagesLoading) {
    return <View className="flex-1 bg-white items-center justify-center">
      <ActivityIndicator size={"large"} color={Colors.blue[500]} />
    </View>
  }

  return (
    <SafeAreaView edges={["left", "right", "top"]} className="flex-1 bg-white">
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

          <Image style={{ width: 35, height: 35, borderRadius: 20 }} source={chatData.chat.participants[0].user.avatar_url ? { uri: chatData.chat.participants[0].user.avatar_url } : require("@/assets/images/no-avatar.png")} />

          <View className="flex-1">
            <Text className="text-lg font-bold">{chatData.chat.participants[0].user.first_name} {chatData.chat.participants[0].user.last_name}</Text>
            {chatData.chat.participants[0].last_read_at && (
              <Text className="text-xs text-gray-600">Active {timeFormat(chatData.chat.participants[0].last_read_at)} ago</Text>
            )}
          </View>

        </View>
        {/* Messages */}

        <FlatList
          keyExtractor={(item) => item.id}

          data={messagesData?.pages.flatMap(page => page.messages)}
          renderItem={({ item }) => (
            <View
              className={`mb-3 px-4 py-3 rounded-2xl max-w-[75%] ${item.sender === "self"
                ? "self-end bg-blue-500"
                : "self-start bg-white"
                }`}
            >
              <Text
                className={
                  item.sender === "self"
                    ? "text-white"
                    : "text-gray-800"
                }
              >
                {item.text}
              </Text>
            </View>
          )}
          inverted
          className="py-4 px-2 bg-gray-100"
          contentContainerClassName="pb-6"

        />


        {/* Input */}

        <View
          className="flex-row items-center bg-white border-t border-gray-200 px-4 py-3 mt-auto"
          style={{ marginBottom: keyboardHeight === 0 ? 0 : keyboardHeight - 74 }}
        >
          {/* Text Input */}
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type message..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-gray-800"
            placeholderTextColor="#9ca3af"
          />

          {/* Minimal Send Button */}
          <TouchableOpacity
            onPress={sendMessage}
            className="ml-2 bg-blue-500 p-3 rounded-full"
          >
            <Feather name="send" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}