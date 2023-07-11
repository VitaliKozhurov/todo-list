import {todoListInstance, ResponseType} from './axiosInstance';
import {AxiosResponse} from 'axios';

export type LoginUserData = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

type AuthResponseDataType = {
    id: number
    email: string
    login: string
}

type ResponseUserDataType = { userId?: number }

export class LoginAPI {
    static loginUser(userLoginData: LoginUserData) {
        return todoListInstance
            .post<ResponseType<ResponseUserDataType>, AxiosResponse<ResponseType<ResponseUserDataType>>, LoginUserData>(`auth/login`, userLoginData)
    }

    static logoutUser() {
        return todoListInstance
            .delete<ResponseType<{}>>(`auth/login`)
    }

    static authMe() {
        return todoListInstance
            .get<ResponseType<AuthResponseDataType>>(`auth/me`)
    }
}