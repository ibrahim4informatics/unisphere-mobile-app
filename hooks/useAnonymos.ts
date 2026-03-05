import { setAuth } from "@/store/slices/authSlice";
import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
const useAnonymos = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {

        const refreshToken = secureStore.getItem("refresh_token");
        if (refreshToken) {
            dispatch(setAuth(true));
            router.replace("/(app)");
        }
    }, [])
}

export default useAnonymos;