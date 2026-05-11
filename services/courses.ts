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

// teachers only
export const getTeacherPublishedCourses = async (params: { page: number, status?: string, name?: string }) => {
    const response = await api.get("/api/courses/my-courses", { params });
    return response.data;
}

export const getTeacherPublishedCourseDetails = async (course_id: string) => {
    const response = await api.get(`/api/courses/my-courses/${course_id}`);
    return response.data;
}

export const createCourse = async (data: {
    name: string,
    code: string,
    description: string,
    module_id: number,
    faculty_id: number,
    field_id: number,
    status: string,
}) => {
    const response = await api.post("/api/courses", data);
    return response.data;
}


export const createCourseSection = async ({ course_id, data }: { data: FormData, course_id: string }) => {
    const response = await api.post(`/api/courses/${course_id}/sections`, data, { headers: { 'Content-Type': "multipart/form-data" } });
    return response.status;
}

export const appendFilesToCourseSection = async ({ course_id, section_id, data }: { course_id: string, section_id: number, data: FormData }) => {
    const response = await api.patch(`/api/courses/${course_id}/sections/${section_id}/materials`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.status;
}

export const updateSectionData = async ({ course_id, section_id }: { course_id: string, section_id: number }, data: { title: string, content?: string, order: number }) => {
    const response = await api.patch(`/api/courses/${course_id}/sections/${section_id}`, data);
    return response.status;
}

export const deleteCourseSection = async ({ course_id, section_id }: { course_id: string, section_id: number }) => {
    const response = await api.delete(`/api/courses/${course_id}/sections/${section_id}`);
    return response.status;
}

export const deletePublishedCourse = async (course_id: string) => {
    const response = await api.delete(`/api/courses/my-courses/${course_id}`);
    return response.status;
}


export const getStudentListEnrolledInCourse = async (course_id: string, page: number) => {
    const response = await api.get(`/api/courses/${course_id}/enrollments/students`, { params: { page } });
    return response.data
}

export const updateCourse = async (course_id: string, data: { description: string, code: string, name: string, status: "PENDING" | "DRAFT" }) => {

    const response = await api.patch(`/api/courses/${course_id}`, data);
    return response.status;
}


export const deleteCourseMaterial = async (data: { course_id: string, material_id: string }) => {
    const response = await api.delete(`/api/courses/${data.course_id}/materials/${data.material_id}`)
    return response.status
}