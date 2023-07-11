import {Dispatch} from 'redux';
import {AppActionsType, EntityStatus, setAppStatusAC} from '../appReducer/appReducer';
import {LoginAPI, LoginUserData} from '../../api/loginApi';
import {appNetworkHandlingError, appServerHandlingError} from '../../utils/error-handling';

export const setIsLoggedStatusAC = (status: boolean) => ({
    type: 'SET-LOGGED-STATUS',
    payload: {status}
} as const)

export type LoginActionsType = ReturnType<typeof setIsLoggedStatusAC>;
const initialState = {
    isLoggedStatus: false as boolean
}
type InitialStateType = typeof initialState;

export const authReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-LOGGED-STATUS': {
            return {
                ...state,
                isLoggedStatus: action.payload.status
            }
        }
        default:
            return state
    }
}

export const loginUserTC = (userLoginData: LoginUserData) => (dispatch: Dispatch<LoginActionsType | AppActionsType>) => {
    dispatch((setAppStatusAC(EntityStatus.Loading)));
    LoginAPI.loginUser(userLoginData)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedStatusAC(true));
                dispatch(setAppStatusAC(EntityStatus.Succeeded));
            } else {
                appServerHandlingError(res.data, dispatch);
            }
        })
        .catch((error) => {
            appNetworkHandlingError(error, dispatch);
        })
}

export const logoutUserTC = () => (dispatch: Dispatch<LoginActionsType | AppActionsType>) => {
    dispatch((setAppStatusAC(EntityStatus.Loading)));
    LoginAPI.logoutUser()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedStatusAC(false));
                dispatch(setAppStatusAC(EntityStatus.Succeeded));
            } else {
                appServerHandlingError(res.data, dispatch);
            }
        })
        .catch((error) => {
            appNetworkHandlingError(error, dispatch);
        })
}