import * as FileSystem from 'expo-file-system/legacy'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Sharing from 'expo-sharing'
import { Platform } from 'react-native'

export const downloadAndOpenFile = async (
    url: string,
    fileName: string,
    onProgress: (progress: number) => void
) => {
    const fileUri = FileSystem.documentDirectory + "Unispher App" + fileName + '.pdf'

    const downloadResumable = FileSystem.createDownloadResumable(
        url,
        fileUri,
        {},
        (downloadProgress) => {
            const progress =
                downloadProgress.totalBytesWritten /
                downloadProgress.totalBytesExpectedToWrite

            onProgress(progress)
        }
    )

    const result = await downloadResumable.downloadAsync()

    if (!result?.uri) return

    // ✅ ANDROID → Show "Open with"
    if (Platform.OS === 'android') {
        const contentUri = await FileSystem.getContentUriAsync(result.uri)

        await IntentLauncher.startActivityAsync(
            'android.intent.action.VIEW',
            {
                data: contentUri,
                flags: 1,
                type: 'application/pdf',
            }
        )
    }

    // ✅ iOS → Share sheet (acts like open with)
    if (Platform.OS === 'ios') {
        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(result.uri)
        }
    }
}