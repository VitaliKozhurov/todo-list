import axios from 'axios';

export const todoListInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
});

export type ResponseType<T = {}> = {
    data: T;
    resultCode: number;
    messages: string[];
    fieldsErrors?: string[];
};