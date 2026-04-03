import FormInput from "@/components/ui/FormInput"
import PrimaryButton from "@/components/ui/PrimaryButton"
import Spacer from "@/components/ui/Spacer"
import TextArea from "@/components/ui/TextArea"
import Colors from "@/constants/Colors"
import useUpdateUserAvatar from "@/hooks/api/mutations/useUpdateAvatar"
import useUpdateUserInformations from "@/hooks/api/mutations/useUpdateUserInfornations"
import pickImage from "@/utils/pickImage"
import { Feather } from "@expo/vector-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { Image } from "expo-image"
import { ImagePickerAsset } from "expo-image-picker"
import { router } from "expo-router"
import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Alert, Text, TouchableOpacity, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { z } from "zod"

type Props = {
    first_name: string,
    last_name: string,
    bio?: string,
    avatar_url?: string
}
const schema = z.object({
    first_name: z.string({ error: "Field is required" }).max(35, { error: "First name must be less than 35 character" }),
    last_name: z.string({ error: "Field is Required" }).max(35, { error: "Last name must be less than 35 character" }),
    bio: z.string().max(500, { error: "Bio must be less than 500 character" }).transform(val=> val === "" ? undefined : val).optional(),
})

type FormFields = z.infer<typeof schema>
export default function UpdateUser({ first_name, last_name, bio = "", avatar_url = undefined }: Props) {


    const { mutateAsync: updateAvatar } = useUpdateUserAvatar();
    const { mutateAsync: updateInformations } = useUpdateUserInformations();
    const queryClient = useQueryClient();
    const [localAvatar, setLocalAvatar] = useState<{ name: string, type: string, uri: string } | null>(null)

    const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm({
        resolver: zodResolver(schema), values: {
            first_name, last_name, bio
        }
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        if (isSubmitting) return;

        try {

            if (localAvatar) {
                console.log(localAvatar)
                await handUpdateAvatar();
            }


            await updateInformations(data);
            queryClient.invalidateQueries({
                exact: false,
                queryKey: ["profile"]
            })
            router.back();
            return

        }

        catch {

            Alert.alert("Edit Profile Error", "Something went wrong!");
            return;
        }
    }

    const handleLocalAvatarImage = async () => {

        const image = await pickImage(false) as ImagePickerAsset;
        if (!image) return;
        setLocalAvatar({
            name: image.fileName!,
            type: image.mimeType!,
            uri: image.uri
        });
    }


    const handUpdateAvatar = async () => {
        const data = new FormData();
        data.append("picture", localAvatar as any);
        try {
            await updateAvatar(data);
        }
        catch {
            Alert.alert("Edit Profile Error", "Can not upload new avatar picture");
            return;
        }
    }

    return <KeyboardAwareScrollView enableAutomaticScroll enableOnAndroid extraHeight={20}>

        <View className=" mt-2 mb-4 items-center">
            {

                localAvatar ? (<View className="rounded-full relative w-22 h-22 ">
                    <View className="absolute top-0 left-0 bg-black/20 flex-1" style={{ width: 124, height: 124, borderRadius: 62, zIndex: 2 }}></View>
                    <Image source={localAvatar.uri} style={{ width: 124, height: 124, borderRadius: 62, zIndex: 0 }} />

                    <TouchableOpacity className="absolute right-0 top-0 p-2 rounded-full items-center justify-center bg-blue-500 border-2 border-white" style={{ zIndex: 3 }} onPress={handleLocalAvatarImage}>
                        <Feather name="edit-2" color={Colors.white} size={22} />
                    </TouchableOpacity>

                </View>)
                    : avatar_url ? (

                        <View className="rounded-full relative w-22 h-22 ">
                            <View className="absolute top-0 left-0 bg-black/20 flex-1" style={{ width: 124, height: 124, borderRadius: 62, zIndex: 2 }}></View>
                            <Image source={{ uri: avatar_url }} style={{ width: 124, height: 124, borderRadius: 62, zIndex: 0 }} />

                            <TouchableOpacity className="absolute right-0 top-0 p-2 rounded-full items-center justify-center bg-blue-500 border-2 border-white" style={{ zIndex: 3 }} onPress={handleLocalAvatarImage}>
                                <Feather name="edit-2" color={Colors.white} size={22} />
                            </TouchableOpacity>

                        </View>
                    ) :
                        (<TouchableOpacity onPress={handleLocalAvatarImage}
                            style={{ width: 124, height: 124, borderRadius: 64 }}
                            className="bg-gray-200 elevation-sm items-center justify-center"
                        >
                            <Feather name="image" size={32} color={Colors.gray[500]} />
                            <Text className="text-gray-500 mt-3">+ Add Avatar</Text>
                        </TouchableOpacity>

                        )}
        </View>


        <Spacer spaceY="md" />
        {/* First Name */}


        <Controller
            name="first_name"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => <FormInput value={value} maxLength={35} onChange={onChange} onBlur={onBlur} label="First Name" required placeholder="eg:Belhadi" error={errors.first_name?.message} />}
        />


        <Spacer spaceY="md" />


        {/* Last Name */}

        <Controller
            name="last_name"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => <FormInput value={value} maxLength={35} onChange={onChange} onBlur={onBlur} label="First Name" required placeholder="eg:Ahmed" error={errors.last_name?.message} />}
        />

        <Spacer spaceY="md" />

        <Controller
            name="bio"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => <TextArea value={value || ""} onChangeText={onChange} onBlur={onBlur} label="Bio" maxLength={500} required placeholder="introduce your self" error={errors.bio?.message} />}
        />

        <PrimaryButton onPress={handleSubmit(onSubmit)} title="Save" loading={isSubmitting} />



    </KeyboardAwareScrollView>
}