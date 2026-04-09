import Colors from "@/constants/Colors";
import useCreateChat from "@/hooks/api/mutations/useCreateChat";
import useGetChatByUserId from "@/hooks/api/mutations/useGetChatByUserId";
import useSearchUsers from "@/hooks/api/queries/useSearchUsers";
import { useUserConnections } from "@/hooks/api/queries/useUserConnections";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";


type Props = {
    visible?: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm?: () => void; // optional callback for sign-out
};


export const MakeChatItem = () => {

}

export default function CreateChatModal({ visible, setVisible }: Props) {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [userRoleFilter, setUserRoleFilter] = useState("ALL");
    const queryClient = useQueryClient()


    const { mutateAsync: getChatIdIfExists, isPending: searchingForChatWithUser } = useGetChatByUserId();


    const { mutateAsync: createChat, isPending: creatingChat } = useCreateChat()
    const {
        hasNextPage: userConnectionsHasNextPage,
        data: userConnections,
        fetchNextPage: userConnectionFetchNextPage,
        isFetchingNextPage: isUserConnectionsFetchingNextPage,
        error: userConnectionsError,
        isPending: userConnectionsLoading

    } = useUserConnections();


    const {

        data: usersSearchResults, isPending: usersSearchLoading, error: usersSearchError, hasNextPage: usersSearchHasNextPage,
        fetchNextPage: usersSearchFetchNextPage, isFetchingNextPage: usersSearchNextPageFetching
    } = useSearchUsers(searchKeyword.length > 2, { role: userRoleFilter, keyword: searchKeyword });


    const handleChatPress = async (user_id: string) => {
        console.log(user_id)

        if (creatingChat || searchingForChatWithUser) return;

        try {

            const data = await getChatIdIfExists(user_id);
            const chat_id = data.chat.id
            setVisible(false);
            router.push(`./${chat_id}`);

        }

        catch (err: any) {

            if (err.response.status === 404) {
                // create the chat

                try {

                    const data = await createChat(user_id);
                    router.push(`./${data.chat.id}`);
                    setVisible(false);
                }

                catch (err) {
                    console.log(err);
                }
            }

        } finally {

            queryClient.invalidateQueries({
                queryKey: ["chats"]
            })
        }
    }


    return (
        <Modal visible={visible} transparent animationType="slide">
            {/* Background overlay */}
            <TouchableOpacity
                className="flex-1 bg-black/30 justify-end"
                activeOpacity={1}
                onPress={() => setVisible(false)}
            >
                {/* Modal content */}
                <View className="px-6 pt-8 pb-12 bg-white rounded-t-3xl shadow-lg" style={{ flex: 8 / 9 }}>

                    {/* Title */}
                    <Text className="text-blue-500 font-extrabold text-2xl text-center">
                        Create Chat
                    </Text>

                    {/* Search input */}

                    <View className="border border-gray-100 elevation-sm mt-6 flex-row items-center gap-2 rounded-xl bg-gray-200 px-4 h-14">
                        <Feather name="search" size={22} color={Colors.gray[500]} />
                        <TextInput placeholder="Search for users." className="h-full flex-1" value={searchKeyword} onChangeText={setSearchKeyword} />
                    </View>



                    {searchKeyword.length < 2 ? (
                        userConnectionsLoading ? <View className="py-4 items-center justify-center">
                            <ActivityIndicator size={"small"} color={Colors.blue[500]} />
                        </View> :
                            (
                                <FlatList
                                    ListHeaderComponent={() => (<Text className="mt-2 font-bold text-lg">Your Contacts</Text>)}

                                    data={userConnections?.pages.flatMap(page => page.connections)}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (

                                        <TouchableOpacity
                                            className="flex-row bg-white rounded-xl border border-gray-200 elevation-sm my-2 px-6 py-4 active:bg-gray-50"
                                            onPress={() => { setVisible(false); router.push(`./user/${item.id}`) }}
                                        >

                                            <Image
                                                source={item.avatar_url ? { uri: item.avatar_url }
                                                    : require("@/assets/images/no-avatar.png")}
                                                style={
                                                    {
                                                        width: 64,
                                                        height: 64,
                                                        borderRadius: 32
                                                    }
                                                }
                                            />

                                            <View>

                                                <Text className="text-black text-lg ml-4 font-bold">{item.first_name} {item.last_name}</Text>
                                                <Text className="text-gray-500 text-base ml-4">
                                                    {item.role === "STUDENT" ? item.student_profile.university.name : item.teacher_profile.university.name}
                                                </Text>


                                                <Text className="text-blue-500 text-base ml-4">
                                                    {item.role === "STUDENT" ? "STUDENT" : item.teacher_profile.academic_title}
                                                </Text>

                                            </View>

                                            <TouchableOpacity
                                                onPress={() => handleChatPress(item.id)}
                                                className="h-12 w-12 rounded-full items-center justify-center bg-white elevation-sm border border-gray-100 ml-auto my-auto"
                                            >
                                                <MaterialCommunityIcons name="chat-plus" size={24} color={Colors.blue[500]} />

                                            </TouchableOpacity>


                                        </TouchableOpacity>
                                    )}

                                    onEndReached={() => {
                                        if (!userConnectionsHasNextPage || isUserConnectionsFetchingNextPage) return;
                                        userConnectionFetchNextPage();
                                    }}
                                />
                            )
                    ) :
                        (

                            <>

                                <View className="flex-row px-2 mt-4 gap-3">
                                    <TouchableOpacity
                                        onPress={() => { setUserRoleFilter("ALL") }}
                                        className={`px-6 py-2   ${userRoleFilter === "ALL" ? "bg-blue-200" : "bg-white"} rounded-full border border-gray-100 elevation-sm`}>
                                        <Text className="text-blue-600 text-lg">All</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { setUserRoleFilter("TEACHER") }}
                                        className={`px-6 py-2 ${userRoleFilter === "TEACHER" ? "bg-blue-200" : "bg-white"}  rounded-full border border-gray-100 elevation-sm`}>
                                        <Text className="text-blue-600 text-lg">Teachers</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { setUserRoleFilter("STUDENT") }}
                                        className={`px-6 py-2 ${userRoleFilter === "STUDENT" ? "bg-blue-200" : "bg-white"} rounded-full border border-gray-100 elevation-sm`}>
                                        <Text className="text-blue-600 text-lg">Students</Text>
                                    </TouchableOpacity>
                                </View>


                                {
                                    usersSearchLoading ? <View className="py-2 items-center justify-center">
                                        <ActivityIndicator size={"large"} color={Colors.blue[500]} />
                                    </View>
                                        :
                                        (

                                            <KeyboardAwareFlatList
                                                className="mt-6"
                                                onEndReached={() => {
                                                    if (!usersSearchHasNextPage || usersSearchNextPageFetching) return
                                                    usersSearchFetchNextPage();
                                                }}

                                                ListEmptyComponent={() => (
                                                    (searchKeyword.length > 2) ? <Text className="my-2 text-gray-500">No result found.</Text>
                                                        : usersSearchError && <Text className="text-red-500">Network error</Text>
                                                )}

                                                data={usersSearchResults ? usersSearchResults.pages.flatMap(page => page.users) : []}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        className="flex-row bg-white rounded-xl border border-gray-200 elevation-sm my-2 px-6 py-4 active:bg-gray-50"
                                                        onPress={() => { setVisible(false); router.push(`./user/${item.id}`) }}
                                                    >

                                                        <Image
                                                            source={item.avatar_url ? { uri: item.avatar_url }
                                                                : require("@/assets/images/no-avatar.png")}
                                                            style={
                                                                {
                                                                    width: 64,
                                                                    height: 64,
                                                                    borderRadius: 32
                                                                }
                                                            }
                                                        />

                                                        <View>

                                                            <Text className="text-black text-lg ml-4 font-bold">{item.first_name} {item.last_name}</Text>
                                                            <Text className="text-gray-500 text-base ml-4">
                                                                {item.role === "STUDENT" ? item.student_profile.university.name : item.teacher_profile.university.name}
                                                            </Text>


                                                            <Text className="text-blue-500 text-base ml-4">
                                                                {item.role === "STUDENT" ? "STUDENT" : item.teacher_profile.academic_title}
                                                            </Text>

                                                        </View>
                                                        <TouchableOpacity
                                                            onPress={() => handleChatPress(item.id)}
                                                            className="h-12 w-12 rounded-full items-center justify-center bg-white elevation-sm border border-gray-100 ml-auto my-auto"
                                                        >
                                                            <MaterialCommunityIcons name="chat-plus" size={24} color={Colors.blue[500]} />

                                                        </TouchableOpacity>

                                                    </TouchableOpacity>
                                                )}
                                            />
                                        )
                                }
                            </>
                        )}
                </View>
            </TouchableOpacity>
        </Modal >
    );
}