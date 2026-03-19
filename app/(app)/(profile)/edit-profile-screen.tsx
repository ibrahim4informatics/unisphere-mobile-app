import UITabs from "@/components/ui/UITabs";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const schema = z.object({
    new_email: z.email({ error: ({ input }) => !input ? "Field is required." : "Invalid email." })
});

type FormFields = z.infer<typeof schema>;

export default function EditProfile() {




    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">
            <SafeAreaView className="flex-1 px-5">

                {/* Header */}
                <View className="flex-row items-center mb-6 pt-4">
                    <TouchableOpacity
                        className="bg-white h-11 w-11 items-center justify-center rounded-full shadow-sm mr-3"
                        onPress={() => router.back()}
                    >
                        <Feather name="arrow-left" size={20} color={Colors.blue[500]} />
                    </TouchableOpacity>

                    <Text className="text-2xl font-extrabold text-gray-900">
                        Edit Profile
                    </Text>
                </View>

                <UITabs
                
                    tabs={[{key:"personal", label:"Personal Informations"}, {key:"academic", label:"Academic Informations"}]}
                    renderContent={(activeTab)=>{

                        if(activeTab === "personal"){
                            return <Text>Personal</Text>
                        }

                        else if(activeTab === "academic"){
                            return <Text>Academic</Text>
                        }
                    }}
                />


            </SafeAreaView>
        </LinearGradient>
    );
}