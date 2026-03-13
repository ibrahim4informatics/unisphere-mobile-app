import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, Keyboard, TextInput, TouchableOpacity, View } from "react-native";

export default function AddCommentInput({ onSend, loading, error }: { onSend: (text: string) => void, loading: boolean, error?: string }) {
    const [commentText, setCommentText] = useState("");

    const handleSend = () => {
        if (!commentText.trim()) return;
        onSend(commentText);
        setCommentText("");
        Keyboard.dismiss();
    };

    return (
        <View className="flex-row items-center  h-20   rounded-full mb-4">
            <TextInput
                value={commentText}
                onChangeText={setCommentText}
                multiline
                placeholder="Add a comment..."
                className={`flex-1  h-20 rounded-full border ${!error ? "bg-gray-100 border-gray-200" : "bg-red-200 border-red-400"} px-6 py-4 text-gray-800`}
            />
            <TouchableOpacity
                onPress={handleSend}
                disabled={loading}
                className="ml-3 bg-blue-600 h-12 w-12 items-center justify-center rounded-full absolute right-2"
            >
                {loading ? <ActivityIndicator size={"large"} /> : <Ionicons name="send" size={22} color={"#fff"} />}
            </TouchableOpacity>
        </View>
    );
}