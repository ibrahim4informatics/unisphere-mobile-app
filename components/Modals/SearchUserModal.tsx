import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";


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
                        
                        ListFooterComponent={() => (

                            <>

                                <View className="mt-6">
                                    <Text className="text-lg font-bold">Recommended Connections</Text>

                                    <FlatList

                                        className="mt-2"
                                        horizontal
                                        showsHorizontalScrollIndicator={false}

                                        data={data.suggestions}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                className="rounded-xl border border-gray-200 items-center justify-center"
                                                style={{
                                                    width: 150,
                                                    height: 190,
                                                    padding: 12
                                                }}

                                                onPress={() => {
                                                    console.log(`go to profile id: ${item.id}`)
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
                                                    onPress={() => {
                                                        console.log(`connect with user id ${item.id}`)
                                                    }}
                                                >
                                                    <Text className="text-white text-center font-bold">Connect</Text>
                                                </TouchableOpacity>

                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={(item) => item.id}
                                    />
                                </View>
                            </>
                        )}

                        ListEmptyComponent={() => (

                            searchKeyword.length > 0 && <Text className="my-2 text-gray-500">No result found.</Text>
                        )}

                        data={[]}
                        renderItem={() => <></>}
                    />


                    {/* Suggestion */}











                </View>
            </TouchableOpacity>
        </Modal>
    );
}