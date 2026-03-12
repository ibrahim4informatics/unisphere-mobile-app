import { Stack } from "expo-router";

export default function GlobalScreensLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen name="not-found-screen" />

        </Stack>
    )
}