import Colors from "@/constants/Colors";
import { OTPInputProps, OtpInputView } from "@bhojaniasgar/react-native-otp-input";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface Props extends OTPInputProps {

    label: string;
    value?: string;
    onChange: (text: string) => void;
    onBlur?: () => void;
    error_message?: string;
    keyboardType?: "default" | "number-pad" | "email-address";
    maxLength?: number,
    required?: boolean,
    secureTextEntry?: boolean;

}

export default function OtpTextInput({
    label,
    value,
    onChange,
    pinCount,
    size,
    onBlur,
    error_message,
    required = false,

}: Props) {

    return (

        <View className="gap-2">
            <Text className="text-sm font-semibold text-gray-700">
                {label}

                {required && <Text className="text-red-600"> *</Text>}
            </Text>


            <OtpInputView
                pinCount={pinCount}
                size={size}
                code={value}
                onBlur={onBlur}
                onCodeChanged={onChange}
                codeInputHighlightStyle={{
                    backgroundColor:Colors.blue[100],
                    borderColor:Colors.blue[500]
                }}
    
                codeInputFieldStyle={
                    {
                        backgroundColor: Colors.gray[100],
                        borderColor: Colors.gray[200],
                        color: Colors.blue[500],
                        fontWeight: "bold"
                    }
                }

            />


            {error_message && (
                <View className="flex-row items-center gap-2">
                    <Feather name="alert-circle" size={14} color="#EF4444" />
                    <Text className="text-red-500 text-xs">{error_message}</Text>
                </View>
            )}
        </View>

    )

}






// />