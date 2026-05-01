import Colors from "@/constants/Colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  course: any;
};

export default function TeacherCourseCard({ course }: Props) {
  const statusStyles: any = {
    ACCEPTED: {
      container: "bg-green-100",
      text: "text-green-700",
      icon: "check-circle",
    },
    PENDING: {
      container: "bg-yellow-100",
      text: "text-yellow-700",
      icon: "clock",
    },
    REJECTED: {
      container: "bg-red-100",
      text: "text-red-700",
      icon: "x-circle",
    },
    DRAFT: {
      container: "bg-gray-100",
      text: "text-gray-600",
      icon: "edit-3",
    },
  };

  const status = statusStyles[course.status];

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        router.push(`/(app)/(courses)/teacher/course_details/${course.id}`)
      }
      className="bg-white rounded-3xl p-6 my-4 shadow-lg border border-blue-50"
    >
      {/* HEADER */}
      <View className="flex-row justify-between items-start">

        <View className="flex-row items-center gap-4 flex-1">

          {/* Course Icon */}
          <View className="w-14 h-14 rounded-2xl items-center justify-center bg-blue-100">
            <Feather
              name="book"
              size={24}
              color={Colors.blue[600]}
            />
          </View>

          <View className="flex-1">
            <Text className="text-xl font-bold text-primary">
              {course.name}
            </Text>

            <View className="flex-row items-center gap-2 mt-1">
              <Text className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                {course.code}
              </Text>

              <Text className="text-xs text-gray-400">
                {course.field.name}
              </Text>
            </View>
          </View>
        </View>

        {/* STATUS BADGE */}
        <View className={`px-3 py-1 rounded-full flex-row items-center gap-1 ${status.container}`}>
          <Feather name={status.icon} size={14} color="currentColor" />
          <Text className={`text-xs font-semibold ${status.text}`}>
            {course.status}
          </Text>
        </View>
      </View>

      {/* DESCRIPTION */}
      <Text
        numberOfLines={3}
        className="text-sm text-textSecondary mt-4 leading-6"
      >
        {course.description}
      </Text>

      {/* MODULE BOX */}
      <View className="mt-5 bg-blue-50 p-4 rounded-2xl">

        <Text className="text-xs text-blue-400 font-semibold mb-1">
          MODULE
        </Text>

        <Text className="text-sm font-semibold text-blue-800">
          {course.module.name} ({course.module.code})
        </Text>

        {/* Levels */}
        <View className="flex-row flex-wrap gap-2 mt-3">
          {course.module.levels.map((level: any) => (
            <View
              key={level.id}
              className="bg-white px-3 py-1 rounded-full border border-blue-100"
            >
              <Text className="text-xs text-blue-600 font-medium">
                {level.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* STATS SECTION */}
      <View className="flex-row justify-between mt-6 pt-4 border-t border-gray-100">

        <View className="flex-row items-center gap-2">
          <MaterialIcons
            name="groups"
            size={18}
            color={Colors.blue[500]}
          />
          <Text className="text-sm font-semibold text-gray-700">
            {course._count.courseEnrollments} Students
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Feather
            name="layers"
            size={18}
            color={Colors.blue[500]}
          />
          <Text className="text-sm font-semibold text-gray-700">
            {course._count.courseSections} Sections
          </Text>
        </View>
      </View>

      {/* FACULTY INFO */}
      <View className="mt-4">
        <Text className="text-xs text-gray-400">
          {course.faculty.name}
        </Text>
        <Text className="text-xs text-gray-400">
          {course.faculty.university.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}