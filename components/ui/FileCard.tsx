import Colors from "@/constants/Colors"
import { downloadAndOpenFile } from "@/utils/downloadService"
import { Feather } from "@expo/vector-icons"
import { useState } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"


type FileCardProps = {
    file: any
    onView: () => void
    onDownload: () => void
}

export default function FileCard({ file, onView, onDownload }: FileCardProps) {
    const [isDownloading, setIsDownloading] = useState(false);
    const [progress, setProgress] = useState(0);
    return (
        <View
            className="bg-white rounded-3xl p-5 mb-4 border border-blue-50"
            style={{
                shadowColor: "#3B82F6",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.08,
                shadowRadius: 14,
                elevation: 4,
            }}
        >
            {/* Top Row */}
            <View className="flex-row items-center mb-4">

                <View className="bg-blue-100 w-12 h-12 rounded-2xl items-center justify-center">
                    <Feather name="file-text" size={22} color="#3B82F6" />
                </View>

                <View className="ml-4 flex-1">
                    <Text className="font-semibold text-gray-800">
                        {file.type} Material: {file.name.slice(0, 15) + "..."}
                    </Text>
                    <Text className="text-xs text-gray-400">
                        Added {new Date(file.created_at).toLocaleDateString()}
                    </Text>
                </View>
            </View>

            {/* Buttons */}
            <View className="flex-row gap-3">

                {/* View */}
                <TouchableOpacity
                    onPress={onView}
                    className="flex-1 bg-blue-500 py-3 rounded-2xl flex-row justify-center items-center"
                >
                    <Feather name="eye" size={18} color="#fff" />
                    <Text className="text-white font-semibold ml-2">
                        View
                    </Text>
                </TouchableOpacity>

                {/* Download */}
                <TouchableOpacity
                    disabled={isDownloading}
                    onPress={async () => {

                        if (isDownloading) return;
                        setIsDownloading(true);

                        try {
                            await downloadAndOpenFile(file.link, "file", (progress) => { setProgress(progress) })

                            onDownload()
                        }

                        catch (err) {
                            console.log(err)
                        }
                        finally {
                            setIsDownloading(false);
                        }
                    }}
                    className="flex-1 border border-blue-300 py-3 rounded-2xl flex-row justify-center items-center bg-blue-50"
                >
                    {
                        isDownloading ? (<>

                            <ActivityIndicator size={"small"} color={Colors.blue[500]} />
                            <Text className="text-blue-500 ml-2">{Math.floor(progress * 100)} %</Text>
                        </>) : (
                            <>
                                <Feather name="download" size={18} color="#3B82F6" />
                                <Text className="text-blue-600 font-semibold ml-2">
                                    Download
                                </Text>
                            </>
                        )
                    }
                </TouchableOpacity>
            </View>
        </View >
    )
}