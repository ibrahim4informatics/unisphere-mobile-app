import Card from "@/components/ui/Card";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Colors from "@/constants/Colors";
import useUploadAvatar from "@/hooks/api/mutations/useUploadAvatar";
import useAppSelect from "@/hooks/useAppSelect";
import pickImage from "@/utils/pickImage";
import { Feather } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const UploadProfilePicture = () => {


    const router = useRouter();
    useEffect(() => {
        if (!user) router.replace("/(auth)/(register)");
    }, []);

    const user = useAppSelect(state => state.auth.user);

    const [image, setImage] = useState<{ uri: string | null, type: any, name: string | null }>({
        name: null,
        type: null,
        uri: null
    });


    const { mutateAsync, isPending, error } = useUploadAvatar()


    return (
        <LinearGradient
            colors={["#f0f6ff", "#ffffff"]}
            className="flex-1"
        >
            <SafeAreaView className="flex-1 px-6">

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    enableOnAndroid
                    extraScrollHeight={20}
                    keyboardShouldPersistTaps="handled"
                >

                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mt-4 w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
                    >
                        <Feather
                            name="arrow-left"
                            size={20}
                            color={Colors.blue["500"]}
                        />
                    </TouchableOpacity>


                    {/* Header */}
                    <View className="items-center mt-10">

                        <View className="w-28 h-28 rounded-full bg-blue-100 items-center justify-center shadow-lg">
                            <FontAwesome5
                                name="user-circle"
                                size={60}
                                color={Colors.blue["500"]}
                            />
                        </View>

                        <Text className="text-3xl font-extrabold mt-6 text-gray-800">
                            Profile Picture
                        </Text>

                        <Text className="text-gray-400 text-center mt-3 px-6 leading-5">
                            Upload a profile picture so other students and teachers can recognize you.
                        </Text>

                    </View>


                    <Card>

                        <View className="items-center">

                            {/* Image Preview */}
                            <View className="mt-4">

                                {image.uri ? (
                                    <Image
                                        source={{ uri: image.uri }}
                                        className="w-36 h-36 rounded-full"
                                    />
                                ) : (
                                    <View className="w-36 h-36 rounded-full bg-gray-200 items-center justify-center">
                                        <Feather
                                            name="image"
                                            size={40}
                                            color="#9CA3AF"
                                        />
                                    </View>
                                )}

                            </View>


                            {/* Pick Image Button */}
                            <TouchableOpacity
                                onPress={async () => {
                                    const image:any = await pickImage();
                                    if (!image) return;
                                    setImage({ uri: image.uri, name: `${user?.id}-${Date.now()}-profile.${image.mimeType?.split("/")[1]}`, type: image.mimeType });
                                }}
                                className="mt-6 bg-blue-50 px-6 py-3 rounded-xl"
                            >
                                <Text className="text-blue-600 font-semibold">
                                    Choose Photo
                                </Text>
                            </TouchableOpacity>


                            <View className="mt-6 w-full">

                                <PrimaryButton
                                    title="Continue"
                                    disabled={!image || isPending}
                                    loading={isPending}
                                    onPress={async () => {

                                        if (!user) return

                                        try {

                                            const data = new FormData();
                                            data.append("user_id", user.id);
                                            data.append("picture", {
                                                uri: image.uri,
                                                name: `${Date.now}.${image.type.split("/")[1]}`,
                                                type: image.type
                                            } as any);
                                            await mutateAsync(data)

                                            router.replace("/(auth)/(register)/confirm-idendity")
                                        }

                                        catch (err: any) {
                                            console.log(JSON.stringify(err.response.data));
                                            return;
                                        }
                                    }}
                                />

                            </View>

                        </View>

                    </Card>

                </KeyboardAwareScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default UploadProfilePicture;