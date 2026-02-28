import { Stack } from "expo-router";

export default function RegisterScreenLayout() {

    return <Stack screenOptions={{ headerShown: false }}>

        <Stack.Screen name="index" />
        <Stack.Screen name="register-personal-info" />
    </Stack>
}