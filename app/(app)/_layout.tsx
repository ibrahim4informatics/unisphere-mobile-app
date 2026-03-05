import { Stack } from "expo-router";

export default function AppLayout() {

    // useAuth();
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    )
}