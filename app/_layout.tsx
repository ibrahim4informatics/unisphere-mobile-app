import { store } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../global.css";


const queryClient = new QueryClient();
export default function RootLayout() {



  return (


    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }} >

            <Stack.Screen name="index" />
            <Stack.Screen name="welcome-screen" />
            <Stack.Screen name="(auth)" />
          </Stack>
        </SafeAreaProvider>

      </QueryClientProvider>
    </Provider>
  )
}
