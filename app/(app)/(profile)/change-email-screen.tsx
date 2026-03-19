import FormInput from "@/components/ui/FormInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Spacer from "@/components/ui/Spacer";
import Colors from "@/constants/Colors";
import { updateEmail } from "@/services/user";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const schema = z.object({
    new_email: z.email({ error: ({ input }) => !input ? "Field is required." : "Invalid email." })
});

type FormFields = z.infer<typeof schema>;

export default function ChangeEmailScreen() {
    const queryClient = useQueryClient();
    const { control, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormFields>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: FormFields) => {
        try {

            await updateEmail(data.new_email);
            router.back();
            queryClient.invalidateQueries({
                exact: false,
                queryKey: ["profile"]
            })

        }

        catch (err) {

            setError("new_email", { message: "Invalid or used email" })

        }
    };

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
                        Change Email
                    </Text>
                </View>

                {/* Email Illustration */}
                <View className="items-center mb-6 mt-4">
                    <View className="w-28 h-28 items-center justify-center rounded-full bg-blue-100 shadow-md">
                        <Feather name="mail" size={64} color={Colors.blue[600]} />
                    </View>
                </View>

                {/* Form */}
                <KeyboardAwareScrollView
                    className="flex-1"
                    contentContainerClassName="pb-10"
                    enableAutomaticScroll
                    enableOnAndroid
                    extraHeight={20}
                >
                    <View className="bg-white rounded-3xl p-6 shadow-md">

                        {/* Email Input */}
                        <Controller
                            name="new_email"
                            control={control}
                            render={({ field: { onBlur, onChange, value } }) => (
                                <FormInput
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    label="New Email"
                                    required
                                    placeholder="you@example.com"
                                    error={errors.new_email?.message}
                                />
                            )}
                        />

                        <Spacer spaceY="lg" />

                        {/* Save Button */}
                        <PrimaryButton
                            onPress={handleSubmit(onSubmit)}
                            title="Save"
                            loading={isSubmitting}
                        />

                        <Spacer spaceY="md" />

                        {/* Cancel Button */}
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="bg-white border border-gray-200 shadow-sm h-14 rounded-2xl items-center justify-center active:opacity-70"
                        >
                            <Text className="text-red-600 font-bold text-lg">Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAwareScrollView>

            </SafeAreaView>
        </LinearGradient>
    );
}