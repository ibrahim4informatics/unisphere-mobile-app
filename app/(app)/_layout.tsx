import useAuth from "@/hooks/useAuth";
import { connectSocket, getSocket } from "@/services/socket";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import * as secureStore from "expo-secure-store";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AppLayout() {

    useAuth();


    useEffect(() => {

        const socket = getSocket();
        if (!socket) {
            const token = secureStore.getItem("access_token");
            connectSocket(token!);
        }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }} edges={["bottom"]}>

            <Tabs initialRouteName="(home)" screenOptions={{
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
                <Tabs.Screen name="(messages)" options={{

                    title: "Messages",
                    tabBarIcon: ({ color, focused, size }) => <Feather name="inbox" size={size} color={color} />
                }} />

                <Tabs.Screen name="(connections)" options={{

                    title: "Network",
                    tabBarIcon: ({ color, focused, size }) => <AntDesign name="usergroup-add" size={size} color={color} />
                }} />

                <Tabs.Screen name="(profile)" options={{

                    title: "Profile",
                    tabBarIcon: ({ color, focused, size }) => <Feather name="user" size={size} color={color} />
                }} />

            </Tabs>
        </SafeAreaView>
    )
}