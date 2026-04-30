import api from "@/utils/axios";

export const getCourses = async (params: { [key: string]: any }) => {
    const response = await api.get("/api/courses", { params });
    return response.data
}

export const getCourseDetails = async (course_id: string) => {
    const response = await api.get(`/api/courses/${course_id}`);
    return response.data;
}

export const getCourseSections = async (course_id: string, page: number) => {
    const response = await api.get(`/api/courses/${course_id}/sections`, { params: { page } });
    return response.data;
}

export const getSectionDetails = async (course_id: string, section_id: string) => {
    const response = await api.get(`/api/courses/${course_id}/sections/${section_id}`);
    return response.data;
}