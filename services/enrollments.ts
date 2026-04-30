import api from "@/utils/axios";

export const getStudentEnrolledCourses = async (params: any) => {

    const response = await api("/api/courses/enrollments/courses", { params });
    return response.data;
}


export const enrollStudentInCourse = async (course_id: string) => {
    const response = await api.post(`/api/courses/${course_id}/enrollments`);
    return response.status;
}


export const leaveCourse = async (course_id: string) => {
    const response = await api.delete(`/api/courses/${course_id}/enrollments`);
    return response.status;
}