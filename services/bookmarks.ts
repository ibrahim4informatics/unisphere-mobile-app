import api from "@/utils/axios";

export const createBookmark = async (post_id: number) => {
    const response = await api.post(`/api/bookmarks/${post_id}`);
    return response;
}


export const deleteBookmarks = async (post_id: number) => {
    const response = await api.delete(`/api/bookmarks/${post_id}`);
    return response;
}


export const getUserBookmarks = async () => {
    const response = await api.get("/api/bookmarks");
    return response.data;
}