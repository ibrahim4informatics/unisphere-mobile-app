import AddCommentInput from "@/components/ui/AddCommentInput";
import CommentItem from "@/components/ui/Comment";
import OwnPostActionsModal from "@/components/ui/OwnPostActionsModal";
import Colors from "@/constants/Colors";
import { useCreateBookmark } from "@/hooks/api/mutations/useCreateBookmark";
import { useCreateComment } from "@/hooks/api/mutations/useCreateComment";
import { useCreateLike } from "@/hooks/api/mutations/useCreateLike";
import { useDeleteBookmark } from "@/hooks/api/mutations/useDeleteBookmark";
import { useDeleteLike } from "@/hooks/api/mutations/useDeleteLike";
import { useCommentsOfPost } from "@/hooks/api/queries/useCommentsOfPost";
import { usePostById } from "@/hooks/api/queries/usePostById";
import useAppSelect from "@/hooks/useAppSelect";
import { bookmarkPost, removeBookmark, setPostCounts } from "@/store/slices/postsSlice";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";



export default function PostDetailsScreen() {
    const queryClient = useQueryClient();
    const params = useLocalSearchParams<{ id: string, back?: string }>();
    const user_id = useAppSelect(state => state.auth.user?.id);

    const [ownPostActionsModalShown, setOwnPostActionsModalShown] = useState(false)

    const postMeta = useAppSelect(
        (state) => state.posts.postsById[parseInt(params.id)]
    )

    const liked = useAppSelect(
        (state) => state.posts.likedPostIds.includes(parseInt(params.id))
    )

    const bookmarked = useAppSelect(
        (state) => state.posts.bookmarkedPostIds.includes(parseInt(params.id))
    )

    const { isPending, error, data, isError, refetch } = usePostById(parseInt(params.id))
    const { data: commentsResponse, isPending: commentsPending, error: commentsError } = useCommentsOfPost(parseInt(params.id));
    const dispatch = useDispatch();


    useFocusEffect(useCallback(() => {
        refetch();
    }, []))

    useEffect(() => {
        if (data?.post) {
            dispatch(
                setPostCounts({
                    post_id: data.post.id,
                    likes: data.post._count.likes,
                    booksmarks: data.post._count.booksmarks,
                })
            );
        }
    }, [data])



    const { mutateAsync: makeLike } = useCreateLike();
    const { mutateAsync: unLike } = useDeleteLike();
    const { mutateAsync: addToBookmark } = useCreateBookmark();
    const { mutateAsync: removeFromBookmark } = useDeleteBookmark();
    const { mutateAsync: createComment, error: createCommentError, isPending: createCommentPending } = useCreateComment();


    const handleCreateComment = async (content: string) => {


        try {

            await createComment({ post_id: parseInt(params.id), content })
            queryClient.invalidateQueries({
                exact: false,
                queryKey: ["comments", parseInt(params.id)]
            })


        }

        catch (err) {

            return

        }
    }


    // const handleBookmark = async () => {
    //     if (!data?.post) return

    //     const postId = data.post.id

    //     try {

    //         if (!bookmarked) {

    //             dispatch(bookmarkPost(postId))
    //             await addToBookmark(postId)

    //         } else {

    //             dispatch(removeBookmark(postId))
    //             await removeFromBookmark(postId)

    //         }

    //     } catch {

    //         if (!bookmarked) {
    //             dispatch(removeBookmark(postId))
    //         } else {
    //             dispatch(bookmarkPost(postId))
    //         }

    //     }
    // }


    // const handleLike = async () => {
    //     if (!data?.post) return

    //     const postId = data.post.id

    //     try {

    //         if (!liked) {

    //             dispatch(likePost(postId)) // optimistic
    //             await makeLike(postId)

    //         } else {

    //             dispatch(unlikePost(postId)) // optimistic
    //             await unLike(postId)

    //         }

    //     } catch {

    //         // rollback if API fails
    //         if (!liked) {
    //             dispatch(unlikePost(postId))
    //         } else {
    //             dispatch(likePost(postId))
    //         }

    //     }
    // }


    const handleBookmark = async () => {
        try {

            if (!bookmarked) {

                dispatch(bookmarkPost(data.post.id))
                await addToBookmark(data.post.id)

                queryClient.setQueriesData(
                    { queryKey: ["posts"] },
                    (old: any) => {
                        if (!old) return old;

                        return {
                            ...old,
                            posts: old.posts.map((p: any) =>
                                p.id === data.post.id
                                    ? {
                                        ...p,
                                        is_booked: true,
                                        _count: {
                                            ...p._count,
                                            booksmarks: p._count.booksmarks + 1
                                        }
                                    }
                                    : p
                            )
                        };
                    }
                );

            } else {

                dispatch(removeBookmark(data.post.id))
                await removeFromBookmark(data.post.id)

                queryClient.setQueriesData(
                    { queryKey: ["posts"] },
                    (old: any) => {
                        if (!old) return old;

                        return {
                            ...old,
                            posts: old.posts.map((p: any) =>
                                p.id === data.post.id
                                    ? {
                                        ...p,
                                        is_booked: false,
                                        _count: {
                                            ...p._count,
                                            booksmarks: p._count.booksmarks - 1
                                        }
                                    }
                                    : p
                            )
                        };
                    }
                );

            }

        } catch {

            if (!bookmarked) {
                dispatch(removeBookmark(data.post.id))
            } else {
                dispatch(bookmarkPost(data.post.id))
            }

        }

        finally {
            refetch()
        }
    }


    const handleLike = async () => {

        const previousPosts = queryClient.getQueriesData({ queryKey: ["posts"] });
        const previousPost = queryClient.getQueryData(["posts", data.post.id]);

        try {

            if (!data.post.is_liked) {
                // optimistic update for feed

                queryClient.setQueriesData(
                    { queryKey: ["posts"] },
                    (old: any) => {
                        if (!old) return old;

                        return {
                            ...old,
                            posts: old.posts.map((p: any) =>
                                p.id === data.post.id
                                    ? {
                                        ...p,
                                        is_liked: true,
                                        _count: {
                                            ...p._count,
                                            likes: p._count.likes + 1
                                        }
                                    }
                                    : p
                            )
                        };
                    }
                );
                // optimistic update for post details

                queryClient.setQueryData(["post", data.post.id], (old: any) => {
                    if (!old) return old;
                    return {
                        ...old,
                        post: {
                            ...old.post,
                            is_liked: true,
                            _count: {
                                ...old.post._count,
                                likes: old.post._count.likes + 1
                            }
                        }

                    };
                });

                // server request

                await makeLike(data.post.id);

            }

            else {
                // optimistic update for feed

                queryClient.setQueriesData(
                    { queryKey: ["posts"] },
                    (old: any) => {
                        if (!old) return old;
                        return {
                            ...old,
                            posts: old.posts.map((p: any) =>
                                p.id === data.post.id
                                    ? {
                                        ...p,
                                        is_liked: false,
                                        _count: {
                                            ...p._count,
                                            likes: p._count.likes - 1
                                        }
                                    }
                                    : p
                            )
                        };
                    }
                );
                // optimistic update for post details

                queryClient.setQueryData(["post", data.post.id], (old: any) => {
                    if (!old) return old;

                    return {
                        ...old,
                        post: {
                            ...old.post,
                            is_liked: false,
                            _count: {
                                ...old.post._count,
                                likes: old.post._count.likes - 1
                            }
                        }
                    };
                });

                console.log("pp")

                // server request
                await unLike(data.post.id);
            }







        } catch {

            // rollback feed
            previousPosts.forEach(([queryKey, data]) => {
                queryClient.setQueryData(queryKey, data);
            });

            // rollback post details
            queryClient.setQueryData(["posts", data.post.id], previousPost);
        }
    };



    if (isPending || commentsPending) {
        return (
            <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">
                <SafeAreaView className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#2563eb" />
                </SafeAreaView>
            </LinearGradient>
        );
    }

    if (!data || isError || error || !commentsResponse) {
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
                <View className="mt-4 mb-6 flex-row items-center justify-between">
                    <TouchableOpacity
                        className="h-12 w-12 elevation-sm items-center justify-center bg-white rounded-full"
                        onPress={() => {
                            if (params.back && params.back === "home") {
                                router.replace("/(app)/(home)")
                            }

                            else {
                                router.back()
                            }
                        }}
                    >
                        <Feather name="arrow-left" size={22} color={Colors.blue[500]} />
                    </TouchableOpacity>

                    {/* Post Actions Modal */}
                    {data.post.author.id === user_id && (
                        <TouchableOpacity
                            className="h-12 w-12 elevation-sm items-center justify-center bg-white rounded-full"
                            onPress={() => {
                                setOwnPostActionsModalShown(true)
                            }
                            }
                        >
                            <Feather name="more-horizontal" size={22} color={Colors.blue[500]} />
                        </TouchableOpacity>
                    )}
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
                                        media.type === "IMAGE" ? (
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
                                        ) :
                                            media.type === "VIDEO" ? (
                                                <View key={media.id}>
                                                    <Text>Video</Text>
                                                </View>
                                            ) : <View key={media.id} style={{
                                                width: 200, height: 200, alignItems: "center", justifyContent: "center",
                                                borderWidth: 1, borderColor: Colors.gray[200], borderRadius: 22, gap: 22
                                            }}>

                                                <Feather name="file-text" size={24} />
                                                <Text>{media.url.split("/").pop()}</Text>
                                            </View>
                                    ))}
                                </ScrollView>
                            )}

                            {/* likes and bookmarks */}

                            <View className="flex-row mt-6 items-center">
                                <TouchableOpacity
                                    className="flex-row items-center mr-6"
                                    onPress={handleLike}
                                >
                                    <Feather name="heart" size={22} color={data.post.is_liked ? Colors.red[600] : Colors.gray[600]} />
                                    <Text className={`ml-2 ${data.post.is_liked ? "text-red-600" : "text-gray-600"}`}>{data.post._count.likes}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="flex-row items-center"
                                    onPress={handleBookmark}
                                >
                                    <Feather name="bookmark" size={22} color={data.post.is_booked ? Colors.blue[500] : Colors.gray[600]} />
                                    <Text className={`ml-2 ${data.post.is_booked ? "text-blue-500" : "text-gray-600"}`}>{postMeta?.booksmarks ?? data.post._count.likes}</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Post Type & Date */}
                            <Text className="text-gray-400 mt-4 text-sm">
                                {data.post.type} • {new Date(data.post.created_at).toLocaleDateString()}
                            </Text>

                            <View className="mt-6">

                                <AddCommentInput onSend={(text) => { handleCreateComment(text) }} loading={createCommentPending} error={createCommentError ? "Can not commet" : undefined} />

                                <Text className="text-gray-600 font-semibold mb-2">Comments</Text>

                            </View>
                        </>
                    )}

                    data={commentsResponse.comments || []}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (

                        <CommentItem comment={item} key={item.id} />



                    )}
                />


                {
                    data.post.author.id === user_id && (
                        <OwnPostActionsModal post={data.post} visible={ownPostActionsModalShown} visibleSetter={setOwnPostActionsModalShown} redirect />
                    )
                }






            </SafeAreaView>
        </LinearGradient>



    )
}