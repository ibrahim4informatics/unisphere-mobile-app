import Colors from "@/constants/Colors";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
    const queryClient = useQueryClient();
    const user:any = queryClient.getQueryData(["profile"]);

    useEffect(()=>{
        
        if(user.data.profile.role === "STUDENT") router.replace("/(app)/(courses)//student/courses");
        else if (user.data.profile.role === "TEACHER") router.replace("/(app)/(courses)/teacher/courses")


    }, [user])
    return <View className={"flex-1 items-center justify-center"}>
        <ActivityIndicator size={"large"} color={Colors.blue[500]} />
    </View>
}