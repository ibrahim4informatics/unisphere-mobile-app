import { Stack } from "expo-router";

export default function UserProfileLayout() {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="settings-screen" />
            <Stack.Screen name="change-email-screen" />
            <Stack.Screen name="change-password-screen" />
            <Stack.Screen name="edit-profile-screen" />
            <Stack.Screen name="bookmarks-screen" />
        </Stack>
    )
}