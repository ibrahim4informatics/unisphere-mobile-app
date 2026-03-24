import DeleteAccountModal from '@/components/Modals/DeleteAccountModal'
import SignOutModal from '@/components/Modals/SignOutModal'
import Colors from '@/constants/Colors'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { Icon } from '@expo/vector-icons/build/createIconSet'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type ItemProps = {
    icon: string,
    label: string,
    IconLib?: Icon<any, any>,
    danger?: boolean,
    onPress: () => void

}

const Item = ({ icon, label, danger = false, onPress, IconLib = Feather }: ItemProps) => (
    <TouchableOpacity className="flex-row items-center py-4 px-2 rounded-xl active:opacity-70" onPress={onPress}>

        {/* Icon */}
        <View className={`w-10 h-10 items-center justify-center rounded-full mr-3 ${danger ? "bg-red-100" : "bg-gray-100"
            }`}>
            <IconLib
                name={icon}
                size={18}
                color={danger ? Colors.red[600] : Colors.gray[700]}
            />
        </View>

        {/* Label */}
        <Text className={`flex-1 text-base font-semibold ${danger ? "text-red-600" : "text-gray-800"
            }`}>
            {label}
        </Text>

        {/* Arrow */}
        <Feather
            name='chevron-right'
            size={18}
            color={danger ? Colors.red[600] : Colors.gray[400]}
        />
    </TouchableOpacity>
)

const Section = ({ title, children }: any) => (
    <View className="mb-6">
        <Text className="text-gray-400 text-xs uppercase mb-2 px-2 tracking-wide">
            {title}
        </Text>
        <View className="bg-white rounded-2xl p-2 shadow-sm">
            {children}
        </View>
    </View>
)

const SettingsScreen = () => {

    const [signoutVisible, setSignOutVisible] = useState(false);
    const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);
    return (
        <LinearGradient colors={["#f8fbff", "#eef4ff"]} className="flex-1">

            <SafeAreaView className='flex-1 px-5 pt-4' >

                {/* Header */}
                <View className='flex-row items-center mb-6'>

                    <TouchableOpacity className='bg-white h-11 w-11 items-center justify-center rounded-full shadow-sm mr-3'
                        onPress={() => { router.back() }}
                    >
                        <Feather name='arrow-left' color={Colors.blue[500]} size={20} />
                    </TouchableOpacity>

                    <Text className='text-2xl font-extrabold text-gray-900'>
                        Settings
                    </Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* ACCOUNT */}
                    <Section title="Account">
                        <Item icon="user" label="Edit Profile" onPress={() => { router.push("/edit-profile-screen") }} />
                        <Item icon="password" label="Change Password" IconLib={MaterialIcons} onPress={() => { router.push("/change-password-screen") }} />
                        <Item icon="mail" label="Change Email" onPress={() => { router.push("/change-email-screen") }} />
                    </Section>

                    {/* CONTENT */}
                    <Section title="Content">
                        <Item icon="bookmark" label="Bookmarks" onPress={() => { router.push("/bookmarks-screen") }} />
                    </Section>

                    {/* PRIVACY & LEGAL */}
                    <Section title="Privacy & Legal">
                        <Item icon="shield" label="Privacy Policy" onPress={() => { router.push("/(global)/privacy-policy-screen") }} />
                        <Item icon="file-text" label="Terms of Use" onPress={() => { router.push("/(global)/terms-screen") }} />
                    </Section>

                    {/* HELP & SUPPORT */}
                    <Section title="Help & Support">
                        <Item icon="help-circle" label="Help Center" onPress={() => { router.push("/(global)/help-screen") }} />
                        <Item icon="mail" label="Contact Support" onPress={() => { router.push("/(global)/support-screen") }} />
                    </Section>

                    {/* DANGER ZONE */}
                    <Section title="Danger Zone">
                        <Item icon="trash" label="Delete Account" danger onPress={() => { setDeleteAccountVisible(true) }} />
                        <Item icon="log-out" label="Sign Out" danger onPress={() => { setSignOutVisible(true) }} />
                    </Section>

                </ScrollView>

            </SafeAreaView>

            <SignOutModal visible={signoutVisible} setVisible={setSignOutVisible} />
            <DeleteAccountModal visible={deleteAccountVisible} setVisible={setDeleteAccountVisible} />
        </LinearGradient>
    )
}

export default SettingsScreen