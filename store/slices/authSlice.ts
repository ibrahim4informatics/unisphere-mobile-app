import { User } from "@/types/User"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthSlice {
    user: User | null
    access_token: string | null
    refresh_token: string | null
    is_authenticated: boolean

    // login
    login_loading: boolean
    login_error: string | null

    // register (multi-step)
    register_step: 1 | 2
    register_role?: "STUDENT" | "TEACHER"
    register_data: {
        email: string,
        password: string,
        first_name?: string,
        last_name?: string,
        role?: "STUDENT" | "TEACHER",
        student_id?: string | null
    } | null
    register_loading: boolean
    register_error: string | null

    // forgot password
    forgot_email: string | null,
    forgot_id: string | null
    reset_token: string | null
}

const initialState: AuthSlice = {
    user: null,
    access_token: null,
    refresh_token: null,
    is_authenticated: false,

    login_loading: false,
    login_error: null,
    register_data: null,
    register_step: 1,
    register_role: undefined,
    register_loading: false,
    register_error: null,

    forgot_email: null,
    forgot_id: null,
    reset_token:null,
}



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, { payload: token }: PayloadAction<string>) => {
            state.access_token = token
        },
        setRegisterCredentialsData: (state, { payload }: PayloadAction<{
            email: string,
            password: string,
        }>) => {
            state.register_data = { email: payload.email, password: payload.password }
        },

        setRegisterPersonalData: (state, { payload }: PayloadAction<{ first_name: string, last_name: string, role: "STUDENT" | "TEACHER", student_id?: string }>) => {
            state.register_data = { ...(state.register_data || { email: "", password: "" }), first_name: payload.first_name, last_name: payload.last_name, role: payload.role, student_id: payload.student_id || null }
        },

        setForgotPasswordEmail: (state, { payload }: PayloadAction<string>) => {
            state.forgot_email = payload
        },

        setForgotId: (state, { payload }: PayloadAction<string>) => {
            state.forgot_id = payload
        }
    }
})

export default authSlice.reducer
export const {
    setAccessToken, setRegisterCredentialsData, setRegisterPersonalData,
    setForgotPasswordEmail, setForgotId

} = authSlice.actions