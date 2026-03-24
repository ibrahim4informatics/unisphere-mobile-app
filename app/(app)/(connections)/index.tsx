import Spacer from "@/components/ui/Spacer";
import UITabs from "@/components/ui/UITabs";
import Colors from "@/constants/Colors";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const ConnectionsRequestsTab = () => {

    const data = {
        "connections": [
            {
                "id": "b368fdce-8430-48f9-a623-82434d08924d",
                "first_name": "Belabed",
                "last_name": "Abd El Aziz",
                "avatar_url": null,
                "role": "TEACHER",
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
                    "field_of_study": "Computer Science",
                    "academic_title": "PROFESSOR"
                },
                "student_profile": null,
                "connection_id": 7
            }
        ],
        "has_more": false,
        "page": 1
    }
    return (
        <FlatList
            ListHeaderComponent={() => (
                <View className="py-2">
                    <Text className="text-black font-extrabold text-lg">New Requests(0)</Text>
                </View>
            )}
            data={data.connections}
            keyExtractor={(item) => item.connection_id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className="flex-row bg-white border border-gray-100 py-4 px-6 rounded-xl elevation-sm">

                    <Image source={item.avatar_url ? { uri: item.avatar_url } : require("@/assets/images/no-avatar.png")} style={{ width: 48, height: 48, borderRadius: 60 }} />
                    <View className="ml-2 flex-1">
                        <Text className="text-lg font-bold">{item.first_name} {item.last_name}</Text>
                        <View className="flex-row gap-2 items-center ">
                            <FontAwesome name="university" size={12} color={Colors.gray[400]} />
                            <Text className="text-gray-500">{item.role === "TEACHER" ? item.teacher_profile.university.name : item.student_profile}</Text>
                        </View>
                        {item.role === "TEACHER" && <Text className="text-blue-500 font-bold">{item.teacher_profile.academic_title}</Text>}

                    </View>

                    <TouchableOpacity className="flex-row mr-2 w-12 h-12 rounded-full bg-white border border-gray-100 elevation-sm items-center justify-center gap-2">

                        <Feather name="check" color={Colors.blue[500]} size={24} />

                    </TouchableOpacity>


                    <TouchableOpacity className="flex-row w-12 h-12 rounded-full bg-white border border-gray-100 elevation-sm items-center justify-center gap-2">

                        <Feather name="trash" color={Colors.red[500]} size={24} />

                    </TouchableOpacity>
                </TouchableOpacity>
            )}

        />
    )
}

export default function Index() {
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
                        onPress={() => router.back()}
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
                            return <Text>Your Connections</Text>
                        }
                    }}

                    tabs={[
                        { key: "requests", label: "Connections Requests" },
                        { key: "connections", label: "Your Connections" },
                    ]}
                />
            </SafeAreaView>
        </LinearGradient>
    )
}