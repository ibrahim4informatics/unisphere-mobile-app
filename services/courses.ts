import api from "@/utils/axios";

export const getCourses = async (params: { [key: string]: any }) => {
    const response = await api.get("/api/courses", { params });
    return response.data
}

export const getCourseDetails = async (course_id: string) => {
    const response = await api.get(`/api/courses/${course_id}`);
    return response.data;
}