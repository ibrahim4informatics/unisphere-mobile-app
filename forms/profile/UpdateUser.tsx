import FormInput from "@/components/ui/FormInput"
import PrimaryButton from "@/components/ui/PrimaryButton"
import Spacer from "@/components/ui/Spacer"
import TextArea from "@/components/ui/TextArea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { z } from "zod"

type Props = {
    first_name: string,
    last_name: string,
    bio?: string
}
const schema = z.object({
    first_name: z.string({ error: "Field is required" }).max(35, { error: "First name must be less than 35 character" }),
    last_name: z.string({ error: "Field is Required" }).max(35, { error: "Last name must be less than 35 character" }),
    bio: z.string().max(500, { error: "Last name must be less than 35 character" }).transform(val => !val ? undefined : val).optional(),
})

type FormFields = z.infer<typeof schema>
export default function UpdateUser({ first_name, last_name, bio = "" }: Props) {

    const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm({
        resolver: zodResolver(schema), values: {
            first_name, last_name, bio
        }
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        if (isSubmitting) return;
        console.log(data)
    }

    return <KeyboardAwareScrollView enableAutomaticScroll enableOnAndroid extraHeight={20}>


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

        <Spacer spaceY="md" />

        <PrimaryButton onPress={handleSubmit(onSubmit)} title="Save" loading={isSubmitting} />



    </KeyboardAwareScrollView>
}