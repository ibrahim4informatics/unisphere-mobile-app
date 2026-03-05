import useAnonymos from "@/hooks/useAnonymos";
import { Stack } from "expo-router";

export default function AuthLayout() {
    useAnonymos();
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login-screen" />
            <Stack.Screen name="(register)" />
        </Stack>
    )
}
