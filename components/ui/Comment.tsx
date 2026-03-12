import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Author = {
    first_name: string,
    last_name: string,
    avatar_url: string
}

type Comment = {
    content: string,
    author: Author
}


type Props = {
    comment: Comment;

};

export default function CommentItem({ comment }: Props) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(comment.content);

    const handleSave = () => {
        setEditing(false);
    };

    return (
        <>
            <View className="flex-row items-start mb-4 bg-white p-4 rounded-xl shadow-sm">

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
                                    className="mr-4 flex-row items-center"
                                    onPress={handleSave}
                                >
                                    <Feather name="check" size={18} color={Colors.blue[500]} />
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
                        <Text className="text-gray-700 mt-1">{comment.content}</Text>
                    )}
                </View>

                {/* Menu */}
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                    <Feather name="more-vertical" size={20} color={Colors.gray[600]} />
                </TouchableOpacity>
            </View>

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
                            onPress={() => {
                                setMenuVisible(false);
                            }}
                        >
                            <Feather name="trash-2" size={20} color="#ef4444" />
                            <Text className="ml-3 text-lg text-red-500">Delete comment</Text>
                        </TouchableOpacity>

                        {/* Cancel */}
                        <TouchableOpacity
                            className="mt-2 items-center py-3"
                            onPress={() => setMenuVisible(false)}
                        >
                            <Text className="text-gray-500">Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}