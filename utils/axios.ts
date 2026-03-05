import axios from "axios";
import * as secureStore from "expo-secure-store";


const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000,

})


// Attach Auth Token Interceptor

axios.interceptors.request.use(
    async (config) => {
        const token = await secureStore.getItemAsync("access_token");
        config.headers.Authorization = token ? `Bearer ${token}` : null
        return config;

    },
    (error) => Promise.reject(error)
)


axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {

                const refresh_token = await secureStore.getItemAsync("refresh_token");
                const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/refresh-token`, { refresh_token }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if (res.status === 200) {
                    await secureStore.setItemAsync("access_token", res.data.accessToken);
                    originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                    return api(originalRequest);
                }

            }
            catch (refreshError) {
                await secureStore.deleteItemAsync("refresh_token");
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }


)


export default api;