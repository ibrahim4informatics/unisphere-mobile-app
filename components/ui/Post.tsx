import Colors from "@/constants/Colors";
import { useCreateBookmark } from "@/hooks/api/mutations/useCreateBookmark";
import { useCreateLike } from "@/hooks/api/mutations/useCreateLike";
import { useDeleteBookmark } from "@/hooks/api/mutations/useDeleteBookmark";
import { useDeleteLike } from "@/hooks/api/mutations/useDeleteLike";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
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

    const [postDataCounts, setPostDataCounts] = useState(_count);
    const [bookmared, setBookmarked] = useState(is_booked)
    const [liked, setLiked] = useState(is_liked);


    const { mutateAsync: makeLike } = useCreateLike();
    const { mutateAsync: unLike } = useDeleteLike();

    const { mutateAsync: addToBookmark } = useCreateBookmark();
    const { mutateAsync: removeFromBookmark } = useDeleteBookmark();

    const handleBookmark = async () => {
        if (!bookmared) {
            //optimistic ui
            setBookmarked(true);
            setPostDataCounts(prev => ({ ...prev, booksmarks: prev.booksmarks + 1 }));
            // api call soon
            await addToBookmark(post.id);
        }

        else {
            //optimistic ui
            setBookmarked(false);
            setPostDataCounts(prev => ({ ...prev, booksmarks: prev.booksmarks - 1 }));
            // api call soon
            await removeFromBookmark(post.id)
        }
    }

    const handleLike = async () => {
        if (!liked) {
            //optimistic ui

            setLiked(true);
            setPostDataCounts(prev => ({ ...prev, likes: prev.likes + 1 }))

            // api call soon

            await makeLike(post.id);


        }

        else {
            //optimistic ui
            setLiked(false);
            setPostDataCounts(prev => ({ ...prev, likes: prev.likes - 1 }))

            // api call soon
            await unLike(post.id);


        }
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                router.push(`/(app)/(home)/${post.id}`)
            }}
            className="bg-white p-4 rounded-2xl shadow-sm my-4"
        >
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
                        <Feather name="heart" size={18} color={liked ? Colors.red[500] : undefined} />
                        <Text className={`${liked ? "text-red-500" : ""}`}>{postDataCounts.likes}</Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center gap-1">
                        <Feather name="message-circle" size={18} />
                        <Text >{_count.comments}</Text>
                    </View>

                    <TouchableOpacity onPress={handleBookmark} className="flex-row items-center gap-1">
                        <Feather name="bookmark" size={18} color={bookmared ? Colors.blue[500] : undefined} />
                        <Text className={`${bookmared ? "text-blue-500" : ""}`}>{postDataCounts.booksmarks}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableOpacity>
    );
}