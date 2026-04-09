import Colors from "@/constants/Colors";
import useSendConnetion from "@/hooks/api/mutations/useSendConnection";
import useSearchUsers from "@/hooks/api/queries/useSearchUsers";
import useSuggestedConnections from "@/hooks/api/queries/useSuggestedConnections";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";


const saerchResults = {
    users: [
        // 1
        {
            id: "f6e1b9c0-1a2d-4e4f-9a13-6f7b2a1c0d11",
            first_name: "Belabed",
            last_name: "Abd El Aziz",
            bio: null,
            avatar_url: "https://res.cloudinary.com/djn33vea9/image/upload/v1774302431/users/56949d61-5a38-4376-8bf6-df5dffa0affc/profile_pictures/i0gvbii2xb0npdq8nnyv.jpg",
            email: "azz1@gmail.com",
            password: "hashed_password",
            student_id: null,
            role: "TEACHER",
            status: "PENDING",
            onboarding_completed: false,
            id_card_url: null,
            deleted_at: null,
            updated_at: "2026-03-26T21:12:31.096Z",
            created_at: "2026-03-15T22:51:16.190Z",
            student_profile: null,
            teacher_profile: {
                id: 1,
                phone_number: "0645889987",
                university_of_study: "USTO",
                field_of_study: "Computer Science",
                specialization: "Network",
                academic_title: "PROFESSOR",
                leading_department_id: null,
                univeristy_id: "014ede68-7bdd-4b86-b52b-4339a309b024",
                user_id: "f6e1b9c0-1a2d-4e4f-9a13-6f7b2a1c0d11",
                updated_at: "2026-03-24T21:01:45.624Z",
                created_at: "2026-03-24T21:02:26.192Z",
                university: {
                    id: "014ede68-7bdd-4b86-b52b-4339a309b024",
                    name: "University of Oran 1",
                    short_name: "University of Oran 1",
                    city: "Oran",
                    address: null,
                    email: null,
                    website: null,
                    phone: null,
                    updated_at: "2026-03-11T13:55:30.318Z",
                    created_at: "2026-03-11T13:55:30.318Z",
                },
            },
        },
        // 2
        {
            id: "a9d2c3b4-5e6f-4781-9d22-8f1b2c3d4e5f",
            first_name: "Seridj",
            last_name: "Houssem",
            bio: null,
            avatar_url: null,
            email: "houss1@gmail.com",
            password: "hashed_password",
            student_id: null,
            role: "TEACHER",
            status: "PENDING",
            onboarding_completed: false,
            id_card_url: null,
            deleted_at: null,
            updated_at: "2026-03-15T22:50:38.149Z",
            created_at: "2026-03-15T22:50:38.149Z",
            student_profile: null,
            teacher_profile: {
                id: 2,
                phone_number: "0655989999",
                university_of_study: "IGMO",
                field_of_study: "Computer Science",
                specialization: "Development",
                academic_title: "ASSISTANT",
                leading_department_id: null,
                univeristy_id: "014ede68-7bdd-4b86-b52b-4339a309b024",
                user_id: "a9d2c3b4-5e6f-4781-9d22-8f1b2c3d4e5f",
                updated_at: "2026-03-24T12:55:36.731Z",
                created_at: "2026-03-24T12:56:29.669Z",
                university: {
                    id: "014ede68-7bdd-4b86-b52b-4339a309b024",
                    name: "University of Oran 1",
                    short_name: "University of Oran 1",
                    city: "Oran",
                    address: null,
                    email: null,
                    website: null,
                    phone: null,
                    updated_at: "2026-03-11T13:55:30.318Z",
                    created_at: "2026-03-11T13:55:30.318Z",
                },
            },
        },
        // 3
        {
            id: "c1e2f3d4-5678-4a9b-9c2d-1f2a3b4c5d6e",
            first_name: "Belabed",
            last_name: "Abd El Aziz",
            bio: null,
            avatar_url: "https://res.cloudinary.com/djn33vea9/image/upload/v1774302431/users/56949d61-5a38-4376-8bf6-df5dffa0affc/profile_pictures/i0gvbii2xb0npdq8nnyv.jpg",
            email: "azz2@gmail.com",
            password: "hashed_password",
            student_id: null,
            role: "TEACHER",
            status: "PENDING",
            onboarding_completed: false,
            id_card_url: null,
            deleted_at: null,
            updated_at: "2026-03-26T21:12:31.096Z",
            created_at: "2026-03-15T22:51:16.190Z",
            student_profile: null,
            teacher_profile: {
                id: 3,
                phone_number: "0645889987",
                university_of_study: "USTO",
                field_of_study: "Computer Science",
                specialization: "Network",
                academic_title: "PROFESSOR",
                leading_department_id: null,
                univeristy_id: "014ede68-7bdd-4b86-b52b-4339a309b024",
                user_id: "c1e2f3d4-5678-4a9b-9c2d-1f2a3b4c5d6e",
                updated_at: "2026-03-24T21:01:45.624Z",
                created_at: "2026-03-24T21:02:26.192Z",
                university: {
                    id: "014ede68-7bdd-4b86-b52b-4339a309b024",
                    name: "University of Oran 1",
                    short_name: "University of Oran 1",
                    city: "Oran",
                    address: null,
                    email: null,
                    website: null,
                    phone: null,
                    updated_at: "2026-03-11T13:55:30.318Z",
                    created_at: "2026-03-11T13:55:30.318Z",
                },
            },
        },
        // 4
        {
            id: "d2f3a4b5-6789-4b1c-9d3e-2a3b4c5d6e7f",
            first_name: "Seridj",
            last_name: "Houssem",
            bio: null,
            avatar_url: null,
            email: "houss2@gmail.com",
            password: "hashed_password",
            student_id: null,
            role: "TEACHER",
            status: "PENDING",
            onboarding_completed: false,
            id_card_url: null,
            deleted_at: null,
            updated_at: "2026-03-15T22:50:38.149Z",
            created_at: "2026-03-15T22:50:38.149Z",
            student_profile: null,
            teacher_profile: {
                id: 4,
                phone_number: "0655989999",
                university_of_study: "IGMO",
                field_of_study: "Computer Science",
                specialization: "Development",
                academic_title: "ASSISTANT",
                leading_department_id: null,
                univeristy_id: "014ede68-7bdd-4b86-b52b-4339a309b024",
                user_id: "d2f3a4b5-6789-4b1c-9d3e-2a3b4c5d6e7f",
                updated_at: "2026-03-24T12:55:36.731Z",
                created_at: "2026-03-24T12:56:29.669Z",
                university: {
                    id: "014ede68-7bdd-4b86-b52b-4339a309b024",
                    name: "University of Oran 1",
                    short_name: "University of Oran 1",
                    city: "Oran",
                    address: null,
                    email: null,
                    website: null,
                    phone: null,
                    updated_at: "2026-03-11T13:55:30.318Z",
                    created_at: "2026-03-11T13:55:30.318Z",
                },
            },
        },
        // 5-20 → repeat alternating Belabed / Seridj, all unique UUIDs
        {
            id: "e3f4a5b6-7890-4c1d-9e4f-3a4b5c6d7e8f",
            first_name: "Belabed",
            last_name: "Abd El Aziz",
            bio: null,
            avatar_url: "https://res.cloudinary.com/djn33vea9/image/upload/v1774302431/users/56949d61-5a38-4376-8bf6-df5dffa0affc/profile_pictures/i0gvbii2xb0npdq8nnyv.jpg",
            email: "azz3@gmail.com",
            password: "hashed_password",
            student_id: null,
            role: "TEACHER",
            status: "PENDING",
            onboarding_completed: false,
            id_card_url: null,
            deleted_at: null,
            updated_at: "2026-03-26T21:12:31.096Z",
            created_at: "2026-03-15T22:51:16.190Z",
            student_profile: null,
            teacher_profile: {
                id: 5,
                phone_number: "0645889987",
                university_of_study: "USTO",
                field_of_study: "Computer Science",
                specialization: "Network",
                academic_title: "PROFESSOR",
                leading_department_id: null,
                univeristy_id: "014ede68-7bdd-4b86-b52b-4339a309b024",
                user_id: "e3f4a5b6-7890-4c1d-9e4f-3a4b5c6d7e8f",
                updated_at: "2026-03-24T21:01:45.624Z",
                created_at: "2026-03-24T21:02:26.192Z",
                university: {
                    id: "014ede68-7bdd-4b86-b52b-4339a309b024",
                    name: "University of Oran 1",
                    short_name: "University of Oran 1",
                    city: "Oran",
                    address: null,
                    email: null,
                    website: null,
                    phone: null,
                    updated_at: "2026-03-11T13:55:30.318Z",
                    created_at: "2026-03-11T13:55:30.318Z",
                },
            },
        },
        {
            id: "f4g5b6c7-8901-4d2e-9f5g-4b5c6d7e8f9a",
            first_name: "Seridj",
            last_name: "Houssem",
            bio: null,
            avatar_url: null,
            email: "houss3@gmail.com",
            password: "hashed_password",
            student_id: null,
            role: "TEACHER",
            status: "PENDING",
            onboarding_completed: false,
            id_card_url: null,
            deleted_at: null,
            updated_at: "2026-03-15T22:50:38.149Z",
            created_at: "2026-03-15T22:50:38.149Z",
            student_profile: null,
            teacher_profile: {
                id: 6,
                phone_number: "0655989999",
                university_of_study: "IGMO",
                field_of_study: "Computer Science",
                specialization: "Development",
                academic_title: "ASSISTANT",
                leading_department_id: null,
                univeristy_id: "014ede68-7bdd-4b86-b52b-4339a309b024",
                user_id: "f4g5b6c7-8901-4d2e-9f5g-4b5c6d7e8f9a",
                updated_at: "2026-03-24T12:55:36.731Z",
                created_at: "2026-03-24T12:56:29.669Z",
                university: {
                    id: "014ede68-7bdd-4b86-b52b-4339a309b024",
                    name: "University of Oran 1",
                    short_name: "University of Oran 1",
                    city: "Oran",
                    address: null,
                    email: null,
                    website: null,
                    phone: null,
                    updated_at: "2026-03-11T13:55:30.318Z",
                    created_at: "2026-03-11T13:55:30.318Z",
                },
            },
        },
        // continue alternating until you have 20 users
    ],
    page: 1,
    has_more: false,
};

const data = {
    "suggestions": [
        {
            "id": "b368fdce-8430-48f9-a623-82434d08924d",
            "first_name": "Belabed",
            "last_name": "Abd El Aziz",
            "role": "TEACHER",
            "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1774302431/users/56949d61-5a38-4376-8bf6-df5dffa0affc/profile_pictures/i0gvbii2xb0npdq8nnyv.jpg",
            "student_profile": null,
            "teacher_profile": {
                "university": {
                    "id": "014ede68-7bdd-4b86-b52b-4339a309b024",
                    "name": "University of Oran 1",
                    "short_name": "University of Oran 1",
                    "city": "Oran",
                    "address": null,
                    "email": null,
                    "website": null,
                    "phone": null,
                    "updated_at": "2026-03-11T13:55:30.318Z",
                    "created_at": "2026-03-11T13:55:30.318Z"
                },
                "academic_title": "PROFESSOR"
            }
        }
    ],
    "has_more": false,
    "page": 1
}
type Props = {
    visible?: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm?: () => void; // optional callback for sign-out
};

export default function SearchUsersModal({ visible, setVisible }: Props) {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [userRoleFilter, setUserRoleFilter] = useState("ALL");
    const queryClient = useQueryClient()

    const { mutateAsync: sendConnection, isPending: sendingConnection } = useSendConnetion()
    const {
        data: suggestedConnectionsData, error: suggestedConnectionsError, isPending: suggestedConnectionLoading,
        hasNextPage: suggestedConnectionsHasNextPage, fetchNextPage: suggestedConnectionsFetchNextPage,
        isFetchingNextPage: suggestedConnectionsFetchingNextPage
    } = useSuggestedConnections();

    const {

        data: usersSearchResults, isPending: usersSearchLoading, error: usersSearchError, hasNextPage: usersSearchHasNextPage,
        fetchNextPage: usersSearchFetchNextPage, isFetchingNextPage: usersSearchNextPageFetching
    } = useSearchUsers(searchKeyword.length > 2, { role: userRoleFilter, keyword: searchKeyword });


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
                        Find People
                    </Text>

                    {/* Search input */}

                    <View className="border border-gray-100 elevation-sm mt-6 flex-row items-center gap-2 rounded-xl bg-gray-200 px-4 h-14">
                        <Feather name="search" size={22} color={Colors.gray[500]} />
                        <TextInput placeholder="Search for users." className="h-full flex-1" value={searchKeyword} onChangeText={setSearchKeyword} />
                    </View>
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



                    <KeyboardAwareFlatList

                        onEndReached={() => {
                            if (!usersSearchHasNextPage && usersSearchNextPageFetching) return;
                            usersSearchFetchNextPage();
                        }}
                        className="mt-6"
                        ListFooterComponent={() => (
                            /* Suggestion */
                            <>
                                {usersSearchNextPageFetching && <View className="py-4 items-center justify-center"><ActivityIndicator size={"small"} color={Colors.blue[500]} /></View>}
                                {
                                    suggestedConnectionLoading ? <View className="py-6 items-center justify-center">
                                        <ActivityIndicator size={"large"} color={Colors.blue[500]} />
                                    </View> :
                                        suggestedConnectionsData && suggestedConnectionsData?.pages.flatMap(page => page.suggestions).length > 0 && (
                                            <View className="mt-6">
                                                <Text className="text-lg font-bold">Recommended Connections</Text>

                                                <FlatList
                                                    onEndReached={() => {
                                                        if (suggestedConnectionsFetchingNextPage || !suggestedConnectionsHasNextPage) return;
                                                        suggestedConnectionsFetchNextPage();
                                                    }}

                                                    className="mt-2"
                                                    horizontal
                                                    showsHorizontalScrollIndicator={false}
                                                    ItemSeparatorComponent={() => <View className="w-2" />}
                                                    data={suggestedConnectionsData?.pages.flatMap(page => page.suggestions)}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity

                                                            className="rounded-xl border border-gray-200 items-center justify-center"
                                                            style={{
                                                                width: 150,
                                                                height: 190,
                                                                padding: 12
                                                            }}

                                                            onPress={() => {
                                                                setVisible(false)
                                                                router.push(`./user/${item.id}`)
                                                            }}
                                                        >

                                                            <Image
                                                                source={item.avatar_url ? { uri: item.avatar_url } : require("@/assets/images/no-avatar.png")}
                                                                style={{
                                                                    width: 75,
                                                                    height: 75,
                                                                    objectFit: "contain",
                                                                    borderRadius: 41
                                                                }}

                                                            />

                                                            <Text className="mt-2 font-bold text-center">{item.first_name} {item.last_name}</Text>

                                                            <TouchableOpacity
                                                                className="bg-blue-600 py-2 w-full mt-2 rounded-xl"
                                                                onPress={async () => {
                                                                    if (sendingConnection) return;

                                                                    try {

                                                                        await sendConnection(item.id);
                                                                        queryClient.invalidateQueries({
                                                                            queryKey: ["connections-suggested"]
                                                                        })

                                                                        queryClient.invalidateQueries({
                                                                            queryKey: ["user"]
                                                                        })
                                                                    }

                                                                    catch (err) {

                                                                        console.log(err);

                                                                    }
                                                                }}
                                                            >
                                                                {sendingConnection ? <ActivityIndicator size={"small"} color={Colors.white} /> :
                                                                    <Text className="text-white text-center font-bold">Connect</Text>
                                                                }
                                                            </TouchableOpacity>

                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) => item.id}

                                                    ListEmptyComponent={() => (
                                                        usersSearchError ? <Text className="text-red-500">Network error</Text> :
                                                            usersSearchLoading ? <ActivityIndicator size={"small"} color={Colors.blue[500]} /> :
                                                                <Text className="my-2 text-gray-500">No result found.</Text>
                                                    )}
                                                />
                                            </View>
                                        )
                                }
                            </>
                        )}

                        ListEmptyComponent={() => (
                            suggestedConnectionsError ? <Text className="text-red-500">Network error</Text> :
                                (searchKeyword.length > 2) && <Text className="my-2 text-gray-500">No result found.</Text>
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


                            </TouchableOpacity>
                        )}
                    />





                </View>
            </TouchableOpacity>
        </Modal >
    );
}