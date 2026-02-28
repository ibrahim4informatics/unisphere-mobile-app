import Colors from "@/constants/Colors";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";


interface Props {
    onPress: () => any,
    title: string,
    loading?: boolean
    disabled?: boolean
}
export default function SecondaryButton({ onPress, title, loading = false, disabled = false }: Props) {
    return (
        <TouchableOpacity
            disabled={disabled || loading}
            onPress={onPress}
            className="w-full bg-white h-14 justify-center rounded-2xl items-center border border-blue-200 disabled:bg-blue-100 disabled:opacity-60"
            activeOpacity={0.85}
        >
            {loading ? (
                <ActivityIndicator color={Colors.blue[500]} />
            ) : (
                <Text className="text-blue-500 text-base font-semibold">
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    )
}