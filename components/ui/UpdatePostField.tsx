import Colors from "@/constants/Colors";
// import { useUpdatePost } from "@/hooks/api/mutations/useUpdatePost"; // assume you have this hook
import { useDeletePostMedia } from "@/hooks/api/mutations/useDeletePostMedia";
import useUpdatePost from "@/hooks/api/mutations/useUpdatePost";
import useAppSelect from "@/hooks/useAppSelect";
import { pickFiles } from "@/utils/pickFiles";
import pickImage from "@/utils/pickImage";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Spacer from "./Spacer";

type UpdatePostFieldProps = {
    postId: number;
    initialContent: string;
    initialMedias: any[];
    initialType: "question" | "resource";
    loading?: boolean
};

export default function UpdatePostField({
    postId,
    initialContent,
    initialMedias,
    initialType,
    loading = false,
}: UpdatePostFieldProps) {
    const queryClient = useQueryClient();

    const { mutateAsync: deleteMedia, isPending: mediaDeleting } = useDeletePostMedia()
    const user = useAppSelect(state => state.auth.user);
    const [type, setType] = useState<"question" | "resource">(initialType);
    const [content, setContent] = useState(initialContent);
    const [medias, setMedias] = useState<any[]>(initialMedias);
    const [localMedias, setLocalMedias] = useState<any[]>([])
    const { mutateAsync: updatePost, isPending: updatingPost, error: postUpdateError } = useUpdatePost(); // custom mutation hook

    const isDisabled = !content.trim();

    const handleDeleteMedia = async (media_id: number) => {
        try {

            await deleteMedia(media_id);
            setMedias(prev => prev.filter(f => f.id !== media_id));

        }
        catch {
            return;
        }
    }

    const handleSubmit = async () => {
        if (isDisabled || updatingPost) return;

        const data = new FormData();
        data.append("content", content);
        data.append("type", type.toUpperCase());
        if (localMedias.length > 0) {
            localMedias.forEach(m => {
                data.append("medias", { uri: m.uri, name: m.fileName || m.name || `untitled.${m.mimeType.split("/")[1]}`, type: m.mimeType } as any)
            });
        }


        try {
            await updatePost({ post_id: postId, data });
            queryClient.invalidateQueries({
                exact: false,
                queryKey: ["posts", postId]
            });
            router.push(`/(app)/(home)/${postId}?back=home`);
        }

        catch {
            Alert.alert("Error", "Can not update post")
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
                            ? "Edit your question..."
                            : "Edit your resource..."
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
            {(medias.length > 0 || localMedias.length > 0) && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ padding: 12 }}
                >
                    {localMedias.length > 0 && localMedias.map((file, index) => (
                        <View key={index} style={{ marginRight: 10, position: "relative" }}>
                            {file.type === "image" ? (
                                <Image
                                    source={{ uri: file.uri }}
                                    style={{ width: 90, height: 90, borderRadius: 12 }}
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
                                    <Text className="text-blue-500" numberOfLines={1}>{file.name || file.fileName || `untitled`}</Text>
                                </View>
                            )}

                            {/* remove button */}
                            <TouchableOpacity
                                onPress={() => {
                                    setLocalMedias(prev => prev.filter((_, i) => i !== index))
                                }}

                                disabled={mediaDeleting}

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
                                {mediaDeleting ?
                                    <ActivityIndicator size={"small"} color={"#fff"} />
                                    :
                                    <Feather name="x" size={12} color="#fff" />
                                }
                            </TouchableOpacity>
                        </View>
                    ))}
                    {medias.length > 0 && medias.map((file, index) => (
                        <View key={index} style={{ marginRight: 10, position: "relative" }}>
                            {file.type === "IMAGE" ? (
                                <Image
                                    source={{ uri: file.url }}
                                    style={{ width: 90, height: 90, borderRadius: 12 }}
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
                                    <Text className="text-blue-500" numberOfLines={1}>{file.url.split("/").pop()}</Text>
                                </View>
                            )}

                            {/* remove button */}
                            <TouchableOpacity
                                onPress={async () => {
                                    await handleDeleteMedia(file.id)
                                }}

                                disabled={mediaDeleting}

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
                                {mediaDeleting ?
                                    <ActivityIndicator size={"small"} color={"#fff"} />
                                    :
                                    <Feather name="x" size={12} color="#fff" />
                                }
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            )}

            <Spacer spaceY="md" />

            {/* Attachments */}
            <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center gap-2 px-3 py-2 rounded-full bg-green-100"
                    onPress={async () => {
                        const images: any = await pickImage(true);
                        if (images && images.length > 0) setLocalMedias(prev => prev.concat(images));
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
                        if (files && files.length > 0) setLocalMedias(prev => prev.concat(files));
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
                    className={`px-3 py-1 flex-row items-center gap-1 rounded-full ${type === "question" ? "bg-blue-100" : "bg-gray-100"}`}
                >
                    <Feather name="help-circle" size={18} color={type === "question" ? Colors.blue[600] : "#555"} />
                    <Text className={`${type === "question" ? "text-blue-700" : "text-gray-700"}`}>Question</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setType("resource")}
                    className={`px-3 py-1 flex-row items-center gap-1 rounded-full ${type === "resource" ? "bg-green-100" : "bg-gray-100"}`}
                >
                    <Feather name="book" size={18} color={type === "resource" ? Colors.green[600] : "#555"} />
                    <Text className={`${type === "resource" ? "text-green-700" : "text-gray-700"}`}>Resource</Text>
                </TouchableOpacity>

                <View className="flex-1" />

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isDisabled || updatingPost}
                    className={`px-4 py-2 rounded-lg ${(isDisabled) ? "bg-gray-300" : "bg-blue-500"}`}
                >
                    {
                        updatingPost ? 
                        <ActivityIndicator size={"small"} color={"#fff"} /> :
                        
                        <Text className="text-white font-medium">Update</Text>

                    }                
                    
                    </TouchableOpacity>
            </View>
        </View>
    );
}