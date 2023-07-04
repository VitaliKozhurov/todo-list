export enum AppStatus {
    Idle = 'idle',
    Loading = 'loading',
    Succeeded = 'succeeded',
    Failed = 'failed'
}

export const setAppStatusAC = (status: AppStatus) => ({
    type: 'SET-APP-STATUS',
    payload: {status}
} as const)
export const setAppErrorAC = (error: string | null) => ({
    type: 'SET-APP-ERROR',
    payload: {error}
} as const)

const initialState: AppReducerStateType = {
    status: AppStatus.Idle,
    error: null
}
export const appReducer = (state: AppReducerStateType = initialState, action: AppActionsType):AppReducerStateType => {
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
        default:
            return state
    }
}

export type AppReducerStateType = {
    status: AppStatus
    error: string | null
}

export type AppActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>