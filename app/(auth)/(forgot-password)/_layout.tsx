import { Stack } from "expo-router";

export default function ForgotPasswordLayout() {

    return <Stack screenOptions={{ headerShown: false }}>

        <Stack.Screen name="index" />
        <Stack.Screen name="verify-otp-screen" />
        <Stack.Screen name="reset-password-screen" />

    </Stack>
}