import { Text, TouchableOpacity } from "react-native";



type Props = {
    label: string,
    active: boolean,
    onPress: () => void
}
export default function FilterChip({ label, active, onPress }: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`px-4 py-2 rounded-full mr-2 ${active ? "bg-primary" : "bg-blue-100"
                }`}
        >
            <Text className={active ? "text-white" : "text-primary"}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}