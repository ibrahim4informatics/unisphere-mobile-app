import React from "react";
import { View } from "react-native";

interface CardProps {
    children: React.ReactNode
}

export default function Card({ children }: CardProps) {
    return (
        <View className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            {children}

        </View>
    )
}