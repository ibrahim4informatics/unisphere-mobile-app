import Colors from "@/constants/Colors";
import { useCreatePost } from "@/hooks/api/mutations/useCreatePost";
import useAppSelect from "@/hooks/useAppSelect";
import { pickFiles } from "@/utils/pickFiles";
import pickImage from "@/utils/pickImage";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Spacer from "./Spacer";

type CreatePostProps = {
    onSubmit: (data: { type: "question" | "resource"; content: string }) => void;
};

export default function CreatePostField({ onSubmit }: CreatePostProps) {
    const queryClient = useQueryClient();
    const user = useAppSelect(state => state.auth.user);
    const [type, setType] = useState<"question" | "resource">("question");
    const [content, setContent] = useState("");
    const [medias, setMedias] = useState<any[]>([]);
    const { mutateAsync, isPending, error } = useCreatePost();

    const isDisabled = !content.trim();

    const handleSubmit = async () => {
        // console.log(user)
        if (isDisabled) return;

        const data = new FormData();
        data.append("content", content);
        data.append("type", type.toUpperCase());
        medias.forEach(m => {
            data.append("medias", { uri: m.uri, name: m.fileName, type: m.mimeType } as any)
        })

        try {

            await mutateAsync(data);
            queryClient.invalidateQueries({ exact: false, queryKey: ["posts"] })
            setContent("");
            setMedias([]);
            setType("question")
        }

        catch (err: any) {
            console.log(JSON.stringify(err));
            return
        }


    };

    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm">

            {/* Avatar + Input */}
            <View className="flex-row items-start gap-3">

                <Image
                    source={
                        user &&
                            user.avatar_url
                            ? { uri: user.avatar_url }
                            : require("@/assets/images/no-avatar.png")
                    }
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                />

                <TextInput
                    placeholder={
                        type === "question"
                            ? "Ask a question..."
                            : "Share a resource or experience..."
                    }
                    value={content}
                    onChangeText={setContent}
                    multiline
                    maxLength={500}
                    className="flex-1 text-base pt-1"
                />
            </View>

            <Spacer spaceY="md" />

            {/* Preview */}

            {
                medias.length > 0 && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ padding: 12 }}
                    >
                        {medias.map((file, index) => (
                            <View
                                key={index}
                                style={{
                                    marginRight: 10,
                                    position: "relative"
                                }}
                            >
                                {file.type === "image" ? (
                                    <Image
                                        source={{ uri: file.uri }}
                                        style={{
                                            width: 90,
                                            height: 90,
                                            borderRadius: 12
                                        }}
                                    />
                                ) : (
                                    <View
                                        style={{
                                            width: 120,
                                            height: 90,
                                            borderRadius: 12,
                                            backgroundColor: Colors.blue[200],
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 8
                                        }}
                                    >
                                        <Feather name="file-text" size={20} color={Colors.blue[500]} />
                                        <Text className="text-blue-500" numberOfLines={1}>{file.name}</Text>
                                    </View>
                                )}

                                {/* remove button */}
                                <TouchableOpacity
                                    onPress={() =>
                                        setMedias(prev => prev.filter((_, i) => i !== index))
                                    }
                                    style={{
                                        position: "absolute",
                                        top: -6,
                                        right: -6,
                                        backgroundColor: Colors.red[500],
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Feather name="x" size={12} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                )
            }

            <Spacer spaceY="md" />

            {/* Attachments */}
            <View style={{ flexDirection: "row", gap: 10 }}>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center gap-2 px-3 py-2 rounded-full bg-green-100"
                    onPress={async () => {
                        const images: any = await pickImage(true);
                        if (images && images.length > 0) {

                            setMedias(prev => prev.concat(images));
                        }

                    }}
                >
                    <Feather name="image" size={20} color={Colors.green[600]} />
                    <Text className="text-green-700 font-medium">Image</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center gap-2 px-3 py-2 rounded-full bg-blue-100"
                    onPress={async () => {
                        const files = await pickFiles();
                        if (files && files.length > 0) {

                            setMedias(prev => prev.concat(files));
                        }
                    }}
                >
                    <Feather name="paperclip" size={20} color={Colors.blue[600]} />
                    <Text className="text-blue-700 font-medium">File</Text>
                </TouchableOpacity>

            </View>

            <Spacer spaceY="md" />

            {/* Post Type + Submit */}
            <View className="flex-row items-center gap-2">

                <TouchableOpacity
                    onPress={() => setType("question")}
                    className={`px-3 py-1 flex-row items-center gap-1 rounded-full ${type === "question"
                        ? "bg-blue-100"
                        : "bg-gray-100"
                        }`}
                >
                    <Feather
                        name="help-circle"
                        size={18}
                        color={type === "question" ? Colors.blue[600] : "#555"}
                    />
                    <Text
                        className={`${type === "question"
                            ? "text-blue-700"
                            : "text-gray-700"
                            }`}
                    >
                        Question
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setType("resource")}
                    className={`px-3 py-1 flex-row items-center gap-1 rounded-full ${type === "resource"
                        ? "bg-green-100"
                        : "bg-gray-100"
                        }`}
                >
                    <Feather
                        name="book"
                        size={18}
                        color={type === "resource" ? Colors.green[600] : "#555"}
                    />
                    <Text
                        className={`${type === "resource"
                            ? "text-green-700"
                            : "text-gray-700"
                            }`}
                    >
                        Resource
                    </Text>
                </TouchableOpacity>

                <View className="flex-1" />

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isDisabled || isPending}
                    className={`px-4 py-2 rounded-lg ${(isDisabled || isPending) ? "bg-gray-300" : "bg-blue-500"
                        }`}
                >
                    <Text className="text-white font-medium">
                        Post
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}