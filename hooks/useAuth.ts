import { setAuth } from "@/store/slices/authSlice";
import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";

export default function useAuth() {

    const dispatch = useAppDispatch();
    useEffect(() => {

        const refreshToken = secureStore.getItem("refresh_token");
        // console.log(refreshToken)
        if (!refreshToken) {
            dispatch(setAuth(false));
            router.replace("/login-screen");
        }

        else {
            
        }
    }, [])

}