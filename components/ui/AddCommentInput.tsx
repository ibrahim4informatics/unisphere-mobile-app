import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Keyboard, TextInput, TouchableOpacity, View } from "react-native";

export default function AddCommentInput({ onSend }: { onSend: (text: string) => void }) {
    const [commentText, setCommentText] = useState("");

    const handleSend = () => {
        if (!commentText.trim()) return;
        onSend(commentText);
        setCommentText("");
        Keyboard.dismiss();
    };

    return (
        <View className="flex-row items-center elevation-sm  h-20 border-t border-gray-200 bg-gray-100 rounded-full mb-4">
            <TextInput
                value={commentText}
                onChangeText={setCommentText}
                multiline
                placeholder="Add a comment..."
                className="flex-1 bg-gray-100 h-20 rounded-full px-6 py-4 text-gray-800"
            />
            <TouchableOpacity
                onPress={handleSend}
                className="ml-3 bg-blue-600 p-4 items-center justify-end rounded-full absolute right-2"
            >
               <Ionicons name="send" size={22} color={"#fff"} />
            </TouchableOpacity>
        </View>
    );
}