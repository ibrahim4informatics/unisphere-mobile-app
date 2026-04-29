import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Courses() {
    return <LinearGradient
        colors={["#f8fbff", "#eef4ff"]}
        className="flex-1"
    >
        <SafeAreaView className="flex-1 px-6">
            <Text>Teacher Courses Screen</Text>
        </SafeAreaView>
    </LinearGradient>
}