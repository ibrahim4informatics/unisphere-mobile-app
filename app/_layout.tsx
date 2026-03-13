import Colors from "@/constants/Colors";
import { store } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as NavigationBar from "expo-navigation-bar";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../global.css";

const queryClient = new QueryClient();
export default function RootLayout() {


  useEffect(()=>{


    NavigationBar.setBackgroundColorAsync("#fff");
    NavigationBar.setButtonStyleAsync("dark")
  },[])



  return (


    <>
      <StatusBar style="dark" />
      <Provider store={store}>

        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider >
            <Stack screenOptions={{ headerShown: false }} >

              <Stack.Screen name="index" />
              <Stack.Screen name="welcome-screen" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
              <Stack.Screen name="(global)" options={{ headerShown: false }} />
            </Stack>


          </SafeAreaProvider>

        </QueryClientProvider>
        <TouchableOpacity style={{ position: "absolute", width: 30, height: 30, backgroundColor: Colors.blue[600], borderRadius: 999, bottom: 40, right: 10, justifyContent: "center", alignItems: "center" }} onPress={() => { router.push("/(app)/(home)/(update_post)/14") }}>

          <Text className="text-white">Dev</Text>
        </TouchableOpacity>
      </Provider>

    </>)
}
