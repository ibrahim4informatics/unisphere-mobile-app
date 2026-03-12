import api from "@/utils/axios";


export const createComment = async (data: { post_id: number, content: string }) => {
    const response = await api.post("/api/comments", data);
    return response;
}

export const updateComments = async (data: { content: string, comment_id: number }) => {
    const response = await api.patch(`/api/comments/${data.comment_id}`, { content: data.content });
    return response;
}

export const deleteComment = async ({ comment_id }: { comment_id: number }) => {
    const response = await api.delete(`/api/comments/${comment_id}`);
    return response;
}

export const getCommentsByPost = async ({ post_id }: { post_id: number }) => {
    const response = await api.get(`/api/comments/post/${post_id}`);
    return response.data;

}