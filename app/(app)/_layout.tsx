import useAuth from "@/hooks/useAuth";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AppLayout() {

    useAuth();
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }} edges={["bottom"]}>

            <Tabs screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 70,
                    paddingTop: 6,
                    paddingBottom: 8,
                    borderTopWidth: 0,
                    elevation: 8
                },

                tabBarIconStyle: {
                    marginBottom: 2
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: 500,
                },
                tabBarItemStyle: {
                    paddingVertical: 4
                }
            }}
            >
                <Tabs.Screen name="(home)" options={{

                    title: "Home",
                    tabBarIcon: ({ color, focused, size }) => <Feather name="home" size={size} color={color} />
                }} />


                <Tabs.Screen name="(profile)" options={{

                    title: "Profile",
                    tabBarIcon: ({ color, focused, size }) => <Feather name="user" size={size} color={color} />
                }} />
            </Tabs>
        </SafeAreaView>
    )
}