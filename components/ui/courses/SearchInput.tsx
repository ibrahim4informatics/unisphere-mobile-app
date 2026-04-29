import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View
      className={`
        flex-row items-center px-5 py-3 rounded-3xl
        ${focused ? "bg-white border-blue-400" : "bg-blue-50 border-blue-100"}
        border shadow-sm
      `}
    >
      <Ionicons
        name="search"
        size={20}
        color={focused ? "#2563EB" : "#64748B"}
      />

      <TextInput
        placeholder="Search courses..."
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="ml-3 flex-1 text-textPrimary text-sm"
      />

      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChange("")}>
          <Ionicons name="close-circle" size={18} color="#94A3B8" />
        </TouchableOpacity>
      )}
    </View>
  );
}