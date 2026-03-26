import api from "@/utils/axios";

export const getUserConnectionsRequests = async (params: { page: number }) => {
    const response = await api.get("/api/connections/requests", { params });
    return response.data;
}


export const getUserConnections = async (params: { page: number }) => {
    const response = await api.get("/api/connections", { params });
    return response.data;
}

export const getUserConnectionSuggestions = async (params: { page: number }) => {
    const response = await api.get("/api/connections/suggestions", { params });
    return response.data;
}


export const acceptConnectionRequest = async (connections_id: number) => {
    const response = await api.patch(`/api/connections/${connections_id}/accept`);
    return response.data;
}

export const rejectConnectionRequest = async (connection_id: number) => {
    const response = await api.delete(`/api/connections/${connection_id}/reject`);
    return response.data;
}

export const sendConnectionReqeuest = async (receiver_id: string) => {
    const response = await api.post("/api/connections", { receiver_id });
    return response.data;
}

export const unConnect = async (connection_id: number) => {
    const response = await api.delete(`/api/connections/${connection_id}/unconnect`);
    
    return response.data;
}


