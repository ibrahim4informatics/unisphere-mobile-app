import Colors from "@/constants/Colors";
import useSigneOut from "@/hooks/api/mutations/useSigneOut";
import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from "react-native";

type Props = {
    visible?: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm?: () => void; // optional callback for sign-out
};

export default function SignOutModal({ visible, setVisible, onConfirm }: Props) {

    const { mutateAsync, isPending } = useSigneOut()

    const handleSignOut = async () => {
        if (isPending) return
        try {
            const refresh_token = await secureStore.getItemAsync("refresh_token") || "";
            await mutateAsync(refresh_token);
            await secureStore.deleteItemAsync("refresh_token");
            await secureStore.deleteItemAsync("access_token");
            router.replace("/(auth)/login-screen");
            return
        }

        catch (err) {
            console.log(err)
            return;
        }

        
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            {/* Background overlay */}
            <TouchableOpacity
                className="flex-1 bg-black/30 justify-end"
                activeOpacity={1}
                onPress={() => setVisible(false)}
            >
                {/* Modal content */}
                <View className="px-6 pt-8 pb-12 bg-white rounded-t-3xl shadow-lg">

                    {/* Title */}
                    <Text className="text-red-600 font-extrabold text-2xl text-center">
                        Sign Out
                    </Text>

                    {/* Description */}
                    <Text className="text-gray-700 text-center mt-4 leading-6">
                        Are you sure you want to sign out? You will need to log in again to access your account.
                    </Text>

                    {/* Buttons */}
                    <TouchableOpacity
                        onPress={handleSignOut}
                        className="bg-red-600 mt-6 h-16 rounded-2xl items-center justify-center shadow-sm disabled:bg-red-300"
                        disabled={isPending}
                    >
                        {
                            isPending ? <ActivityIndicator color={Colors.white} size={"small"} /> :
                                <Text className="text-white font-bold text-lg">Sign Out</Text>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setVisible(false)}
                        className="bg-gray-100 border border-gray-200 mt-4 h-16 rounded-2xl items-center justify-center"
                    >
                        <Text className="text-red-600 font-semibold text-lg">Cancel</Text>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
        </Modal>
    );
}