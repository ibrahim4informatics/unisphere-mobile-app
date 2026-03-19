import { Stack } from "expo-router";

export default function GlobalScreensLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen name="not-found-screen" />
            <Stack.Screen name="network-error" />
            <Stack.Screen name="help-screen" />
            <Stack.Screen name="terms-screen" />
            <Stack.Screen name="privacy-policy-screen" />
            <Stack.Screen name="support-screen" />

        </Stack>
    )
}