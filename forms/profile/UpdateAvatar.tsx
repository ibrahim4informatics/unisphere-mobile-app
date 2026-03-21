import Colors from "@/constants/Colors"
import { Feather } from "@expo/vector-icons"
import { Image } from "expo-image"
import { TouchableOpacity, View } from "react-native"

type Props = {

    avatar_url?: string
}

export default function UpdateAvatar({ avatar_url = undefined }: Props) {

    return (
        <View className=" mt-2 mb-4 items-center">
            {avatar_url ? (

                <View className="rounded-full relative w-22 h-22 ">
                    <View className="absolute top-0 left-0 bg-black/20 flex-1" style={{ width: 124, height: 124, borderRadius: 62, zIndex: 2 }}></View>
                    <Image source={{ uri: avatar_url }} style={{ width: 124, height: 124, borderRadius: 62, zIndex: 0 }} />

                    <TouchableOpacity className="absolute right-0 top-0 p-2 rounded-full items-center justify-center bg-blue-500 border-2 border-white" style={{ zIndex: 3 }}>
                        <Feather name="edit-2" color={Colors.white} size={22} />
                    </TouchableOpacity>

                </View>
            ) :
                (<></>)}
        </View>
    )
}