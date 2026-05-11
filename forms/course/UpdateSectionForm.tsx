import FormInput from "@/components/ui/FormInput";
import Spacer from "@/components/ui/Spacer";
import TextArea from "@/components/ui/TextArea";
import Colors from "@/constants/Colors";
import useAppendFiles from "@/hooks/api/mutations/useAppendFiles";
import useDeleteMaterial from "@/hooks/api/mutations/useDeleteMaterial";
import useSectionDetails from "@/hooks/api/queries/useSectionDetails";
import { updateSectionData } from "@/services/courses";
import { pickFiles } from "@/utils/pickFiles";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { DocumentPickerAsset } from "expo-document-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import z from "zod";


const shcema = z.object({
    title: z.string({ error: "Title is required" }).max(150, { error: "The title is long" }).min(3, { error: "The title is too short" }),
    content: z.string().max(500, { error: "The content is long" }).optional(),
    order: z.string({ error: "Order is required" }).regex(/\d+/, { error: "Order must be digit" }).transform(val => parseInt(val)),
});

type FormFields = z.infer<typeof shcema>;

export default function UpdateSectionForm({ course_id, section_id }: { course_id: string, section_id: string }) {
    const queryClient = useQueryClient();
    const { data, isPending, error } = useSectionDetails(course_id, section_id);
    const [exisitingMaterials, setExistingMaterials] = useState([]);

    const { mutateAsync: appendFiles, isPending: appendingFiles } = useAppendFiles();
    const { control, formState: { errors, isSubmitting }, handleSubmit, reset } = useForm({ resolver: zodResolver(shcema) });

    useEffect(() => {
        if (data) {
            reset({
                title: data.section.title,
                content: data.section.content,
                order: data.section.order.toString()
            })

            setExistingMaterials(data.section.materials)
        }
    }, [reset, data])
    const [uploadedFiles, setUploadedFiles] = useState<DocumentPickerAsset[]>([]);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const formData = new FormData();

        if (uploadedFiles.length > 0) {
            uploadedFiles.forEach(file => {
                formData.append("files", { uri: file.uri, name: file.name, type: file.mimeType || "application/octet-stream" } as any)
            });
        }

        try {

            if (uploadedFiles.length > 0) {
                appendFiles({ course_id, section_id: parseInt(section_id), data: formData })
            }
            updateSectionData({ course_id, section_id: parseInt(section_id) }, data)

            queryClient.invalidateQueries({ queryKey: ["courses", course_id, "sections"], exact: false });
            router.back();
        }

        catch (err) {
            console.log(err);

        }
    }
    if (isPending) return <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={"large"} color={Colors.blue[500]} />
    </View>
    return (
        <ScrollView>

            <Controller

                control={control}
                name="title"
                render={({ field: { onBlur, onChange, value } }) => (
                    <FormInput
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        placeholder="Enter section title."
                        label="Title"
                        required
                        error={errors.title?.message}
                    />
                )}
            />

            <Spacer spaceY="md" />

            <Controller

                control={control}
                name="content"
                render={({ field: { onBlur, onChange, value } }) => (
                    <TextArea
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value || ""}
                        placeholder="Enter section content."
                        label="Content"
                        required
                        error={errors.content?.message}
                    />
                )}
            />



            <Controller

                control={control}
                name="order"
                render={({ field: { onBlur, onChange, value } }) => (
                    <FormInput
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value ? value.toString() : ""}
                        placeholder="Enter section content."
                        label="Order"
                        keyboardType="number-pad"
                        error={errors.order?.message}
                        required
                    />
                )}
            />

            {/* Existing materials */}

            <View className="my-4">

                <View className="flex-row items-center mb-4">
                    <Feather name="folder" size={20} color="#3B82F6" />
                    <Text className="text-lg font-bold ml-2 text-gray-800">
                        Materials
                    </Text>
                </View>

                <ScrollView className="mt-2" horizontal contentContainerClassName="py-2">
                    {exisitingMaterials.map((m: any) => (
                        <ExistingFile course_id={course_id} key={m.id} material={m} deleteCallback={() => { setExistingMaterials(prev => prev.filter((p: any) => p.id !== m.id)) }} />
                    ))
                    }
                </ScrollView>
            </View>

            {/* New Materials */}

            <View className="mb-8 mt-4">

                <View className="flex-row items-center mb-4">
                    <Feather name="folder" size={20} color="#3B82F6" />
                    <Text className="text-lg font-bold ml-2 text-gray-800">
                        Add New Materials
                    </Text>

                    <TouchableOpacity
                        onPress={async () => {
                            const files = await pickFiles()
                            if (!files) return;
                            setUploadedFiles(files)
                        }}
                        activeOpacity={0.85}
                        className=" ms-auto bg-blue-500 px-6 py-2 rounded-full flex-row items-center gap-3 shadow-xl"
                    >
                        {/* Icon Container */}
                        <View className="w-9 h-9 rounded-full bg-white/20 items-center justify-center">
                            <Feather name="file-plus" size={18} color={Colors.white} />
                        </View>

                        <Text className="text-white text-base font-semibold tracking-wide">
                            Add Files
                        </Text>
                    </TouchableOpacity>
                </View>


                {
                    uploadedFiles.length > 0 && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="p-2">

                            {uploadedFiles.map(file => (
                                <View
                                    key={file.name}
                                    className="relative flex-row items-center gap-4 mx-2 bg-white border border-blue-50 rounded-2xl px-5 py-4 shadow-sm"
                                >
                                    {/* File Icon */}
                                    <View className="bg-blue-50 rounded-2xl p-3 items-center justify-center">
                                        <Feather name="file-text" size={18} color={Colors.blue[500]} />
                                    </View>

                                    {/* File Info */}
                                    <View className="flex-1">
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            {file.name}
                                        </Text>

                                        <Text className="text-xs text-gray-400 mt-1">
                                            Ready to upload
                                        </Text>
                                    </View>

                                    {/* Remove Button */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            setUploadedFiles(prev =>
                                                prev.filter(f => f.name !== file.name)
                                            )
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 rounded-full items-center justify-center shadow"
                                    >
                                        <Feather name="x" color="#FFF" size={12} />
                                    </TouchableOpacity>
                                </View>
                            ))}

                        </ScrollView>
                    )
                }
            </View>


            <TouchableOpacity
                disabled={isSubmitting}
                onPress={handleSubmit(onSubmit)}
                className={`mt-8 py-4 rounded-2xl flex-row items-center justify-center gap-3 shadow-md ${isSubmitting ? "bg-blue-300" : "bg-blue-500"}`}
            >
                {isSubmitting ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <>
                        <Feather name="save" size={20} color="#fff" />
                        <Text className="text-white text-base font-semibold">
                            Save Section
                        </Text>
                    </>
                )}
            </TouchableOpacity>

        </ScrollView>
    )
}



function ExistingFile({ course_id, material, deleteCallback = () => { } }: { material: { id: number, name: string }, course_id: string, deleteCallback?: () => void }) {
    const { mutateAsync: deleteMaterial, isPending: deletingMaterial, error } = useDeleteMaterial()

    return (
        <View
            className="relative flex-row items-center gap-4 mx-2 bg-white border border-blue-50 rounded-2xl px-5 py-4 shadow-sm"
        >
            {/* File Icon */}
            <View className="bg-blue-50 rounded-2xl p-3 items-center justify-center">
                <Feather name="file-text" size={18} color={Colors.blue[500]} />
            </View>

            {/* File Info */}
            <View className="flex-1">
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="text-sm font-medium text-gray-700"
                >
                    {material.name}
                </Text>
            </View>

            {/* Remove Button */}
            <TouchableOpacity
                disabled={deletingMaterial}
                onPress={async () => {
                    try {
                        deleteMaterial({ course_id, material_id: material.id.toString() })
                        deleteCallback();
                    }

                    catch (err) {
                        console.log(err)
                    }
                }}
                className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 rounded-full items-center justify-center shadow"
            >
                {deletingMaterial ? <ActivityIndicator size={"small"} color={Colors.blue[500]} /> : <Feather name="x" color="#FFF" size={12} />}
            </TouchableOpacity>
        </View>
    )
}