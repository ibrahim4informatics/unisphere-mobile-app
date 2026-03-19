import Colors from "@/constants/Colors";
import { useCreateBookmark } from "@/hooks/api/mutations/useCreateBookmark";
import { useCreateLike } from "@/hooks/api/mutations/useCreateLike";
import { useDeleteBookmark } from "@/hooks/api/mutations/useDeleteBookmark";
import { useDeleteLike } from "@/hooks/api/mutations/useDeleteLike";
import useAppSelect from "@/hooks/useAppSelect";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import OwnPostActionsModal from "./OwnPostActionsModal";
import Spacer from "./Spacer";

type PostMedia = {
    id: number;
    type: "IMAGE" | "OTHER";
    url: string;
};

type Author = {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url?: string | null;
};

type PostType = {
    id: number;
    content: string;
    type: string;
    author: Author;
    postMedias: PostMedia[];
    _count: { likes: number; comments: number; booksmarks: number };
    is_liked: boolean,
    is_booked: boolean
};

type PostProps = {
    post: PostType;
    onPress?: (post: PostType) => void;
};

export default function Post({ post, onPress }: PostProps) {
    const { author, content, postMedias, _count, is_liked, is_booked } = post;
    const user_id = useAppSelect(state => state.auth.user?.id);


    const [ownPostActionsModalShown, setOwnPostActionsModalShown] = useState(false);
    const queryClient = useQueryClient();
    const { mutateAsync: makeLike } = useCreateLike();
    const { mutateAsync: unLike } = useDeleteLike();

    const { mutateAsync: addToBookmark } = useCreateBookmark();
    const { mutateAsync: removeFromBookmark } = useDeleteBookmark();



    const handleBookmark = async () => {

        // snapshot previous cache
        const previousPosts = queryClient.getQueriesData({ queryKey: ["posts"] });

        try {

            // optimistic update
            queryClient.setQueriesData(
                { queryKey: ["posts"] },
                (old: any) => {
                    if (!old) return old;

                    return {
                        ...old,
                        posts: old.posts.map((p: any) =>
                            p.id === post.id
                                ? {
                                    ...p,
                                    is_booked: !p.is_booked,
                                    _count: {
                                        ...p._count,
                                        booksmarks: p.is_booked
                                            ? p._count.booksmarks - 1
                                            : p._count.booksmarks + 1
                                    }
                                }
                                : p
                        )
                    };
                }
            );

            // server request
            if (!post.is_booked) {
                await addToBookmark(post.id);
            } else {
                await removeFromBookmark(post.id);
            }

            queryClient.invalidateQueries({ exact: false, queryKey: ["my-posts"] });
            queryClient.invalidateQueries({ exact: false, queryKey: ["profile"] });


        } catch {

            // rollback
            previousPosts.forEach(([queryKey, data]) => {
                queryClient.setQueryData(queryKey, data);
            });

        }
    };

    const handleLike = async () => {
        const previousPosts = queryClient.getQueriesData({ queryKey: ["posts"] });

        try {

            // optimistic update
            queryClient.setQueriesData(
                { queryKey: ["posts"] },
                (old: any) => {
                    if (!old) return old;

                    return {
                        ...old,
                        posts: old.posts.map((p: any) =>
                            p.id === post.id
                                ? {
                                    ...p,
                                    is_liked: !p.is_liked,
                                    _count: {
                                        ...p._count,
                                        likes: p.is_liked
                                            ? p._count.likes - 1
                                            : p._count.likes + 1
                                    }
                                }
                                : p
                        )
                    };
                }
            );




            // server request
            if (!post.is_liked) {
                await makeLike(post.id);
            } else {
                await unLike(post.id);
            }
            queryClient.invalidateQueries({ exact: false, queryKey: ["my-posts"] });


        } catch (err) {

            // rollback
            previousPosts.forEach(([queryKey, data]) => {
                queryClient.setQueryData(queryKey, data);
            });

        }
    };

    const handleShowOwnPostActionsModal = () => {
        if (user_id !== post.author.id) return
        setOwnPostActionsModalShown(true);

    }

    return (
        <>

            <TouchableOpacity
                onLongPress={handleShowOwnPostActionsModal}
                activeOpacity={0.8}
                onPress={() => {
                    router.push(`/(app)/(home)/${post.id}`)
                }}
                className="bg-white p-4 rounded-2xl shadow-sm my-4 relative"
            >

                {post.author.id === user_id &&
                    <TouchableOpacity className="absolute top-2 right-4" onPress={handleShowOwnPostActionsModal}>

                        <Feather name="more-horizontal" size={22} />


                    </TouchableOpacity>}
                {/* Author */}
                <View className="flex-row items-center gap-3">
                    <Image
                        source={
                            author.avatar_url
                                ? { uri: author.avatar_url }
                                : require("@/assets/images/no-avatar.png")
                        }
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                    <Text className="font-medium text-base">
                        {author.first_name} {author.last_name}
                    </Text>
                </View>

                <Spacer spaceY="sm" />

                {/* Content */}
                <Text className="text-base">{content}</Text>

                <Spacer spaceY="sm" />

                {/* Media Attachments */}
                {postMedias.length > 0 && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 12 }}
                    >
                        {postMedias.map((media) => (
                            <View key={media.id} style={{ marginRight: 10, position: "relative" }}>
                                {media.type === "IMAGE" ? (
                                    <Image

                                        source={{ uri: media.url }}
                                        style={{ width: 120, height: 120, borderRadius: 12, borderWidth: 1, borderColor: Colors.gray[200] }}
                                    />
                                ) : (
                                    <TouchableOpacity
                                        style={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: 12,
                                            backgroundColor: "#f3f4f6",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 8,
                                        }}
                                        onPress={() => Linking.openURL(media.url)}
                                    >
                                        <Feather name="file-text" size={24} />
                                        <Text numberOfLines={1} ellipsizeMode="tail" className="text-sm mt-1">
                                            {media.url.split("/").pop()}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                )}

                <Spacer spaceY="sm" />

                {/* Actions: likes / comments / bookmark */}
                <View className="flex-row items-center justify-between mt-2">
                    <View className="flex-row items-center gap-4">
                        <TouchableOpacity onPress={handleLike} className="flex-row items-center gap-1">
                            <Feather name="heart" size={18} color={is_liked ? Colors.red[500] : undefined} />
                            <Text className={`${is_liked ? "text-red-500" : ""}`}>{_count.likes}</Text>
                        </TouchableOpacity>

                        <View className="flex-row items-center gap-1">
                            <Feather name="message-circle" size={18} />
                            <Text >{_count.comments}</Text>
                        </View>

                        <TouchableOpacity onPress={handleBookmark} className="flex-row items-center gap-1">
                            <Feather name="bookmark" size={18} color={is_booked ? Colors.blue[500] : undefined} />
                            <Text className={`${is_booked ? "text-blue-500" : ""}`}>{_count.booksmarks}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableOpacity>

            <OwnPostActionsModal visible={ownPostActionsModalShown} visibleSetter={setOwnPostActionsModalShown} post={post} />



        </>
    );
}



// <Modal visible={ownPostActionsModalShown} transparent animationType="slide">
//                 <TouchableOpacity
//                     className="flex-1 bg-black/30 justify-end"
//                     activeOpacity={1}
//                     onPress={() => setOwnPostActionsModalShown(false)}
//                 >
//                     <View className="bg-white rounded-t-3xl p-6">

//                         {/* Edit */}
//                         <TouchableOpacity
//                             className="flex-row items-center py-4"
//                             onPress={() => {
//                                 router.push(`/(app)/(home)/update_post/${post.id}`)
//                                 setOwnPostActionsModalShown(false)
//                             }}
//                         >
//                             <Feather name="edit-2" size={20} color={Colors.blue[500]} />
//                             <Text className="ml-3 text-lg text-gray-700">Edit post</Text>
//                         </TouchableOpacity>

//                         {/* Delete */}
//                         <TouchableOpacity
//                             className="flex-row items-center py-4"
//                             onPress={handleDeletePost}
//                             disabled={deletingPost}
//                         >
//                             {
//                                 deletingPost ?
//                                     <ActivityIndicator size={"small"} color={Colors.red[500]} /> :
//                                     <Feather name="trash-2" size={20} color="#ef4444" />

//                             }
//                             <Text className="ml-3 text-lg text-red-500">Delete post</Text>
//                         </TouchableOpacity>

//                         {/* Cancel */}
//                         <TouchableOpacity
//                             className="mt-2 items-center py-3"
//                             onPress={() => setOwnPostActionsModalShown(false)}
//                         >
//                             <Text className="text-gray-500">Cancel</Text>
//                         </TouchableOpacity>

//                     </View>
//                 </TouchableOpacity>
//             </Modal>