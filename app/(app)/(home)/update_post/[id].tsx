import UpdatePostField from "@/components/ui/UpdatePostField";
import Colors from "@/constants/Colors";
import { usePostById } from "@/hooks/api/queries/usePostById";
import useAppSelect from "@/hooks/useAppSelect";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdatePostScreen() {

    const params = useLocalSearchParams();
    const user = useAppSelect(state => state.auth.user);

    const post_id = parseInt(params.id as string)
    const { data: postData, isPending: postLoading, error: postError } = usePostById(post_id);

    if (postLoading) {
        return <View className="flex-1 items-center justify-center">
            <ActivityIndicator size={'large'} color={Colors.blue[500]} />
        </View>
    }

    if (postError || !postData.post) return (
        <Redirect href={"/(app)/(home)"} />
    )



    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">
            <SafeAreaView className="flex-1 px-6">

                <View className="mt-4 mb-6 flex-row items-center">
                    <TouchableOpacity
                        className="h-12 w-12 elevation-sm items-center justify-center bg-white rounded-full"
                        onPress={() => router.back()}
                    >
                        <Feather name="arrow-left" size={22} color={Colors.blue[500]} />
                    </TouchableOpacity>

                    <Text className="text-xl font-bold text-blue-500 mx-auto">Edit Post</Text>
                </View>


                <UpdatePostField
                    initialContent={postData.post.content}
                    initialMedias={postData.post.postMedias || []}
                    initialType={postData.post.type.toLowerCase()}
    

                    postId={parseInt(params.id as string)}
                />



            </SafeAreaView>
        </LinearGradient>
    )
}