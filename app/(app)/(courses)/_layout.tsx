import { Stack } from "expo-router";

export default function CoursesLayout() {
    return <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="student/courses" />
        <Stack.Screen name="student/my-courses" />
        <Stack.Screen name="student/course_details/[id]" />
        <Stack.Screen name="student/course_details/sections" />
    </Stack>
}