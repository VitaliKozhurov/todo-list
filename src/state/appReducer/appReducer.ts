import {Dispatch} from 'redux';
import {LoginAPI} from '../../api/loginApi';
import {LoginActionsType, setIsLoggedStatusAC} from '../authReducer/authReducer';
import {appNetworkHandlingError, appServerHandlingError} from '../../utils/error-handling';

export enum EntityStatus {
    Idle = 'idle',
    Loading = 'loading',
    Succeeded = 'succeeded',
    Failed = 'failed'
}

export const setAppStatusAC = (status: EntityStatus) => ({
    type: 'SET-APP-STATUS',
    payload: {status}
} as const)
export const setAppErrorAC = (error: string | null) => ({
    type: 'SET-APP-ERROR',
    payload: {error}
} as const)
export const setAppInitializedAC = (status: boolean) => ({
    type: 'SET-APP-INITIALIZED',
    payload: {status}
} as const)

const initialState: AppReducerStateType = {
    status: EntityStatus.Idle,
    error: null,
    initialized: false
}
export const appReducer = (state: AppReducerStateType = initialState, action: AppActionsType): AppReducerStateType => {
    switch (action.type) {
        case 'SET-APP-STATUS':
            return {
                ...state,
                status: action.payload.status
            }
        case 'SET-APP-ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'SET-APP-INITIALIZED': {
            return {
                ...state,
                initialized: action.payload.status
            }
        }
        default:
            return state
    }
}


export const initializeAppTC = () => (dispatch: Dispatch<AppActionsType | LoginActionsType>) => {
    LoginAPI.authMe()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedStatusAC(true))
            } else {
                appServerHandlingError(res.data, dispatch)
            }
        })
        .catch((error) => {
            appNetworkHandlingError(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppInitializedAC(true))
        })
}

export type AppReducerStateType = {
    status: EntityStatus
    error: string | null
    initialized: boolean
}

export type AppActionsType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppInitializedAC>