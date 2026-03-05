import { User } from "@/types/User"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthSlice {
    user: User | null
    is_authenticated: boolean

    // login
    login_loading: boolean
    login_error: string | null

    register_data: {
        email: string,
        password: string,
        first_name: string,
        last_name: string,
        role: "STUDENT" | "TEACHER",
        bio: string | null,
        student_id: string | null
    }

    register_errors?: {

        email?: string | null,
        student_id?: string | null

    } | null

    // forgot password
    forgot_email: string | null,
    forgot_id: string | null
    reset_token: string | null
}

const initialState: AuthSlice = {
    user: null,
    is_authenticated: false,
    register_errors: {
        email: null,
        student_id: null
    },
    login_loading: false,
    login_error: null,
    register_data: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        role: "STUDENT",
        bio: null,
        student_id: null
    },
    forgot_email: null,
    forgot_id: null,
    reset_token: null,
}



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setRegisterCredentialsData: (state, { payload }: PayloadAction<{
            email: string,
            password: string,
        }>) => {
            state.register_data = { ...state.register_data, email: payload.email, password: payload.password }
        },

        setRegisterErrors: (state, { payload }: PayloadAction<{ email?: string, student_id?: string }>) => {
            state.register_errors = { ...state.register_errors, email: payload.email || null, student_id: payload.student_id || null };
        },

        setRegisterPersonalData: (state, { payload }: PayloadAction<{
            first_name: string;
            last_name: string;
            role: "STUDENT" | "TEACHER";
            bio?: string | undefined;
            student_id?: string | undefined;
        }>) => {
            state.register_data = { ...state.register_data, ...payload }
        },


        clearRegisterData: (state) => {
            state.register_data = initialState.register_data
            state.register_errors = initialState.register_errors
        },

        setForgotPasswordEmail: (state, { payload }: PayloadAction<string>) => {
            state.forgot_email = payload
        },

        setForgotId: (state, { payload }: PayloadAction<string>) => {
            state.forgot_id = payload
        },

        setForgotResetToken: (state, { payload }: PayloadAction<string>) => {
            state.reset_token = payload;
        },
        clearForgotResetToken: (state) => {
            state.reset_token = initialState.reset_token;
        },

        setUser: (state, { payload }: PayloadAction<User>) => {
            state.user = payload;
        },

        clearUser: (state) => {
            state.user = null;
        },

        setAuth: (state, { payload }: PayloadAction<boolean>) => {
            state.is_authenticated = payload;
        }
    }
})

export default authSlice.reducer
export const {
    setUser, clearUser,
    setRegisterCredentialsData, setRegisterPersonalData,
    setForgotPasswordEmail, setForgotId, setRegisterErrors, clearRegisterData,
    setForgotResetToken, clearForgotResetToken, setAuth

} = authSlice.actions