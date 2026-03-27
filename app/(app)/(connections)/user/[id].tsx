import Colors from "@/constants/Colors";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const data: any = {
    "user": {
        "id": "b368fdce-8430-48f9-a623-82434d08924d",
        "first_name": "Belabed",
        "last_name": "Abd El Aziz",
        "bio": null,
        "avatar_url": "https://res.cloudinary.com/djn33vea9/image/upload/v1774302431/users/56949d61-5a38-4376-8bf6-df5dffa0affc/profile_pictures/i0gvbii2xb0npdq8nnyv.jpg",
        "email": "azz@gmail.com",
        "password": "$argon2id$v=19$m=65536,t=3,p=4$9v1yuvB0WLHmf/MbeTGs4A$k/hB2/O2ZCK07GzHRU52oynkIIkuEwxSPb9Q5XkjkUQ",
        "student_id": null,
        "role": "TEACHER",
        "status": "PENDING",
        "onboarding_completed": false,
        "id_card_url": null,
        "deleted_at": null,
        "updated_at": "2026-03-26T21:12:31.096Z",
        "created_at": "2026-03-15T22:51:16.190Z",
        "student_profile": null,
        "teacher_profile": {
            "id": 7,
            "phone_number": "0645889987",
            "university_of_study": "USTO",
            "field_of_study": "Computer Science",
            "specialization": "Network",
            "academic_title": "PROFESSOR",
            "leading_department_id": null,
            "univeristy_id": "014ede68-7bdd-4b86-b52b-4339a309b024",
            "user_id": "b368fdce-8430-48f9-a623-82434d08924d",
            "updated_at": "2026-03-24T21:01:45.624Z",
            "created_at": "2026-03-24T21:02:26.192Z",
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
            }
        },
        "admin_profile": null,
        "_count": {
            "bookmarks": 0,
            "posts": 0,
            "connections": 1
        },
        "connection_status": null
    }
}
export default function PublicUserProfile() {

    const params: { id: string } = useLocalSearchParams();
    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">

            <SafeAreaView className="flex-1 px-6 pt-2">

                {/* Back Button */}
                <TouchableOpacity
                    className="bg-white h-11 w-11 items-center justify-center rounded-full shadow-sm mr-3 elevation-md"
                    onPress={() => router.back()}
                >
                    <Feather name="arrow-left" size={20} color={Colors.blue[500]} />
                </TouchableOpacity>



                <View className="items-center mt-6">
                    <Image
                        source={data.user.avatar_url ? { uri: data.user.avatar_url } : require("@/assets/images/no-avatar.png")}
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 60,
                            objectFit: "contain",
                        }}
                    />

                    <Text className="mt-4 text-2xl font-bold">{data.user.first_name} {data.user.last_name}</Text>
                    <View className="flex-row gap-2 items-center">
                        <FontAwesome name="university" color={Colors.gray[500]} size={18} />
                        <Text className="mt-2 text-lg text-gray-500">{data.user.role === "STUDENT" ? data.user.student_profile.university.name : data.user.teacher_profile.university.name}</Text>

                    </View>

                    <Text className="text-center bg-green-100 text-green-600 px-6 py-3 mt-2 rounded-full border border-gray-100 elevation-sm">{data.user.role}</Text>
                </View>

                <View className="flex-row items-center gap-3 justify-center mt-4">

                    <View className=" rounded-xl border bg-white elevation-sm border-gray-100 p-4 items-center w-1/2">
                        <Text className="text-xl font-bold">{data.user._count.posts}</Text>
                        <Text className="text-gray-500 font-bold">POSTS</Text>
                    </View>


                    <View className=" rounded-xl border bg-white  elevation-sm border-gray-100 p-4 items-center w-1/2" >
                        <Text className="text-xl font-bold">{data.user._count.connections}</Text>
                        <Text className="text-gray-500 font-bold">CONNECTIONS</Text>
                    </View>
                </View>

                {
                    data.user.connection_status === "PENDING" && (
                        <View className="py-4 mt-4 bg-white rounded-xl border border-gray-100 elevation-sm">
                            <Text className="text-center text-blue-500">Connection Request Sent</Text>
                        </View>
                    )
                }

                {
                    data.user.connection_status === "ACCEPTED" && (
                        <TouchableOpacity className="bg-blue-500 py-4 items-center justify-center flex-row gap-2 mt-4 rounded-xl">
                            <Feather name="send" color={Colors.white} size={24} />

                            <Text className="text-white font-bold">Send Message</Text>

                        </TouchableOpacity>
                    )
                }


                 {
                    !data.user.connection_status && (
                        <TouchableOpacity className="bg-blue-500 py-4 items-center justify-center flex-row gap-2 mt-4 rounded-xl">
                            <Text className="text-white font-bold">Connect</Text>
                        </TouchableOpacity>
                    )
                }
            </SafeAreaView>
        </LinearGradient>
    )
}