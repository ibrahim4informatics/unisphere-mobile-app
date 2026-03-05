import { Feather } from "@expo/vector-icons";
import { Text, TextInput, View } from "react-native";

interface Props {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    onBlur:()=>void;
    placeholder?: string;
    required?: boolean;
    error?: string;
    numberOfLines?: number;
    maxLength?: number;
}

export default function TextArea({
    label,
    value,
    onChangeText,
    onBlur,
    placeholder,
    required = false,
    error,
    numberOfLines = 4,
    maxLength,
}: Props) {
    const hasError = !!error;

    return (
        <View className="mb-8">
            {/* LABEL */}
            <Text className="text-sm font-semibold text-gray-700 mb-3 tracking-wide">
                {label} {required && <Text className="text-red-500">*</Text>}
            </Text>

            {/* INPUT CONTAINER */}
            <View
                className={`rounded-2xl border bg-gray-50 
        ${hasError ? "border-red-400 bg-red-50" : "border-blue-100"}`}
            >
                <TextInput
                    multiline
                    numberOfLines={numberOfLines}
                    textAlignVertical="top"
                    placeholder={placeholder}
                    placeholderTextColor="#94A3B8"
                    className="px-5 py-4 text-base min-h-[120px]"
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    maxLength={maxLength}
                />
            </View>

            {/* FOOTER: ERROR OR CHARACTER COUNT */}
            <View className="flex-row justify-between mt-2">
                {hasError ? (
                    <View className="flex-row items-center">
                        <Feather name="alert-circle" size={14} color="#EF4444" />
                        <Text className="text-red-500 text-xs ml-2">
                            {error}
                        </Text>
                    </View>
                ) : (
                    <View />
                )}

                {maxLength && (
                    <Text className="text-xs text-gray-400">
                        {value.length} / {maxLength}
                    </Text>
                )}
            </View>
        </View>
    );
}