import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Tab = {
    key: string;
    label: string;
};

type Props = {
    tabs: Tab[];
    renderContent: (activeTab: string) => React.ReactNode;
};

export default function UITabs({ tabs, renderContent }: Props) {
    const [activeTab, setActiveTab] = useState(tabs[0].key);

    return (
        <View className="flex-1">

            {/* Tabs header */}
            <View className="flex-row bg-gray-100 rounded-xl overflow-hidden mb-4">
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.key}
                        onPress={() => setActiveTab(tab.key)}
                        className={`flex-1 py-3 items-center justify-center ${activeTab === tab.key
                                ? "bg-blue-600"
                                : "bg-gray-100"
                            }`}
                    >
                        <Text
                            className={`font-semibold ${activeTab === tab.key ? "text-white" : "text-gray-600"
                                }`}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Content based on active tab */}
            <View className="flex-1">
                {renderContent(activeTab)}
            </View>
        </View>
    );
}