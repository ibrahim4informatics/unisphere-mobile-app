import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  spacing?:number
}

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  spacing=0
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      className={`w-full bg-blue-600 rounded-2xl h-16 items-center justify-center disabled:bg-blue-300`}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-base font-semibold">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}