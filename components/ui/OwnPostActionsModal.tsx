import Colors from "@/constants/Colors"
import { useDeletePostById } from "@/hooks/api/mutations/useDeletePost"
import { Feather } from "@expo/vector-icons"
import { useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { ActivityIndicator, Alert, Modal, Text, TouchableOpacity, View } from "react-native"

interface Props {
    visible: boolean,
    visibleSetter: React.Dispatch<React.SetStateAction<boolean>>,
    post: any,
    redirect?: boolean
}

export default function OwnPostActionsModal({ visible, visibleSetter, post, redirect = false }: Props) {

    const { mutateAsync: deletePostById, isPending: deletingPost } = useDeletePostById();
    const queryClient = useQueryClient();


    const handleDeletePost = async () => {
        if (!post || !post.id || deletingPost) return;

        try {

            await deletePostById(post.id);
            queryClient.invalidateQueries({
                queryKey: ["posts"],
                exact: false
            });

            visibleSetter(false)
            if (redirect) {
                router.replace("/(app)/(home)")
            }

        }

        catch {
            Alert.alert("Error", "Can not delete post")
            visibleSetter(false)
            return
        }
    }
    return (
        <Modal visible={visible} transparent animationType="fade">
            <TouchableOpacity
                className="flex-1 bg-black/30 justify-end"
                activeOpacity={1}
                onPress={() => visibleSetter(false)}
            >
                <View className="bg-white rounded-t-3xl p-6">

                    {/* Edit */}
                    <TouchableOpacity
                        className="flex-row items-center py-4"
                        onPress={() => {
                            router.push(`/(app)/(home)/update_post/${post.id}`)
                            visibleSetter(false)
                        }}
                    >
                        <Feather name="edit-2" size={20} color={Colors.blue[500]} />
                        <Text className="ml-3 text-lg text-gray-700">Edit post</Text>
                    </TouchableOpacity>

                    {/* Delete */}
                    <TouchableOpacity
                        className="flex-row items-center py-4"
                        onPress={handleDeletePost}
                        disabled={deletingPost}
                    >
                        {
                            deletingPost ?
                                <ActivityIndicator size={"small"} color={Colors.red[500]} /> :
                                <Feather name="trash-2" size={20} color="#ef4444" />

                        }
                        <Text className="ml-3 text-lg text-red-500">Delete post</Text>
                    </TouchableOpacity>

                    {/* Cancel */}
                    <TouchableOpacity
                        className="mt-2 items-center py-3"
                        onPress={() => visibleSetter(false)}
                    >
                        <Text className="text-gray-500">Cancel</Text>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
        </Modal>
    )
}