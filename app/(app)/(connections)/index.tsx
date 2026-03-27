import SearchUsersModal from "@/components/Modals/SearchUserModal";
import Spacer from "@/components/ui/Spacer";
import UITabs from "@/components/ui/UITabs";
import Colors from "@/constants/Colors";
import useAcceptConnetion from "@/hooks/api/mutations/useAcceptConnection";
import useRejectConnetion from "@/hooks/api/mutations/useRejectConnetion";
import useUnConnect from "@/hooks/api/mutations/useUnConnect";
import { useConnectionsRequests } from "@/hooks/api/queries/useConnectionsRequests";
import { useUserConnections } from "@/hooks/api/queries/useUserConnections";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const ConnectionsRequestsTab = () => {
    const queryClient = useQueryClient();

    const { data: connectionsRequestsData,
        isPending: connectionsRequestsDataPending,
        error: connectionsRequestsError,
        fetchNextPage: fetchNextConnetionsRequestsPage,
        hasNextPage: hasConnectionsRequetsNextPage,
        isFetchingNextPage: nextConnectionsRequestsPageFetching
    } = useConnectionsRequests();

    const { mutateAsync: rejectConnection, isPending: rejectingConnection } = useRejectConnetion()
    const { mutateAsync: acceptConnection, isPending: acceptingConnection } = useAcceptConnetion();

    const handleRejectConnection = async (connection_id: number) => {
        // console.log(connection_id);
        const oldDataSnapshot: any = queryClient.getQueryData(["connections-requests"]);
        await queryClient.cancelQueries({ queryKey: ["connections-requests"] })
        if (rejectingConnection) return;
        try {

            // update the cache
            queryClient.setQueryData(["connections-requests"], (oldData: any) => {

                if (!oldData) return oldData;

                return {
                    ...oldData,

                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        connections: page.connections.filter((connection: any) => connection.connection_id !== connection_id)
                    }))
                }

            });

            await rejectConnection(connection_id);
        }

        catch (err) {

            console.log(JSON.stringify(err));
            // rollback changes
            queryClient.setQueryData(["connections-requests"], oldDataSnapshot)

        }
    }



    const handleAcceptConnection = async (connection_id: number) => {
        // console.log(connection_id);
        const oldDataSnapshot: any = queryClient.getQueryData(["connections-requests"]);
        await queryClient.cancelQueries({ queryKey: ["connections-requests"] })
        if (acceptingConnection) return;
        try {

            // update the cache
            queryClient.setQueryData(["connections-requests"], (oldData: any) => {

                if (!oldData) return oldData;

                return {
                    ...oldData,

                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        connections: page.connections.filter((connection: any) => connection.connection_id !== connection_id)
                    }))
                }

            });

            await acceptConnection(connection_id);
            // invalidate get connections query
            queryClient.invalidateQueries({
                exact: false,
                queryKey: ["connections"]
            });
        }

        catch (err) {

            console.log(JSON.stringify(err));
            // rollback changes
            queryClient.setQueryData(["connections-requests"], oldDataSnapshot)

        }
    }

    if (connectionsRequestsError) {
        router.replace("/(global)/network-error")
        return;
    }
    if (connectionsRequestsDataPending || !connectionsRequestsData) {
        return <View className="flex-1 items-center justify-center"><ActivityIndicator size={"large"} color={Colors.blue[500]} /></View>
    }
    return (
        <FlatList
            ListHeaderComponent={() => (
                <View className="py-2">
                    <Text className="text-black font-extrabold text-lg">Connections Requests</Text>
                </View>
            )}
            data={connectionsRequestsData.pages.flatMap(page => page.connections)}
            keyExtractor={(item) => item.connection_id.toString()}
            ListEmptyComponent={() => (<Text className="text-gray-500">No connection requests here.</Text>)}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className="flex-row mb-2 bg-white border border-gray-100 py-4 px-6 rounded-xl elevation-sm"
                    onPress={() => {
                        router.push(`./user/${item.id}`)
                    }}
                >

                    <Image source={item.avatar_url ? { uri: item.avatar_url } : require("@/assets/images/no-avatar.png")} style={{ width: 48, height: 48, borderRadius: 60 }} />
                    <View className="ml-2 flex-1">
                        <Text className="text-lg font-bold">{item.first_name} {item.last_name}</Text>
                        <View className="flex-row gap-2 items-center ">
                            <FontAwesome name="university" size={12} color={Colors.gray[400]} />
                            <Text className="text-gray-500">{item.role === "TEACHER" ? item.teacher_profile.university.name : item.student_profile.university.name}</Text>
                        </View>
                        {item.role === "TEACHER" && <Text className="text-blue-500 font-bold">{item.teacher_profile.academic_title}</Text>}
                        {item.role === "STUDENT" && <Text className="text-green-500 font-bold">Student</Text>}

                    </View>

                    <TouchableOpacity


                        className="flex-row mr-2 w-12 h-12 rounded-full bg-white border border-gray-100 elevation-sm items-center justify-center gap-2"
                        onPress={async () => await handleAcceptConnection(item.connection_id)}
                    >

                        <Feather name="check" color={Colors.blue[500]} size={24} />

                    </TouchableOpacity>


                    <TouchableOpacity


                        className="flex-row w-12 h-12 rounded-full bg-white border border-gray-100 elevation-sm items-center justify-center gap-2"
                        onPress={async () => { await handleRejectConnection(item.connection_id) }}
                    >
                        <Feather name="trash" color={Colors.red[500]} size={24} />

                    </TouchableOpacity>
                </TouchableOpacity>
            )}

            onEndReached={() => {

                if (nextConnectionsRequestsPageFetching || !hasConnectionsRequetsNextPage) return;
                fetchNextConnetionsRequestsPage();
            }}
            ListFooterComponent={() => (
                nextConnectionsRequestsPageFetching && <View className="py-2 items-center">
                    <ActivityIndicator size={"small"} color={Colors.blue[500]} />
                </View>
            )}
        />
    )
}


const UserConnectionsTab = () => {
    const queryClient = useQueryClient();

    const {
        data: userConnectionsData, isPending: userConnectionsLoading
        , error: userConnectionsError, fetchNextPage: fetchNextPageUserConnection, hasNextPage: userConnectionHasNextPage,
        isFetchingNextPage: userConnectionsNextPageFetching
    } = useUserConnections();

    const { mutateAsync: unConnect, isPending: unConnecting } = useUnConnect();

    const handleUnConnect = async (connection_id: number) => {

        if (unConnecting) return;
        const snapshot = queryClient.getQueryData(["connections"]);
        console.log(JSON.stringify(snapshot));
        await queryClient.cancelQueries({ queryKey: ["connections"] });
        try {
            queryClient.setQueryData(["connections"], (oldData: any) => {
                if (!oldData) return oldData
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => (
                        {
                            ...page,
                            connections: page.connections.filter((connection: any) => connection.connection_id !== connection_id)
                        }
                    ))
                }
            });
            await unConnect(connection_id);

        }
        catch (err) {
            console.log(err);
            //rollback
            queryClient.setQueryData(["connections"], snapshot);
            return;
        }
    }

    if (userConnectionsError) {
        router.replace("/(global)/networ-error");
        return;
    }
    if (userConnectionsLoading || !userConnectionsData) return (
        <View className="flex-1 items-center justify-center"><ActivityIndicator size={"large"} color={Colors.blue[500]} /></View>
    )



    return (
        <FlatList

            data={userConnectionsData?.pages.flatMap(page => page.connections)}
            // keyExtractor={(item)=> item.id}
            ListHeaderComponent={() => (
                <Text className="text-lg font-bold mt-2">Your Connections</Text>
            )}

            ListEmptyComponent={() => (<Text className="mt-3 text-gray-500">No connections,find people and get started.</Text>)}


            renderItem={({ item }) => (
                <TouchableOpacity
                    className="flex-row mb-2 bg-white border border-gray-100 py-4 px-6 rounded-xl elevation-sm"
                    onPress={() => { router.push(`./user/${item.id}`) }}
                >

                    <Image source={item.avatar_url ? { uri: item.avatar_url } : require("@/assets/images/no-avatar.png")} style={{ width: 48, height: 48, borderRadius: 60 }} />
                    <View className="ml-2 flex-1">
                        <Text className="text-lg font-bold">{item.first_name} {item.last_name}</Text>
                        <View className="flex-row gap-2 items-center ">
                            <FontAwesome name="university" size={12} color={Colors.gray[400]} />
                            <Text className="text-gray-500">{item.role === "TEACHER" ? item.teacher_profile.university.name : item.student_profile.university.name}</Text>
                        </View>
                        {item.role === "TEACHER" && <Text className="text-blue-500 font-bold">{item.teacher_profile.academic_title}</Text>}
                        {item.role === "STUDENT" && <Text className="text-green-500 font-bold">Student</Text>}

                    </View>

                    <TouchableOpacity


                        className="flex-row mr-2 w-12 h-12 rounded-full bg-white border border-gray-100 elevation-sm items-center justify-center gap-2"
                        onPress={async () => { console.log(item.id) }}
                    >

                        <Feather name="message-circle" color={Colors.blue[500]} size={24} />

                    </TouchableOpacity>


                    <TouchableOpacity


                        className="flex-row w-12 h-12 rounded-full bg-white border border-gray-100 elevation-sm items-center justify-center gap-2"
                        onPress={async () => { await handleUnConnect(item.connection_id) }}
                    >
                        <Feather name="trash" color={Colors.red[500]} size={24} />

                    </TouchableOpacity>
                </TouchableOpacity>
            )}
        />
    )
}



export default function Index() {

    const [searchVisible, setSearchVisible] = useState(false);
    const queryClient = useQueryClient()
    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">
            <SafeAreaView className="flex-1 px-6">



                {/* Header */}
                <View className="py-4 flex-row items-center">
                    <TouchableOpacity
                        className="bg-white h-11 w-11 items-center justify-center rounded-full shadow-sm mr-3 elevation-md"
                        onPress={() => router.back()}
                    >
                        <Feather name="arrow-left" size={20} color={Colors.blue[500]} />
                    </TouchableOpacity>

                    <Text className="text-xl font-extrabold ml-2">Connections</Text>
                    <TouchableOpacity
                        className="bg-white h-11 flex-row gap-2 px-6 ml-auto items-center justify-center rounded-full shadow-sm mr-3 elevation-md"
                        onPress={() => { setSearchVisible(true); queryClient.invalidateQueries({ queryKey: ["connections-suggested"] }) }}
                    >
                        <Text className="text-blue-500">Find People</Text>
                        <Feather name="search" size={20} color={Colors.blue[500]} />
                    </TouchableOpacity>
                </View>


                <Spacer spaceY="md" />
                {/* Content Tab */}
                <UITabs
                    renderContent={(active) => {

                        if (active === "requests") {
                            return <ConnectionsRequestsTab />
                        }
                        else {
                            return <UserConnectionsTab />
                        }
                    }}

                    tabs={[
                        { key: "requests", label: "Connections Requests" },
                        { key: "connections", label: "Your Connections" },
                    ]}
                />
            </SafeAreaView>

            <SearchUsersModal visible={searchVisible} setVisible={setSearchVisible} />
        </LinearGradient>
    )
}