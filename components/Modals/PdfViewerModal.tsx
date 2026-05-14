import { Feather } from "@expo/vector-icons"
import * as FileSystem from "expo-file-system/legacy"
import React, { useEffect, useState } from "react"
import {
    ActivityIndicator,
    Modal,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import Pdf from "react-native-pdf"
import { SafeAreaView } from "react-native-safe-area-context"

type Props = {
    visible: boolean
    setVisible: (v: boolean) => void
    url: string
}

export default function PdfPreviewModal({
    visible,
    setVisible,
    url,
}: Props) {
    const [loading, setLoading] = useState(true)
    const [localUri, setLocalUri] = useState<string | null>(null)

    useEffect(() => {
        let isActive = true

        const downloadPdf = async () => {
            try {
                setLoading(true)
                setLocalUri(null)

                if (!visible) return

                const fileUri =
                    FileSystem.cacheDirectory + `pdf-${Date.now()}.pdf`

                const result = await FileSystem.downloadAsync(url, fileUri)

                if (isActive) {
                    setLocalUri(result.uri)
                    setLoading(false)
                }
            } catch (err) {
                console.log("PDF download error:", err)
                setLoading(false)
            }
        }

        downloadPdf()

        return () => {
            isActive = false
        }
    }, [url, visible])

    return (
        <Modal visible={visible} animationType="fade" transparent>

            {/* Overlay */}
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => setVisible(false)}
                className="flex-1 bg-black/40 justify-end"
            >

                {/* Modal content */}
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { }}
                    className="bg-white rounded-t-3xl overflow-hidden"
                    style={{ flex: 8 / 9 }}
                >
                    <SafeAreaView className="flex-1">

                        {/* HEADER */}
                        <View className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                            <Text className="text-xl font-extrabold text-blue-500">
                                Preview
                            </Text>

                            <TouchableOpacity
                                onPress={() => setVisible(false)}
                                className="h-10 w-10 rounded-full items-center justify-center bg-gray-100"
                            >
                                <Feather name="x" size={22} color="black" />
                            </TouchableOpacity>
                        </View>

                        {/* BODY */}


                        {loading && (
                            <View className="absolute inset-0 items-center justify-center bg-white z-10">
                                <ActivityIndicator size="large" color="#3b82f6" />
                            </View>
                        )}

                        {localUri && (
                            <Pdf
                                source={{ uri: localUri }}
                                scrollEnabled={true}
                                

                                style={{
                                    flex: 1,
                                    width: "100%",
                                    height: "100%"
                                }}
                                onError={(e) => console.log("PDF error:", e)}
                            />
                        )}

                    </SafeAreaView>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}