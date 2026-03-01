import { Feather } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";

interface Props {
    label: string;
    length?: number;
    value?: string;
    onChange: (otp: string) => void;
    onBlur: () => void;
    error?: string;
    required?: boolean;
}

export default function OtpInput({
    label,
    length = 6,
    value = "",
    onChange,
    onBlur,
    error,
    required = false,
}: Props) {
    const [otp, setOtp] = useState<string[]>(
        value.split("").concat(Array(length).fill("")).slice(0, length)
    );

    const inputs = useRef<TextInput[]>([]);

    const handleChange = (text: string, index: number) => {
        if (!/^\d?$/.test(text)) return;

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        const joined = newOtp.join("");
        onChange(joined);

        if (text && index < length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (key: string, index: number) => {
        if (key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View className="gap-2">
            {/* Label */}
            <Text className="text-sm font-semibold text-gray-700">
                {label}
                {required && <Text className="text-red-600"> *</Text>}
            </Text>

            {/* OTP Boxes */}
            <View className="flex-row justify-between">
                {Array(length)
                    .fill(0)
                    .map((_, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => {
                                if (ref) inputs.current[index] = ref;
                            }}
                            value={otp[index] || ""}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={({ nativeEvent }) =>
                                handleBackspace(nativeEvent.key, index)
                            }

                            onBlur={() => {
                                if (index === length - 1) {
                                    onBlur();
                                }
                            }}
                            keyboardType="number-pad"
                            maxLength={1}
                            className={`h-14 w-12 text-center text-base rounded-xl border ${error
                                ? "border-red-500 bg-red-50"
                                : "border-gray-200 bg-gray-50"
                                }`}
                        />
                    ))}
            </View>

            {/* Error */}
            {error && (
                <View className="flex-row items-center gap-2">
                    <Feather name="alert-circle" size={14} color="#EF4444" />
                    <Text className="text-red-500 text-xs">{error}</Text>
                </View>
            )}
        </View>
    );
}