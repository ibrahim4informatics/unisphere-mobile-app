import Colors from "@/constants/Colors";
import { useDeleteComment } from "@/hooks/api/mutations/useDeleteComment";
import { useUpdateComment } from "@/hooks/api/mutations/useUpdateComment";
import useAppSelect from "@/hooks/useAppSelect";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Author = {
    id: string,
    first_name: string,
    last_name: string,
    avatar_url: string
}

type Comment = {
    id: number,
    content: string,
    author: Author
    created_at: string
}


type Props = {
    comment: Comment;

};

export default function CommentItem({ comment }: Props) {

    const { mutateAsync: updateComment, isPending: updatingComment } = useUpdateComment()
    const { mutateAsync: deleteComment, isPending: deletingComment } = useDeleteComment()
    const queryClient = useQueryClient();

    const user_id = useAppSelect(state => state.auth.user?.id);
    const [menuVisible, setMenuVisible] = useState(false);
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(comment.content);


    const handleOpenMenu = () => {

        if (comment.author.id !== user_id) return;
        setMenuVisible(true)
    }

    const handleDeleteComment = async () => {

        if (deletingComment) return;
        try {


            await deleteComment({ comment_id: comment.id });
            queryClient.invalidateQueries({
                exact: false,
                queryKey: ["comments"]
            });

            setMenuVisible(false);
        }

        catch {
            return
        }
    }

    const handleSave = async () => {

        if (updatingComment) return
        try {

            await updateComment({ comment_id: comment.id, content })
            queryClient.invalidateQueries({
                exact: false,
                queryKey: ["comments"]
            })
            setEditing(false);
        }

        catch {
            return
        }
    };

    return (
        <>
            <TouchableOpacity activeOpacity={0.7} onLongPress={handleOpenMenu} className="flex-row items-start mb-4 bg-white p-4 rounded-xl shadow-sm">


                {/* Avatar */}
                <Image
                    source={{ uri: comment.author.avatar_url }}

                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 999
                    }}

                    contentFit="cover"
                />

                {/* Content */}
                <View className="ml-3 flex-1">
                    <Text className="font-bold text-blue-600">
                        {comment.author.first_name} {comment.author.last_name}
                    </Text>

                    {editing ? (
                        <>
                            <TextInput
                                value={content}
                                onChangeText={setContent}
                                multiline
                                className="mt-2 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
                            />

                            <View className="flex-row mt-2">
                                <TouchableOpacity
                                    disabled={updatingComment}
                                    className="mr-4 flex-row items-center"
                                    onPress={handleSave}
                                >
                                    {updatingComment ? <ActivityIndicator size={"small"} color={Colors.blue[500]} />

                                        : <Feather name="check" size={18} color={Colors.blue[500]} />
                                    }
                                    <Text className="ml-1 text-blue-600 font-semibold">
                                        Save
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setEditing(false)}>
                                    <Text className="text-gray-500">Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <View>
                            <Text className="text-gray-700 mt-1">{content}</Text>

                            <Text className="text-xs mt-2 text-gray-400 text-right">

                                {

                                    new Date(comment.created_at).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false
                                    })}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Menu */}
                {user_id === comment.author.id && (
                    <TouchableOpacity onPress={() => setMenuVisible(true)}>
                        <Feather name="more-vertical" size={20} color={Colors.gray[600]} />
                    </TouchableOpacity>
                )}
            </TouchableOpacity>

            {/* Bottom Action Modal */}
            <Modal visible={menuVisible} transparent animationType="slide">
                <TouchableOpacity
                    className="flex-1 bg-black/30 justify-end"
                    activeOpacity={1}
                    onPress={() => setMenuVisible(false)}
                >
                    <View className="bg-white rounded-t-3xl p-6">

                        {/* Edit */}
                        <TouchableOpacity
                            className="flex-row items-center py-4"
                            onPress={() => {
                                setEditing(true);
                                setMenuVisible(false);
                            }}
                        >
                            <Feather name="edit-2" size={20} color={Colors.blue[500]} />
                            <Text className="ml-3 text-lg text-gray-700">Edit comment</Text>
                        </TouchableOpacity>

                        {/* Delete */}
                        <TouchableOpacity
                            className="flex-row items-center py-4"
                            onPress={handleDeleteComment}
                        >

                            {deletingComment ? <ActivityIndicator size={"small"} color={Colors.red[500]} />

                                : <Feather name="trash-2" size={20} color={Colors.red[500]} />
                            }
                            <Text className="ml-3 text-lg text-red-500">Delete comment</Text>
                        </TouchableOpacity>

                        {/* Cancel */}
                        <TouchableOpacity
                            className="mt-2 items-center py-3"
                            onPress={() => { setMenuVisible(false) }}
                        >
                            <Text className="text-gray-500">Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}