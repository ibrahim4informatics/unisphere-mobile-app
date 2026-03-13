import { Stack } from "expo-router";

export default function PostsLayout(){
    return (
        <Stack screenOptions={{ headerShown:false }}>

            <Stack.Screen name="index" />
            <Stack.Screen name="[id]" />
            <Stack.Screen name="update_post/[id]" />

        </Stack>
    )
}