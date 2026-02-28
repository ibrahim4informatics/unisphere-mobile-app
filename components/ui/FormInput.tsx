import { Feather } from "@expo/vector-icons";
import { Text, TextInput, View } from "react-native";

interface Props  {
  label: string;
  placeholder: string;
  value?: string;
  onChange: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  keyboardType?: "default" | "number-pad" | "email-address";
  maxLength?:number,
  required?:boolean,
  secureTextEntry?: boolean;
}

export default function FormInput({
  label,
  placeholder,
  value,
  onChange,
  maxLength,
  onBlur,
  error,
  required=false,
  keyboardType = "default",
  secureTextEntry = false,

}: Props) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-semibold text-gray-700">
        {label}

        {required && <Text className="text-red-600"> *</Text>}
      </Text>

      <TextInput
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        className={`h-14 px-4 rounded-xl text-base border ${
          error
            ? "border-red-500 bg-red-50"
            : "border-gray-200 bg-gray-50"
        }`}
      />

      {error && (
        <View className="flex-row items-center gap-2">
          <Feather name="alert-circle" size={14} color="#EF4444" />
          <Text className="text-red-500 text-xs">{error}</Text>
        </View>
      )}
    </View>
  );
}