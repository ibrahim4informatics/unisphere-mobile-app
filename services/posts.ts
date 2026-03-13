import api from "@/utils/axios";
import { AxiosResponse } from "axios";

export const getFeedPosts = async (params: { page: number }) => {
    const response = await api.get("/api/posts", { params });
    return response.data
}

export const createPost = async (formData: FormData) => {
    const response = await api.post("/api/posts", formData, { headers: { "Content-Type": "multipart/form-data" } });
    return response;
}



export const getPostById = async (id: number) => {
    const response = await api.get(`/api/posts/${id}`);
    return response.data;
}


export const createLike = async (post_id: number) => {
    const response = await api.post(`/api/likes/${post_id}`);
    return response;
}

export const deleteLike = async (post_id: number) => {
    const response: AxiosResponse = await api.delete(`/api/likes/${post_id}`);
    return response;
}


export const deleteMedia = async (media_id: number) => {
    const response = await api.delete(`/api/posts/post_medias/${media_id}`);
    return response;
}

export const updatePost = async (body: { post_id: number, data: FormData }) => {
    const response = await api.patch(`/api/posts/${body.post_id}`, body.data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response;
}

export const deletePostById = async (post_id: number) => {
    const response = await api.delete(`/api/posts/${post_id}`);
    return response;
}