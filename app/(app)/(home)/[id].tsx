import AddCommentInput from "@/components/ui/AddCommentInput";
import CommentItem from "@/components/ui/Comment";
import Colors from "@/constants/Colors";
import { useCreateBookmark } from "@/hooks/api/mutations/useCreateBookmark";
import { useCreateLike } from "@/hooks/api/mutations/useCreateLike";
import { useDeleteBookmark } from "@/hooks/api/mutations/useDeleteBookmark";
import { useDeleteLike } from "@/hooks/api/mutations/useDeleteLike";
import { usePostById } from "@/hooks/api/queries/usePostById";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";


const comments = [
    {
        id: "c1",
        content: "Great post! Very informative.",
        author: {
            id: "u101",
            first_name: "Alice",
            last_name: "Johnson",
            avatar_url: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        likes_count: 5,
        created_at: "2026-03-11T19:35:00.000Z",
    },
    {
        id: "c2",
        content: "I have a question about this topic.",
        author: {
            id: "u102",
            first_name: "Bob",
            last_name: "Smith",
            avatar_url: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        likes_count: 2,
        created_at: "2026-03-11T19:40:00.000Z",
    },
    {
        id: "c3",
        content: "Thanks for sharing!",
        author: {
            id: "u103",
            first_name: "Clara",
            last_name: "Williams",
            avatar_url: "https://randomuser.me/api/portraits/women/3.jpg",
        },
        likes_count: 3,
        created_at: "2026-03-11T19:45:00.000Z",
    },
    {
        id: "c4",
        content: "Can you post more examples?",
        author: {
            id: "u104",
            first_name: "David",
            last_name: "Brown",
            avatar_url: "https://randomuser.me/api/portraits/men/4.jpg",
        },
        likes_count: 1,
        created_at: "2026-03-11T19:50:00.000Z",
    },
];

export default function PostDetailsScreen() {
    const params = useLocalSearchParams<{ id: string }>();

    const { isPending, error, data, isError } = usePostById(parseInt(params.id))
    const { mutateAsync: makeLike } = useCreateLike();
    const { mutateAsync: unLike } = useDeleteLike();

    const { mutateAsync: addToBookmark } = useCreateBookmark();
    const { mutateAsync: removeFromBookmark } = useDeleteBookmark();

    const [postDataCounts, setPostDataCounts] = useState<any>({
        likes: 0, bookmarks: 0
    });
    const [bookmared, setBookmarked] = useState(false);
    const [liked, setLiked] = useState(false);


    useEffect(() => {
        console.log(data)
        if (data?.post) {
            setPostDataCounts(data.post._count);
            setBookmarked(data.post.is_booked);
            setLiked(data.post.is_liked);
        }
    }, [isPending]);





    const handleBookmark = async () => {
        if (!data?.post) return;
        if (!bookmared) {
            //optimistic ui
            setBookmarked(true);
            setPostDataCounts((prev: any) => ({ ...prev, booksmarks: prev.booksmarks + 1 }));
            // api call soon
            await addToBookmark(data.post.id);
        }

        else {
            //optimistic ui
            setBookmarked(false);
            setPostDataCounts((prev: any) => ({ ...prev, booksmarks: prev.booksmarks - 1 }));
            // api call soon
            await removeFromBookmark(data.post.id)
        }
    }

    const handleLike = async () => {
        if (!data?.post) return
        if (!liked) {
            //optimistic ui

            setLiked(true);
            setPostDataCounts((prev: any) => ({ ...prev, likes: prev.likes + 1 }))

            // api call soon

            await makeLike(data.post.id);


        }

        else {
            //optimistic ui
            setLiked(false);
            setPostDataCounts((prev: any) => ({ ...prev, likes: prev.likes - 1 }))

            // api call soon
            await unLike(data.post.id);


        }
    }




    if (isPending) {
        return (
            <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">
                <SafeAreaView className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#2563eb" />
                </SafeAreaView>
            </LinearGradient>
        );
    }

    if (!data || isError || error) {
        return (
            <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">
                <SafeAreaView edges={["top", "left", "right"]} className="flex-1 items-center justify-center px-6">
                    <Text className="text-xl text-gray-500">Post not found</Text>
                    <TouchableOpacity
                        className="mt-6 flex-row items-center px-4 py-2 bg-blue-600 rounded-md"
                        onPress={() => router.back()}
                    >
                        <Feather name="arrow-left" size={20} color="white" />
                        <Text className="text-white ml-2 font-semibold">Go Back</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        );
    }




    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">
            <SafeAreaView className="flex-1 px-6">

                {/* Back */}
                <View className="mt-4 mb-6">
                    <TouchableOpacity
                        className="h-12 w-12 elevation-sm items-center justify-center bg-white rounded-full"
                        onPress={() => router.back()}
                    >
                        <Feather name="arrow-left" size={22} color={Colors.blue[500]} />
                    </TouchableOpacity>
                </View>
                <KeyboardAwareFlatList
                    showsVerticalScrollIndicator={false}
                    enableAutomaticScroll={true}
                    enableOnAndroid={true}
                    extraScrollHeight={80}
                    keyboardOpeningTime={0}
                    ListEmptyComponent={() => <Text className="mt-3 text-gray-500 text-base">No comments yet.</Text>}

                    ListHeaderComponent={() => (
                        <>
                            {/* Author */}
                            < View className="flex-row items-center mt-4">
                                <Image
                                    source={{ uri: data.post.author.avatar_url }}
                                    style={{
                                        width: 64, height: 64, borderRadius: 999
                                    }}
                                />
                                <View className="ml-4 flex-1">
                                    <Text className="text-lg font-bold text-blue-600">
                                        {data.post.author.first_name} {data.post.author.last_name}
                                    </Text>
                                    <Text className="text-gray-500">{
                                        data.post.author.student_profile ? data.post.author.student_profile.university.name
                                            : data.post.author.teacher_profile.university.name

                                    }</Text>
                                </View>
                            </View>

                            {/* Content */}
                            <Text className="text-gray-800 text-base mt-4">{data.post.content}</Text>

                            {/* Media */}
                            {data.post.postMedias.length > 0 && (
                                <ScrollView
                                    horizontal
                                    className="mt-4"
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {data.post.postMedias.map((media: any) => (
                                        <Image
                                            key={media.id}
                                            source={{ uri: media.url }}
                                            style={{
                                                width: 200,
                                                height: 200,
                                                borderRadius: 24,
                                                borderColor: Colors.gray[200],
                                                borderWidth: 1
                                            }}
                                            contentFit="cover"
                                        />
                                    ))}
                                </ScrollView>
                            )}

                            {/* likes and bookmarks */}

                            <View className="flex-row mt-6 items-center">
                                <TouchableOpacity
                                    className="flex-row items-center mr-6"
                                    onPress={handleLike}
                                >
                                    <Feather name="heart" size={22} color={liked ? Colors.red[600] : Colors.gray[600]} />
                                    <Text className={`ml-2 ${liked ? "text-red-600" : "text-gray-600"}`}>{postDataCounts.likes}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="flex-row items-center"
                                    onPress={handleBookmark}
                                >
                                    <Feather name="bookmark" size={22} color={bookmared ? Colors.blue[500] : Colors.gray[600]} />
                                    <Text className={`ml-2 ${bookmared ? "text-blue-500" : "text-gray-600"}`}>{postDataCounts.booksmarks}</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Post Type & Date */}
                            <Text className="text-gray-400 mt-4 text-sm">
                                {data.post.type} • {new Date(data.post.created_at).toLocaleDateString()}
                            </Text>

                            <View className="mt-6">

                                <AddCommentInput onSend={(text) => { console.log(text) }} />

                                <Text className="text-gray-600 font-semibold mb-2">Comments</Text>

                            </View>
                        </>
                    )}

                    data={comments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (

                        <CommentItem comment={item} key={item.id} />



                    )}
                />







            </SafeAreaView>
        </LinearGradient>



    )
}