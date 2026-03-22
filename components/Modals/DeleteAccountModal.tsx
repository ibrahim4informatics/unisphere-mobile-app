import Colors from "@/constants/Colors";
import useDeleteAccount from "@/hooks/api/mutations/useDeleteAccount";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import { ActivityIndicator, Alert, Modal, Text, TouchableOpacity, View } from "react-native";

type Props = {
    visible?: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm?: () => void; // optional callback for sign-out
};

export default function DeleteAccountModal({ visible, setVisible }: Props) {
    const queryClient = useQueryClient()
    const { mutateAsync, isPending } = useDeleteAccount()

    const handleDelete = async () => {
        if (isPending) return

        try {
            await mutateAsync();
            queryClient.clear();
            await secureStore.deleteItemAsync("refresh_token");
            await secureStore.deleteItemAsync("access_token");
            router.replace("/(auth)/login-screen");
            setVisible(false)
            return;
        }

        catch {
            Alert.alert("Failed", "Can not delete account now!")
            setVisible(false)
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
                        Delete Your Account
                    </Text>

                    {/* Description */}
                    <Text className="text-gray-700 text-center mt-4 leading-6">
                        Are you sure you want to delete your account,you can not get the data back!
                    </Text>

                    {/* Buttons */}
                    <TouchableOpacity
                        onPress={handleDelete}
                        className="bg-red-600 mt-6 h-16 rounded-2xl items-center justify-center shadow-sm disabled:bg-red-300"
                        disabled={isPending}
                    >
                        {
                            isPending ? <ActivityIndicator color={Colors.white} size={"small"} /> :
                                <Text className="text-white font-bold text-lg">Yes, Delete</Text>
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