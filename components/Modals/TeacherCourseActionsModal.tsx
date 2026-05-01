import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from "react-native";

type Props = {
    visible?: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    is_deleteing?: boolean
    onEdit?: () => void;
    onDelete?: () => void;
};

export default function TeacherCourseActionsModal({
    visible,
    is_deleteing,
    setVisible,
    onEdit,
    onDelete,
}: Props) {
    return (
        <Modal visible={visible} transparent animationType="slide">
            {/* Overlay */}
            <View className="flex-1 bg-black/40 justify-end">

                {/* Click outside to close */}
                <TouchableOpacity
                    className="flex-1"
                    activeOpacity={1}
                    onPress={() => setVisible(false)}
                />

                {/* Bottom Sheet */}
                <View className="bg-white px-6 pt-5 pb-10 rounded-t-3xl">

                    {/* Handle */}
                    <View className="w-14 h-1.5 bg-gray-300 rounded-full self-center mb-6" />

                    {/* Title */}
                    <Text className="text-xl font-extrabold text-center text-gray-800 mb-6">
                        Course Actions
                    </Text>

                    {/* Edit Button */}
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={onEdit}
                        className="flex-row items-center gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4"
                    >
                        <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
                            <Feather name="edit-2" size={18} color={Colors.blue[500]} />
                        </View>

                        <View className="flex-1">
                            <Text className="text-base font-semibold text-gray-800">
                                Edit Course
                            </Text>
                            <Text className="text-xs text-gray-400 mt-1">
                                Update course information and details
                            </Text>
                        </View>

                        <Feather name="chevron-right" size={18} color="#9ca3af" />
                    </TouchableOpacity>

                    {/* Show Student List */}
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => { }}
                        className="flex-row items-center gap-4 bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-4"
                    >
                        <View className="w-10 h-10 rounded-full bg-orange-100 items-center justify-center">
                            <Feather name="users" size={18} color={Colors.orange[600]} />
                        </View>

                        <View className="flex-1">
                            <Text className="text-base font-semibold text-orange-600">
                                Show Students
                            </Text>
                            <Text className="text-xs text-orange-400 mt-1">
                                Consult the list of all enrolled students.
                            </Text>
                        </View>

                        <Feather name="chevron-right" size={18} color="#f87171" />
                    </TouchableOpacity>

                    {/* Delete Button */}
                    <TouchableOpacity
                        disabled={is_deleteing}
                        activeOpacity={0.85}
                        onPress={onDelete}
                        className="flex-row items-center gap-4 bg-red-50 border border-red-100 rounded-2xl p-4"
                    >
                        <View className="w-10 h-10 rounded-full bg-red-100 items-center justify-center">
                            {
                                is_deleteing ? <ActivityIndicator size={"small"} color={Colors.red[500]} /> : <Feather name="trash-2" size={18} color={Colors.red[600]} />
                            }
                        </View>

                        <View className="flex-1">
                            <Text className="text-base font-semibold text-red-600">
                                Delete Course
                            </Text>
                            <Text className="text-xs text-red-400 mt-1">
                                This action cannot be undone
                            </Text>
                        </View>

                        <Feather name="chevron-right" size={18} color="#f87171" />
                    </TouchableOpacity>

                    {/* Cancel */}
                    <TouchableOpacity
                        onPress={() => setVisible(false)}
                        className="mt-6 items-center"
                    >
                        <Text className="text-gray-400 font-medium">Cancel</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}