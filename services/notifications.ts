import api from "@/utils/axios";
export const getUserNotifications = async (page: number) => {
    const response = await api.get("/api/notifications", {
        params: {
            page
        }
    });
    return response.data;
}

export const makeNotificationRead = async (notification_id: number) => {
    const response = await api.patch(`/api/notifications/${notification_id}`);
    return response.status;
}