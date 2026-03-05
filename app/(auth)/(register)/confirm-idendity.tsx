import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import Spacer from "@/components/ui/Spacer";
import Colors from "@/constants/Colors";
import useUploadIdentity from "@/hooks/api/mutations/useUploadIdentity";
import useAppSelect from "@/hooks/useAppSelect";
import openCamera from "@/utils/openCamera";
import pickImage from "@/utils/pickImage";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfirmIdentity() {

    const user_id = useAppSelect(state => state.auth.user?.id);
    const [uploadError, setUploadError] = useState("");
    const { mutateAsync, isPending } = useUploadIdentity();

    useEffect(() => {
        if (!user_id) router.replace("/(auth)/(register)");
        console.log(user_id)
    }, [user_id])


    const handleUpload = async (file: any) => {

        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", user_id || "");

        try {

            const response = await mutateAsync(formData);

            if (response.status === 200) router.replace("/(auth)/(register)/register-success");
        }

        catch (err: any) {
            setUploadError("File can't ne uploaded")
        }


    }


    return (
        <LinearGradient
            colors={["#f0f6ff", "#ffffff"]}
            className="flex-1"
        >
            {!isPending ? (<SafeAreaView className="flex-1 pt-12 px-6">



                {/* Icon Section */}
                <View className="items-center mt-10">
                    <View className="w-28 h-28 rounded-full bg-blue-100 items-center justify-center shadow-lg">
                        <MaterialIcons
                            size={60}
                            color={Colors.blue["500"]}
                            name="fingerprint"
                        />
                    </View>

                    <Text className="text-3xl font-extrabold mt-6 text-gray-800">
                        Almost Done !
                    </Text>

                    <Text className="text-gray-400 text-center mt-3 px-6 leading-5">
                        UniSphere needs this for confirmation and it will be deleted once approved
                    </Text>

                    <Text className="font-extrabold text-center mt-3 px-6 leading-5">
                        The uploaded file must be image for your id contains the same data as you registered
                    </Text>

                    {uploadError && (
                        <Text className="text-red-500 text-base text-center mt-3 px-6 leading-5">
                            {uploadError}
                        </Text>)}
                </View>

                <View className="flex-1" />
                <SecondaryButton title="Open Camera" onPress={async () => {
                    const file = await openCamera();

                    if (file) {
                        await handleUpload({
                            uri: file.uri,
                            name: `${user_id}-identity.jpg`,
                            type: file.mimeType,
                        });
                    }
                }} />
                <Spacer spaceY="md" />

                <PrimaryButton title="Upload Identity Card" onPress={async () => {
                    const file = await pickImage();
                    if (file) {
                        await handleUpload({
                            uri: file.uri,
                            name: `${user_id}-identity.jpg`,
                            type: file.mimeType,
                        })
                    }

                }} />
                <Spacer spaceY="3xl" />

            </SafeAreaView>) : (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size={"large"} color={Colors.blue[600]} />

                </View>
            )}
        </LinearGradient >
    )
}