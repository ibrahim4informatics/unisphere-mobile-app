import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface Props {
    label: string;
    placeholder: string;
    value?: string;
    onChange: (text: string) => void;
    onBlur?: () => void;
    requried?:boolean
    error?: string;
}

export default function PasswordInput({
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    requried=false,
}: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="gap-2">
            <Text className="text-sm font-semibold text-gray-700">
                {label}
                {requried && <Text className="text-red-600"> *</Text>}
            </Text>

            <View
                className={`flex-row items-center h-14 rounded-xl border px-3 ${error
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
            >
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                    className="flex-1 text-base"
                />

                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather
                        name={showPassword ? "eye-off" : "eye"}
                        size={20}
                        color="#64748B"
                    />
                </TouchableOpacity>
            </View>

            {error && (
                <View className="flex-row items-center gap-2">
                    <Feather name="alert-circle" size={14} color="#EF4444" />
                    <Text className="text-red-500 text-xs">{error}</Text>
                </View>
            )}
        </View>
    );
}